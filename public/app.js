const $ = s => document.querySelector(s);
const P = d => `<path d="${d}"/>`;
const ICONS = {
  logo: '<path d="M5.5 17.5v-11l6.5 7.5 6.5-7.5v11" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>',
  note: P('M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z'),
  install: P('M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z'),
  keyboard: P('M20 5H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 3h2v2h-2V8zm0 3h2v2h-2v-2zM8 8h2v2H8V8zm0 3h2v2H8v-2zm-1 2H5v-2h2v2zm0-3H5V8h2v2zm9 7H8v-2h8v2zm0-4h-2v-2h2v2zm0-3h-2V8h2v2zm3 3h-2v-2h2v2zm0-3h-2V8h2v2z'),
  close: P('M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'),
  queue: P('M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18a3 3 0 1 0 3 3V8h3V6h-5z'),
  qadd: P('M14 10H2v2h12v-2zm0-4H2v2h12V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 16h8v-2H2v2z'),
  grip: P('M9 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM9 12a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM9 18.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM18 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM18 12a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM18 18.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z'),
  play: P('M8 5v14l11-7z'), pause: P('M6 5h4v14H6zm8 0h4v14h-4z'),
  prev: P('M6 6h2v12H6zm3.5 6 8.5 6V6z'), next: P('M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z'),
  shuffle: P('M10.59 9.17 5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z'),
  repeat: P('M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z'),
  repeat1: P('M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4zm-4-2V9h-1l-2 1v1h1.5v4H13z'),
  vol: P('M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z'),
  mute: P('M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.8 8.8 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z'),
  up: P('M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z'), down: P('M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z'),
  more: P('M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z'),
  search: P('M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'),
  person: P('M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'),
  upload: P('M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z'),
  link: P('M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7a5 5 0 0 0 0 10h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4a5 5 0 0 0 0-10z'),
  sort: P('M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z'),
  lock: P('M18 8h-1V6A5 5 0 0 0 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6a3 3 0 0 1 6 0v2H9V6z'),
  logout: P('M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z'),
  trash: P('M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z'),
  check: P('M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'),
  alert: P('M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z'),
  light: '<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></g>',
  dark: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
  auto: P('M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18V6c3.31 0 6 2.69 6 6s-2.69 6-6 6z')
};
const svg = n => `<svg class="i" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n]}</svg>`;
const paint = (root = document) => root.querySelectorAll('[data-i]').forEach(e => e.innerHTML = svg(e.dataset.i));
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = s => !isFinite(s) || s <= 0 ? '0:00' : `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
const fill = el => el.style.setProperty('--p', (el.value - el.min) / (el.max - el.min) * 100 + '%');

let toastT;
function toast(msg, kind = '') {
  const t = $('#toast');
  t.innerHTML = (kind === 'ok' ? svg('check') : kind === 'err' ? svg('alert') : '') + '<span></span>';
  t.lastChild.textContent = msg; t.className = 'show ' + kind;
  clearTimeout(toastT); toastT = setTimeout(() => t.className = '', 3200);
}
async function api(url, opts = {}) {
  if (opts.json) { opts.body = JSON.stringify(opts.json); opts.headers = { 'Content-Type': 'application/json' }; }
  const r = await fetch(url, { method: opts.method || (opts.body ? 'POST' : 'GET'), body: opts.body, headers: opts.headers });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.error || 'Request failed');
  return data;
}

// ---------- Theme ----------
const themeNow = () => { try { return localStorage.getItem('theme') || 'auto'; } catch { return 'auto'; } };
function setTheme(m) {
  try { localStorage.setItem('theme', m); } catch {}
  document.documentElement.dataset.theme = m;
  document.querySelectorAll('[data-mode]').forEach(b => b.setAttribute('aria-pressed', b.dataset.mode === m));
  const dark = m === 'dark' || (m === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
  $('meta[name=theme-color]').content = dark ? '#0f1218' : '#f4f7fc';
}
document.querySelectorAll('.themes').forEach(box => ['light', 'dark', 'auto'].forEach(m => {
  const b = document.createElement('button');
  b.type = 'button'; b.dataset.mode = m; b.innerHTML = svg(m) + `<span>${m[0].toUpperCase() + m.slice(1)}</span>`;
  b.onclick = () => setTheme(m); box.append(b);
}));
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => setTheme(themeNow()));
paint(); setTheme(themeNow());

// ---------- State ----------
let me = null, songs = [], curId = null, sort = 'custom', query = '', shuffleOn = false, loop = 'off', signup = false;
const sorters = { custom: null, new: (a, b) => new Date(b.createdAt) - new Date(a.createdAt), title: (a, b) => a.title.localeCompare(b.title), artist: (a, b) => a.artist.localeCompare(b.artist) || a.title.localeCompare(b.title) };
const sortLabels = { custom: 'My order', new: 'Newest first', title: 'Title A–Z', artist: 'Artist A–Z' };
try { const sv = localStorage.getItem('sort'); if (sv in sorters) sort = sv; } catch {}
const sorted = () => { const l = [...songs]; if (sorters[sort]) l.sort(sorters[sort]); return l; };
const shown = () => { const q = query.toLowerCase(); return sorted().filter(s => !q || (s.title + ' ' + s.artist).toLowerCase().includes(q)); };
const hue = s => { let h = 0; for (const c of s.title + s.artist) h = (h * 31 + c.charCodeAt(0)) % 360; return h; };
const artBg = s => `background:linear-gradient(135deg,hsl(${hue(s)} 75% 58%),hsl(${(hue(s) + 45) % 360} 80% 46%))`;
const cur = () => songs.find(s => s.id === curId);
let queue = [], qk = 1, history = [];

// ---------- Auth ----------
function showAuth() {
  $('#app').hidden = true; $('#mini').hidden = true; closeFull(); closeQueue(); $('#auth').hidden = false;
  document.body.classList.remove('has-player', 'playing');
}
function authMode(isSignup) {
  signup = isSignup;
  document.querySelectorAll('[data-tab]').forEach(b => b.classList.toggle('on', (b.dataset.tab === 'signup') === signup));
  $('#auth-title').textContent = signup ? 'Create your account' : 'Welcome back';
  $('#auth-sub').textContent = signup ? 'Start building your music library.' : 'Log in to keep listening.';
  $('#auth-submit').textContent = signup ? 'Create account' : 'Log in';
  $('#password').autocomplete = signup ? 'new-password' : 'current-password';
  $('#auth-error').textContent = '';
}
document.querySelectorAll('[data-tab]').forEach(b => b.onclick = () => authMode(b.dataset.tab === 'signup'));
async function submitAuth() {
  $('#auth-error').textContent = '';
  const btn = $('#auth-submit'); btn.disabled = true;
  try {
    const u = await api(signup ? '/api/signup' : '/api/login', { json: { email: $('#email').value, password: $('#password').value } });
    $('#password').value = '';
    await enter(u);
    toast(signup ? 'Account created. Welcome to Mavryx!' : 'Logged in successfully', 'ok');
  } catch (e) { $('#auth-error').textContent = e.message; }
  btn.disabled = false;
}
$('#auth-submit').onclick = submitAuth;
['#email', '#password'].forEach(s => $(s).addEventListener('keydown', e => e.key === 'Enter' && submitAuth()));

async function enter(user) {
  me = user.email ? user : await api('/api/me');
  $('#auth').hidden = true; $('#app').hidden = false;
  const ini = me.email[0].toUpperCase();
  $('#m-avatar').textContent = ini; $('#m-name').textContent = me.email;
  songs = await api('/api/songs'); qLoad(); render(); renderQueue();
}
async function logout() {
  await api('/api/logout', { method: 'POST' }).catch(() => {});
  audio.pause(); audio.removeAttribute('src'); audio.load();
  songs = []; queue = []; history = []; curId = null; me = null; showAuth(); toast('Logged out', 'ok');
}

// ---------- Menu ----------
const menu = $('#menu');
function closeMenu() {
  menu.classList.remove('open'); $('#menu-back').classList.remove('open');
  menu.setAttribute('aria-hidden', 'true'); $('#menu-btn').setAttribute('aria-expanded', 'false');
}
function openMenu() {
  menu.classList.add('open'); $('#menu-back').classList.add('open');
  menu.setAttribute('aria-hidden', 'false'); $('#menu-btn').setAttribute('aria-expanded', 'true'); $('#menu-close').focus();
}
$('#menu-back').onclick = $('#menu-close').onclick = closeMenu;
$('#menu-btn').onclick = openMenu;
document.addEventListener('click', e => {
  if (!e.target.closest('#row-menu') && !e.target.closest('[data-more]')) closeRow();
});
menu.onclick = e => {
  const b = e.target.closest('[data-act]'); if (!b) return;
  const act = b.dataset.act;
  if (act === 'sort') { const modes = Object.keys(sorters); sort = modes[(modes.indexOf(sort) + 1) % modes.length]; try { localStorage.setItem('sort', sort); } catch {} render(); renderQueue(); return; }
  closeMenu();
  ({ profile: openProfile, queue: openQueue, install: installApp, controls: openControls, upload: () => $('#file').click(), link: openLink, password: openPassword, logout })[act]();
};

// ---------- Library ----------
function render() {
  const list = shown();
  const canDrag = sort === 'custom' && !query && songs.length > 1;
  const pos = {}; queue.forEach((q, i) => { if (!pos[q.id]) pos[q.id] = i + 1; });
  $('#sort-label').textContent = 'Sort: ' + sortLabels[sort];
  $('#count').textContent = songs.length ? `${songs.length} song${songs.length > 1 ? 's' : ''}` : '';
  $('#empty').hidden = songs.length > 0;
  const hint = $('#sort-hint'); hint.hidden = songs.length < 2;
  hint.innerHTML = sort === 'custom'
    ? (query ? 'Clear the search to reorder your songs.' : 'Drag the handle to arrange your songs. Playback follows this order.')
    : `Sorted: ${sortLabels[sort]}. <button class="link" id="to-custom" type="button">Switch to My order</button> to reorder.`;
  $('#list').innerHTML = list.map(s => `
    <li class="${s.id === curId ? 'on' : ''}">
      ${canDrag ? `<button class="icon-btn qh" data-grip aria-label="Reorder ${esc(s.title)}. Drag, or use the up and down arrow keys.">${svg('grip')}</button>` : ''}
      <button class="row-main" data-play="${s.id}">
        <span class="art" style="${artBg(s)}"><span class="ltr">${esc(s.title[0] || '♪').toUpperCase()}</span><span class="eq"><i></i><i></i><i></i></span></span>
        <span class="meta"><b>${esc(s.title)}</b><small>${esc(s.artist)}${pos[s.id] ? `<span class="qchip">Queue #${pos[s.id]}</span>` : ''}</small></span>
        <span class="dur">${s.duration ? fmt(s.duration) : ''}</span>
      </button>
      <button class="icon-btn rm" data-more="${s.id}" aria-label="More options for ${esc(s.title)}" aria-haspopup="true">${svg('more')}</button>
    </li>`).join('') || (songs.length ? '<li style="padding:1.5rem;color:var(--muted)">No songs match your search.</li>' : '');
}
$('#q').oninput = e => { query = e.target.value.trim(); render(); };
$('#list').onclick = e => {
  const p = e.target.closest('[data-play]'), m = e.target.closest('[data-more]');
  if (p) return p.dataset.play === curId ? toggle() : playId(p.dataset.play);
  if (m) openRowMenu(m);
};
// Reorder songs in the library (My order)
$('#list').addEventListener('pointerdown', e => dragSort(e, $('#list'), null, moveSong));
$('#list').addEventListener('keydown', e => {
  const h = e.target.closest('[data-grip]'); if (!h || !/^Arrow(Up|Down)$/.test(e.key)) return;
  e.preventDefault();
  const id = h.closest('li').querySelector('[data-play]').dataset.play;
  const i = songs.findIndex(s => s.id === id), t = i + (e.key === 'ArrowUp' ? -1 : 1);
  if (t < 0 || t >= songs.length) return;
  moveSong(i, t); $(`#list [data-play="${id}"]`).closest('li').querySelector('[data-grip]').focus();
});
$('#sort-hint').onclick = e => {
  if (!e.target.closest('#to-custom')) return;
  sort = 'custom'; try { localStorage.setItem('sort', sort); } catch {} render(); renderQueue();
};
function moveSong(a, b) { songs.splice(b, 0, songs.splice(a, 1)[0]); saveOrder(); render(); renderQueue(); }
let orderT;
function saveOrder() {
  clearTimeout(orderT);
  orderT = setTimeout(() => api('/api/songs/order', { method: 'PUT', json: { ids: songs.map(s => s.id) } })
    .catch(() => toast('Could not save the new order', 'err')), 400);
}
async function removeSong(id) {
  const s = songs.find(x => x.id === id);
  if (!s || !confirm(`Remove "${s.title}" from your library?`)) return;
  try { await api('/api/songs/' + id, { method: 'DELETE' }); } catch (err) { return toast(err.message, 'err'); }
  if (id === curId) { audio.pause(); audio.removeAttribute('src'); curId = null; $('#mini').hidden = true; closeFull(); document.body.classList.remove('has-player', 'playing'); }
  songs = songs.filter(x => x.id !== id); queue = queue.filter(q => q.id !== id); history = history.filter(h => h !== id);
  qChanged(); toast('Song removed', 'ok');
}

