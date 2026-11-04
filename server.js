require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const { MongoClient, ObjectId, GridFSBucket } = require('mongodb');

const { MONGODB_URI, JWT_SECRET, PORT = 3000 } = process.env;
if (!MONGODB_URI || !JWT_SECRET) { console.error('Set MONGODB_URI and JWT_SECRET in .env'); process.exit(1); }
const prod = process.env.NODE_ENV === 'production';

const app = express();
app.set('trust proxy', 1);
app.use(express.json());
app.use(cookieParser());
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 50 * 1024 * 1024 } });

let users, songs, bucket;

const setSession = (res, id) =>
  res.cookie('token', jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' }),
    { httpOnly: true, sameSite: 'lax', secure: prod, maxAge: 30 * 864e5 });

const auth = (req, res, next) => {
  try { req.uid = jwt.verify(req.cookies.token, JWT_SECRET).id; next(); }
  catch { res.status(401).json({ error: 'Please log in' }); }
};
const wrap = fn => (req, res) => fn(req, res).catch(e => {
  console.error(e); res.status(500).json({ error: 'Something went wrong. Try again.' });
});
const shape = s => ({
  id: s._id.toString(), source: s.source, title: s.title, artist: s.artist, duration: s.duration || 0,
  src: s.source === 'url' ? s.url : `/api/stream/${s._id}`
});

// ---------- Auth ----------
const readCreds = req => ({
  email: String(req.body.email || '').trim().toLowerCase(),
  password: String(req.body.password || '')
});

app.post('/api/signup', wrap(async (req, res) => {
  const { email, password } = readCreds(req);
  if (!/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ error: 'Enter a valid email address' });
  if (password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters' });
  if (await users.findOne({ email })) return res.status(409).json({ error: 'That email is already registered' });
  const r = await users.insertOne({ email, hash: await bcrypt.hash(password, 12), createdAt: new Date() });
  setSession(res, r.insertedId.toString());
  res.json({ email });
}));

app.post('/api/login', wrap(async (req, res) => {
  const { email, password } = readCreds(req);
  const u = await users.findOne({ email });
  if (!u || !(await bcrypt.compare(password, u.hash)))
    return res.status(401).json({ error: 'Incorrect email or password' });
  setSession(res, u._id.toString());
  res.json({ email });
}));

app.post('/api/logout', (req, res) => { res.clearCookie('token'); res.json({ ok: true }); });

app.get('/api/me', auth, wrap(async (req, res) => {
  const u = await users.findOne({ _id: new ObjectId(req.uid) });
  if (!u) return res.status(401).json({ error: 'Please log in' });
  res.json({ email: u.email, createdAt: u.createdAt });
}));

app.post('/api/password', auth, wrap(async (req, res) => {
  const u = await users.findOne({ _id: new ObjectId(req.uid) });
  const current = String(req.body.current || ''), next = String(req.body.next || '');
  if (!u || !(await bcrypt.compare(current, u.hash))) return res.status(400).json({ error: 'Current password is incorrect' });
  if (next.length < 8) return res.status(400).json({ error: 'New password must be at least 8 characters' });
  await users.updateOne({ _id: u._id }, { $set: { hash: await bcrypt.hash(next, 12) } });
  res.json({ ok: true });
}));

// ---------- Songs ----------
app.get('/api/songs', auth, wrap(async (req, res) => {
  const list = await songs.find({ userId: req.uid }).sort({ createdAt: -1 }).toArray();
  res.json(list.map(shape));
}));