// Upload (asks artist per song)
let pending = [];
$('#upload-btn').onclick = () => $('#file').click();
$('#file').onchange = e => {
  pending = [...e.target.files]; e.target.value = '';
  if (!pending.length) return;
  $('#up-error').textContent = ''; $('#up-all').value = '';
  $('#up-rows').innerHTML = pending.map(f => `<div class="up-row"><small>${esc(f.name)}</small>
    <input class="u-title" placeholder="Song title" value="${esc(f.name.replace(/\.[^.]+$/, '').replace(/[_]+/g, ' '))}" aria-label="Song title">
    <input class="u-artist" placeholder="Artist / singer name" aria-label="Artist or singer name"></div>`).join('');
  $('#up-dlg').showModal(); document.querySelector('.u-artist').focus();
};
$('#up-all').oninput = e => document.querySelectorAll('.u-artist').forEach(i => i.value = e.target.value);
$('#up-save').onclick = async e => {
  e.preventDefault();
  const titles = [...document.querySelectorAll('.u-title')], artists = [...document.querySelectorAll('.u-artist')];
  if (artists.some(a => !a.value.trim())) return $('#up-error').textContent = 'Enter the artist or singer name for every song.';
  const fd = new FormData();
  pending.forEach((f, i) => { fd.append('files', f); fd.append('titles', titles[i].value.trim()); fd.append('artists', artists[i].value.trim()); });
  $('#up-save').disabled = true; toast(`Uploading ${pending.length} song${pending.length > 1 ? 's' : ''}…`);
  try {
    const added = await api('/api/songs/upload', { method: 'POST', body: fd });
    songs = [...added, ...songs]; render(); $('#up-dlg').close();
    toast(added.length ? `Added ${added.length} song${added.length > 1 ? 's' : ''}` : 'No audio files found', added.length ? 'ok' : 'err');
  } catch (err) { $('#up-error').textContent = err.message; toast(err.message, 'err'); }
  $('#up-save').disabled = false;
};

// Add by link
function openLink() { $('#u-error').textContent = ''; $('#link-dlg').showModal(); $('#u-url').focus(); }
$('#link-btn').onclick = openLink;
$('#u-save').onclick = async e => {
  e.preventDefault();
  if (!$('#u-url').value.trim()) return $('#u-error').textContent = 'Enter a link to an audio file.';
  if (!$('#u-artist').value.trim()) return $('#u-error').textContent = 'Enter the artist or singer name.';
  try {
    const s = await api('/api/songs/url', { json: { url: $('#u-url').value, title: $('#u-title').value, artist: $('#u-artist').value } });
    songs.unshift(s); render(); ['#u-url', '#u-title', '#u-artist'].forEach(x => $(x).value = ''); $('#link-dlg').close(); toast('Song added', 'ok');
  } catch (err) { $('#u-error').textContent = err.message; }
};

// Profile + password
function openProfile() {
  $('#p-avatar').textContent = me.email[0].toUpperCase(); $('#p-email').textContent = me.email;
  $('#p-since').textContent = me.createdAt ? 'Member since ' + new Date(me.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : '';
  const up = songs.filter(s => s.source === 'file').length;
  $('#s-all').textContent = songs.length; $('#s-up').textContent = up; $('#s-link').textContent = songs.length - up;
  $('#profile-dlg').showModal();
}
function openPassword() { $('#pw-error').textContent = ''; $('#pw-dlg').showModal(); $('#pw-cur').focus(); }
$('#p-pass').onclick = e => { e.preventDefault(); $('#profile-dlg').close(); openPassword(); };
$('#pw-save').onclick = async e => {
  e.preventDefault();
  try {
    await api('/api/password', { json: { current: $('#pw-cur').value, next: $('#pw-new').value } });
    $('#pw-cur').value = $('#pw-new').value = ''; $('#pw-dlg').close(); toast('Password updated', 'ok');
  } catch (err) { $('#pw-error').textContent = err.message; }
};

// ---------- Player ----------
const audio = new Audio(); audio.preload = 'metadata';
try { audio.volume = (+localStorage.getItem('vol') || 100) / 100; } catch {}
$('#vol').value = Math.round(audio.volume * 100);
const speeds = [0.75, 1, 1.25, 1.5, 2]; let spIdx = 1;

function playId(id, back) {
  const s = songs.find(x => x.id === id); if (!s) return;
  if (!back && curId && curId !== id) { history.push(curId); if (history.length > 50) history.shift(); }
  curId = id; audio.src = s.src; audio.play().catch(() => toast('Could not play this song', 'err'));
  showTrack(); render(); renderQueue();
}
function showTrack() {
  const s = cur(); if (!s) return;
  $('#mini').hidden = false; document.body.classList.add('has-player');
  $('#m-title').textContent = $('#f-title').textContent = s.title;
  $('#m-artist').textContent = $('#f-artist').textContent = s.artist;
  $('#m-art').setAttribute('style', artBg(s)); $('#m-art').textContent = (s.title[0] || '♪').toUpperCase();
  $('#f-art').setAttribute('style', artBg(s)); $('#f-art').innerHTML = svg('note');
  $('#full').style.setProperty('--h', hue(s));
  if ('mediaSession' in navigator) navigator.mediaSession.metadata = new MediaMetadata({
    title: s.title, artist: s.artist, album: 'Mavryx', artwork: [{ src: '/icon-512.png', sizes: '512x512', type: 'image/png' }] });
}
function step(d) {
  if (d > 0 && queue.length) { const it = queue.shift(); qChanged(); return playId(it.id); } // queue always wins
  const q = sorted(); if (!q.length) return;
  const i = q.findIndex(s => s.id === curId);
  if (shuffleOn && q.length > 1) { let j; do { j = Math.floor(Math.random() * q.length); } while (j === i); return playId(q[j].id); }
  playId(q[(i + d + q.length) % q.length].id);
}
const toggle = () => audio.src ? (audio.paused ? audio.play() : audio.pause()) : null;
const prev = () => {
  if (audio.currentTime > 3) return audio.currentTime = 0;
  const h = history.pop(); h && songs.some(x => x.id === h) ? playId(h, true) : step(-1);
};
const next = () => step(1);
audio.onended = () => {
  if (queue.length) return step(1);
  const q = sorted(), last = q.findIndex(s => s.id === curId) === q.length - 1;
  if (last && loop === 'off' && !shuffleOn) return;
  step(1);
};
audio.onerror = () => { if (audio.getAttribute('src')) toast('This song failed to load', 'err'); };
function syncPlay() {
  const p = audio.paused;
  ['#m-play', '#play'].forEach(s => { $(s).innerHTML = svg(p ? 'play' : 'pause'); $(s).setAttribute('aria-label', p ? 'Play' : 'Pause'); });
  document.body.classList.toggle('playing', !p);
  if ('mediaSession' in navigator) navigator.mediaSession.playbackState = p ? 'paused' : 'playing';
}
audio.onplay = audio.onpause = syncPlay; syncPlay();
let seeking = false;
audio.ontimeupdate = audio.onloadedmetadata = () => {
  const d = audio.duration, t = audio.currentTime;
  $('#cur').textContent = fmt(t); $('#dur').textContent = fmt(d);
  if (isFinite(d) && d > 0) {
    $('#mprog').style.width = (t / d * 100) + '%';
    if (!seeking) { $('#seek').value = t / d * 1000; fill($('#seek')); }
    if ('mediaSession' in navigator) try { navigator.mediaSession.setPositionState({ duration: d, playbackRate: audio.playbackRate, position: Math.min(t, d) }); } catch {}
  }
};
$('#seek').oninput = e => { seeking = true; fill(e.target); if (isFinite(audio.duration)) $('#cur').textContent = fmt(e.target.value / 1000 * audio.duration); };
$('#seek').onchange = e => { if (isFinite(audio.duration)) audio.currentTime = e.target.value / 1000 * audio.duration; seeking = false; };

$('#play').onclick = $('#m-play').onclick = toggle;
$('#next').onclick = $('#m-next').onclick = next; $('#prev').onclick = prev;
$('#back10').onclick = () => audio.currentTime = Math.max(0, audio.currentTime - 10);
$('#fwd10').onclick = () => audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 10);
$('#shuffle').onclick = () => { shuffleOn = !shuffleOn; $('#shuffle').setAttribute('aria-pressed', shuffleOn); toast(shuffleOn ? 'Shuffle on' : 'Shuffle off'); renderQueue(); };
function syncLoop() {
  audio.loop = loop === 'one';
  $('#loop').innerHTML = svg(loop === 'one' ? 'repeat1' : 'repeat');
  $('#loop').setAttribute('aria-pressed', loop !== 'off');
  $('#loop').setAttribute('aria-label', { off: 'Loop off', all: 'Loop all', one: 'Loop this song' }[loop]);
}
$('#loop').onclick = () => { loop = loop === 'off' ? 'all' : loop === 'all' ? 'one' : 'off'; syncLoop(); toast({ off: 'Loop off', all: 'Looping all songs', one: 'Looping this song' }[loop]); renderQueue(); };
syncLoop();
function syncVol() {
  const v = audio.muted ? 0 : audio.volume;
  $('#mute').innerHTML = svg(v === 0 ? 'mute' : 'vol'); $('#vol').value = Math.round(v * 100); fill($('#vol'));
  $('#mute').setAttribute('aria-label', audio.muted ? 'Unmute' : 'Mute');
}
$('#vol').oninput = e => { audio.muted = false; audio.volume = e.target.value / 100; try { localStorage.setItem('vol', e.target.value); } catch {} syncVol(); };
$('#mute').onclick = () => { audio.muted = !audio.muted; syncVol(); };
syncVol();
$('#speed').onclick = () => { spIdx = (spIdx + 1) % speeds.length; audio.playbackRate = speeds[spIdx]; $('#speed').textContent = speeds[spIdx] + '×'; };