app.post('/api/songs/upload', auth, upload.array('files', 20), wrap(async (req, res) => {
  const mm = await import('music-metadata');
  const out = [];
  const titles = [].concat(req.body.titles || []), artists = [].concat(req.body.artists || []);
  for (const [i, f] of (req.files || []).entries()) {
    if (!/^audio\//.test(f.mimetype) && !/\.(mp3|m4a|aac|flac|wav|ogg|opus)$/i.test(f.originalname)) continue;
    let title = f.originalname.replace(/\.[^.]+$/, ''), artist = 'Unknown artist', duration = 0;
    try {
      const m = await mm.parseBuffer(f.buffer, f.mimetype);
      title = m.common.title || title; artist = m.common.artist || artist; duration = m.format.duration || 0;
    } catch {}
    title = String(titles[i] || '').trim() || title;
    artist = String(artists[i] || '').trim() || artist;
    const mime = f.mimetype.startsWith('audio/') ? f.mimetype : 'audio/mpeg';
    const fileId = await new Promise((ok, no) => {
      const s = bucket.openUploadStream(f.originalname, { contentType: mime, metadata: { userId: req.uid } });
      s.on('error', no).on('finish', () => ok(s.id));
      s.end(f.buffer);
    });
    const doc = { userId: req.uid, title, artist, duration, source: 'file', fileId, mime, createdAt: new Date() };
    doc._id = (await songs.insertOne(doc)).insertedId;
    out.push(shape(doc));
  }
  res.json(out);
}));

app.post('/api/songs/url', auth, wrap(async (req, res) => {
  const url = String(req.body.url || '').trim();
  let u; try { u = new URL(url); } catch {}
  if (!u || !/^https?:$/.test(u.protocol)) return res.status(400).json({ error: 'Enter a valid http(s) link' });
  const guess = decodeURIComponent(u.pathname.split('/').pop() || '').replace(/\.[^.]+$/, '') || u.hostname;
  const doc = {
    userId: req.uid, source: 'url', url, duration: 0, createdAt: new Date(),
    title: String(req.body.title || '').trim() || guess,
    artist: String(req.body.artist || '').trim() || 'Unknown artist'
  };
  doc._id = (await songs.insertOne(doc)).insertedId;
  res.json(shape(doc));
}));

app.delete('/api/songs/:id', auth, wrap(async (req, res) => {
  const s = await songs.findOneAndDelete({ _id: new ObjectId(req.params.id), userId: req.uid });
  if (s && s.fileId) await bucket.delete(s.fileId).catch(() => {});
  res.json({ ok: true });
}));

// Streams uploaded audio with Range support so seeking and background playback work.
app.get('/api/stream/:id', auth, wrap(async (req, res) => {
  const s = await songs.findOne({ _id: new ObjectId(req.params.id), userId: req.uid });
  const f = s && s.fileId && await bucket.find({ _id: s.fileId }).next();
  if (!f) return res.sendStatus(404);
  const size = f.length;
  let start = 0, end = size - 1;
  const m = /bytes=(\d*)-(\d*)/.exec(req.headers.range || '');
  if (m) {
    if (m[1] !== '') { start = +m[1]; if (m[2] !== '') end = Math.min(+m[2], size - 1); }
    else if (m[2] !== '') start = Math.max(size - +m[2], 0);
    if (start > end || start >= size) return res.status(416).set('Content-Range', `bytes */${size}`).end();
    res.status(206).set('Content-Range', `bytes ${start}-${end}/${size}`);
  }
  res.set({ 'Content-Type': s.mime, 'Accept-Ranges': 'bytes', 'Content-Length': end - start + 1, 'Cache-Control': 'private, max-age=3600' });
  bucket.openDownloadStream(s.fileId, { start, end: end + 1 }).on('error', () => res.destroy()).pipe(res);
}));

// ---------- Static + errors ----------
app.use(express.static(path.join(__dirname, 'public')));
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) return res.status(400).json({ error: 'File too large (50 MB max per song)' });
  console.error(err); res.status(500).json({ error: 'Something went wrong' });
});

MongoClient.connect(MONGODB_URI).then(async client => {
  const db = client.db();
  users = db.collection('users'); songs = db.collection('songs');
  bucket = new GridFSBucket(db, { bucketName: 'audio' });
  await users.createIndex({ email: 1 }, { unique: true });
  await songs.createIndex({ userId: 1, createdAt: -1 });
  app.listen(PORT, () => console.log(`Mavryx running on http://localhost:${PORT}`));
}).catch(e => { console.error('MongoDB connection failed:', e.message); process.exit(1); });