// ---------- Queue ----------
const qSong = id => songs.find(s => s.id === id);
const qKey = () => 'mavryx-queue:' + (me ? me.email : '');
function qSave() { try { localStorage.setItem(qKey(), JSON.stringify(queue)); } catch {} }
function qLoad() {
  try { queue = JSON.parse(localStorage.getItem(qKey()) || '[]').filter(q => qSong(q.id)); } catch { queue = []; }
  qk = queue.reduce((m, q) => Math.max(m, q.k), 0) + 1;
}
function qChanged() { qSave(); render(); renderQueue(); }
function qAdd(id, front) {                       // front = Play next, otherwise add to end
  const it = { k: qk++, id }; front ? queue.unshift(it) : queue.push(it); qChanged();
  toast(front ? 'Playing next' : `Added to queue · position ${queue.length}`, 'ok');
}
const qRemove = k => { queue = queue.filter(q => q.k !== k); qChanged(); };
function qClear() { if (!queue.length) return; queue = []; qChanged(); toast('Queue cleared', 'ok'); }

const qArt = s => `<span class="art sm" style="${artBg(s)}">${esc((s.title[0] || '♪').toUpperCase())}</span>`;
const qMeta = s => `<span class="meta"><b>${esc(s.title)}</b><small>${esc(s.artist)}</small></span>`;
function renderQueue() {
  const n = queue.length, s = cur();
  document.querySelectorAll('.qbadge').forEach(b => { b.textContent = n > 99 ? '99+' : n; b.hidden = !n; });
  $('#q-now').innerHTML = s ? `<div class="q-item">${qArt(s)}${qMeta(s)}</div>` : '<p class="muted note">Nothing is playing.</p>';
  $('#q-count').textContent = n ? `(${n})` : '';
  $('#q-empty').hidden = n > 0; $('#q-clear').disabled = !n;
  $('#q-list').innerHTML = queue.map((q, i) => { const x = qSong(q.id); return `<li data-k="${q.k}">
    <button class="icon-btn qh" data-grip aria-label="Reorder ${esc(x.title)}. Drag, or use the up and down arrow keys.">${svg('grip')}</button>
    <span class="qpos">${i + 1}</span>
    <button class="q-main" data-qplay="${q.k}">${qArt(x)}${qMeta(x)}</button>
    <button class="icon-btn" data-qrm="${q.k}" aria-label="Remove ${esc(x.title)} from queue">${svg('close')}</button></li>`; }).join('');
  const lib = $('#q-lib'), note = $('#q-lib-note');
  if (shuffleOn) { lib.innerHTML = ''; note.textContent = 'Shuffle is on, so the song after your queue is picked at random.'; note.hidden = false; }
  else {
    const all = sorted(), i = all.findIndex(x => x.id === curId);
    let up = i < 0 ? [] : all.slice(i + 1); if (loop === 'all' && i >= 0) up = up.concat(all.slice(0, i));
    lib.innerHTML = up.slice(0, 10).map((x, j) => `<li><span class="qpos dim">${n + j + 1}</span>
      <button class="q-main" data-qlib="${x.id}">${qArt(x)}${qMeta(x)}</button>
      <button class="icon-btn" data-qadd="${x.id}" aria-label="Add ${esc(x.title)} to queue">${svg('qadd')}</button></li>`).join('');
    note.hidden = true;
  }
  $('#q-lib-h').hidden = !lib.children.length && note.hidden;
}
function openQueue() { renderQueue(); $('#queue').classList.add('open'); $('#q-back').classList.add('open'); $('#queue').setAttribute('aria-hidden', 'false'); $('#q-close').focus(); }
function closeQueue() { $('#queue').classList.remove('open'); $('#q-back').classList.remove('open'); $('#queue').setAttribute('aria-hidden', 'true'); }
$('#m-queue').onclick = $('#f-queue').onclick = openQueue;
$('#q-close').onclick = $('#q-back').onclick = closeQueue;
$('#q-clear').onclick = qClear;
$('#q-list').onclick = e => {
  const r = e.target.closest('[data-qrm]'), p = e.target.closest('[data-qplay]');
  if (r) return qRemove(+r.dataset.qrm);
  if (p) { const i = queue.findIndex(q => q.k === +p.dataset.qplay), it = queue[i]; queue.splice(0, i + 1); qChanged(); playId(it.id); }
};
$('#q-lib').onclick = e => {
  const a = e.target.closest('[data-qadd]'), p = e.target.closest('[data-qlib]');
  if (a) qAdd(a.dataset.qadd, false); else if (p) playId(p.dataset.qlib);
};

// Drag to reorder any list (pointer events: works with mouse and touch). onDrop(fromIndex, toIndex)
function dragSort(e, ul, scrollSel, onDrop) {
  const h = e.target.closest('[data-grip]'); if (!h) return;
  e.preventDefault(); h.setPointerCapture(e.pointerId);
  const li = h.closest('li'), items = [...ul.children], sc = scrollSel ? $(scrollSel) : document.scrollingElement;
  const i0 = items.indexOf(li), n = items.length, y0 = e.clientY, s0 = sc.scrollTop;
  const H = n > 1 ? items[1].offsetTop - items[0].offsetTop : li.offsetHeight;
  let t = i0; li.classList.add('drag');
  const move = ev => {
    const vp = scrollSel ? sc.getBoundingClientRect() : { top: 70, bottom: innerHeight - 110 };
    if (ev.clientY < vp.top + 50) sc.scrollTop -= 12; else if (ev.clientY > vp.bottom - 50) sc.scrollTop += 12;
    const dy = ev.clientY - y0 + (sc.scrollTop - s0);
    li.style.transform = `translateY(${dy}px)`;
    t = Math.max(0, Math.min(n - 1, Math.round(i0 + dy / H)));
    items.forEach((el, j) => {
      if (el === li) return;
      el.style.transform = (i0 < t && j > i0 && j <= t) ? `translateY(${-H}px)` : (i0 > t && j >= t && j < i0) ? `translateY(${H}px)` : '';
    });
  };
  const end = () => {
    h.removeEventListener('pointermove', move); h.removeEventListener('pointerup', end); h.removeEventListener('pointercancel', end);
    items.forEach(el => el.style.transform = ''); li.classList.remove('drag');
    if (t !== i0) onDrop(i0, t);
  };
  h.addEventListener('pointermove', move); h.addEventListener('pointerup', end); h.addEventListener('pointercancel', end);
}
$('#q-list').addEventListener('pointerdown', e => dragSort(e, $('#q-list'), '.q-body', (a, b) => { queue.splice(b, 0, queue.splice(a, 1)[0]); qChanged(); }));
$('#q-list').addEventListener('keydown', e => {   // keyboard reorder
  const h = e.target.closest('[data-grip]'); if (!h || !/^Arrow(Up|Down)$/.test(e.key)) return;
  e.preventDefault();
  const k = +h.closest('li').dataset.k, i = queue.findIndex(q => q.k === k), t = i + (e.key === 'ArrowUp' ? -1 : 1);
  if (t < 0 || t >= queue.length) return;
  queue.splice(t, 0, queue.splice(i, 1)[0]); qChanged(); $(`#q-list [data-k="${k}"] [data-grip]`).focus();
});

// Per-song menu in the library
let rmId = null; const rowMenu = $('#row-menu');
function closeRow() { rowMenu.hidden = true; }
function openRowMenu(btn) {
  rmId = btn.dataset.more; rowMenu.hidden = false;
  const r = btn.getBoundingClientRect(), w = 230, h = rowMenu.offsetHeight || 170;
  rowMenu.style.left = Math.max(8, Math.min(innerWidth - w - 8, r.right - w)) + 'px';
  rowMenu.style.top = (r.bottom + 6 + h > innerHeight ? Math.max(8, r.top - h - 6) : r.bottom + 6) + 'px';
}
rowMenu.onclick = e => {
  const b = e.target.closest('[data-ra]'); if (!b) return;
  const id = rmId; closeRow();
  if (b.dataset.ra === 'next') qAdd(id, true); else if (b.dataset.ra === 'end') qAdd(id, false); else removeSong(id);
};
addEventListener('scroll', closeRow, { passive: true });

// Expand / collapse
function openFull() { if (!curId) return; $('#full').classList.add('open'); $('#full').setAttribute('aria-hidden', 'false'); $('#collapse').focus(); }
function closeFull() { $('#full').classList.remove('open'); $('#full').setAttribute('aria-hidden', 'true'); }
$('#expand').onclick = $('#m-up').onclick = openFull;
$('#collapse').onclick = closeFull;
let ty = null;
$('#full').addEventListener('touchstart', e => ty = e.touches[0].clientY, { passive: true });
$('#full').addEventListener('touchend', e => { if (ty !== null && e.changedTouches[0].clientY - ty > 110 && $('#full').scrollTop === 0) closeFull(); ty = null; });

// Lock-screen / notification controls (background playback)
if ('mediaSession' in navigator) {
  const h = (a, f) => { try { navigator.mediaSession.setActionHandler(a, f); } catch {} };
  h('play', () => audio.play()); h('pause', () => audio.pause()); h('previoustrack', prev); h('nexttrack', next);
  h('seekbackward', d => audio.currentTime = Math.max(0, audio.currentTime - (d.seekOffset || 10)));
  h('seekforward', d => audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + (d.seekOffset || 10)));
  h('seekto', d => audio.currentTime = d.seekTime);
}

// Keyboard shortcuts
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeMenu(); closeRow(); if ($('#queue').classList.contains('open')) closeQueue(); else closeFull(); return; }
  if (e.key === '?' && !e.target.matches('input,textarea') && !document.querySelector('dialog[open]')) return openControls();
  if (e.target.matches('input,textarea,[data-grip]') || document.querySelector('dialog[open]') || e.ctrlKey || e.metaKey || e.altKey || !curId) return;
  const k = e.key.toLowerCase();
  if (k === ' ') { e.preventDefault(); toggle(); }
  else if (k === 'arrowright') audio.currentTime += 5;
  else if (k === 'arrowleft') audio.currentTime -= 5;
  else if (k === 'arrowup') { e.preventDefault(); audio.volume = Math.min(1, audio.volume + .05); syncVol(); }
  else if (k === 'arrowdown') { e.preventDefault(); audio.volume = Math.max(0, audio.volume - .05); syncVol(); }
  else if (k === 's') $('#shuffle').click(); else if (k === 'l') $('#loop').click(); else if (k === 'e') ($('#full').classList.contains('open') ? closeFull() : openFull()); else if (k === 'q') ($('#queue').classList.contains('open') ? closeQueue() : openQueue()); else if (k === 'n') next(); else if (k === 'p') prev(); else if (k === 'm') $('#mute').click();
});

// ---------- Install app + keyboard controls ----------
let installEvt = null;
const standalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
function syncInstall() {
  const b = $('[data-act=install]'), done = standalone();
  b.classList.toggle('done', done);
  b.firstElementChild.innerHTML = svg(done ? 'check' : 'install');
  $('#install-label').textContent = done ? 'App installed' : 'Install app';
}
addEventListener('beforeinstallprompt', e => { e.preventDefault(); installEvt = e; syncInstall(); });
addEventListener('appinstalled', () => { installEvt = null; syncInstall(); toast('Mavryx installed', 'ok'); });
async function installApp() {
  if (standalone()) return toast('You are already using the installed app', 'ok');
  if (installEvt) {                                   // one-tap install when the browser allows it
    const e = installEvt; installEvt = null; e.prompt();
    const r = await e.userChoice; if (r.outcome !== 'accepted') toast('Install cancelled'); return;
  }
  showInstallSteps();                                 // otherwise show manual steps
}
function showInstallSteps() {
  const ua = navigator.userAgent, ios = /iphone|ipad|ipod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const android = /android/i.test(ua), firefox = /firefox|fxios/i.test(ua), edge = /edg/i.test(ua);
  const safari = /safari/i.test(ua) && !/chrome|crios|android|fxios|edg/i.test(ua);
  let name, steps;
  if (ios) { name = 'iPhone or iPad'; steps = ['Open Mavryx in Safari.', 'Tap the Share button (the square with an arrow pointing up).', 'Scroll down and tap “Add to Home Screen”.', 'Tap Add. Mavryx now opens like a normal app.']; }
  else if (android && firefox) { name = 'Android (Firefox)'; steps = ['Tap the ⋮ menu at the top right.', 'Tap “Install”.', 'Confirm by tapping Add.']; }
  else if (android) { name = 'Android'; steps = ['Open Mavryx in Chrome.', 'Tap the ⋮ menu at the top right.', 'Tap “Install app” or “Add to Home screen”.', 'Tap Install to confirm.']; }
  else if (safari) { name = 'Safari on Mac'; steps = ['In the menu bar, choose File.', 'Choose “Add to Dock…”.', 'Click Add.']; }
  else if (firefox) { name = 'Firefox on desktop'; steps = ['Firefox on desktop cannot install web apps.', 'Open Mavryx in Chrome or Edge instead.', 'Then use the install icon at the right end of the address bar.']; }
  else if (edge) { name = 'Microsoft Edge'; steps = ['Click the install icon at the right end of the address bar, or open the ⋯ menu.', 'Choose Apps, then “Install this site as an app”.', 'Click Install.']; }
  else { name = 'Chrome on desktop'; steps = ['Click the install icon (a monitor with a down arrow) at the right end of the address bar.', 'Or open the ⋮ menu and choose “Install Mavryx” (under “Cast, save and share”).', 'Click Install.']; }
  $('#inst-intro').textContent = `Your browser did not offer a one-tap install, so here is how to add Mavryx on ${name}.`;
  $('#inst-steps').innerHTML = steps.map(t => `<li><span>${esc(t)}</span></li>`).join('');
  $('#install-dlg').showModal();
}
syncInstall();

const KEYS = [['Space', 'Play or pause'], ['← →', 'Seek 5 seconds back or forward'], ['↑ ↓', 'Volume up or down'], ['N', 'Next song'], ['P', 'Previous song'],
  ['M', 'Mute or unmute'], ['S', 'Shuffle on or off'], ['L', 'Loop: off, all, one'], ['Q', 'Open or close the queue'], ['E', 'Expand or collapse the player'],
  ['?', 'Show this list'], ['Esc', 'Close the open panel']];
function openControls() {
  $('#keys-list').innerHTML = KEYS.map(([k, d]) => `<div class="k"><span>${k === 'Space' || k === 'Esc' ? `<kbd>${k}</kbd>` : k.split(' ').map(x => `<kbd>${x}</kbd>`).join('')}</span><span>${d}</span></div>`).join('')
    + `<div class="k"><span><kbd>↑</kbd><kbd>↓</kbd></span><span>On a queue drag handle: move the song up or down</span></div>`;
  $('#keys-dlg').showModal();
}

// ---------- Boot ----------
if ('serviceWorker' in navigator) addEventListener('load', () => navigator.serviceWorker.register('/sw.js'));
authMode(false);
api('/api/me').then(enter).catch(showAuth);
