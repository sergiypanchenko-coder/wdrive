/* Wubber: Torino pilot. Plain JavaScript, no build step. */
(function () {
  "use strict";

  /* ---------- Places in Torino ---------- */
  const SPOTS = [
    ["Piazza San Carlo", "10123 Torino TO", 45.0677, 7.6826],
    ["Piazza Castello", "10122 Torino TO", 45.0712, 7.6857],
    ["Piazza Vittorio Veneto", "10124 Torino TO", 45.0649, 7.6953],
    ["Mole Antonelliana", "Via Montebello, 20, 10124 Torino TO", 45.0690, 7.6932],
    ["Stazione Porta Nuova", "Corso Vittorio Emanuele II, 53, 10125 Torino TO", 45.0621, 7.6787],
    ["Stazione Porta Susa", "Piazza XVIII Dicembre, 10122 Torino TO", 45.0718, 7.6655],
    ["ESCP Business School, Turin campus", "Corso Unione Sovietica, 218 bis, 10134 Torino TO", 45.0399, 7.6474],
    ["Politecnico di Torino", "Corso Duca degli Abruzzi, 24, 10129 Torino TO", 45.0625, 7.6624],
    ["Università di Torino, Rettorato", "Via Giuseppe Verdi, 8, 10124 Torino TO", 45.0697, 7.6918],
    ["Campus Luigi Einaudi", "Lungo Dora Siena, 100, 10153 Torino TO", 45.0745, 7.7012],
    ["Palazzo Nuovo", "Via Sant'Ottavio, 20, 10124 Torino TO", 45.0693, 7.6955],
    ["Lingotto", "Via Nizza, 280, 10126 Torino TO", 45.0326, 7.6646],
    ["Eataly Lingotto", "Via Nizza, 230, 10126 Torino TO", 45.0340, 7.6670],
    ["Parco del Valentino", "Corso Massimo d'Azeglio, 10126 Torino TO", 45.0545, 7.6853],
    ["San Salvario, Via Madama Cristina", "10125 Torino TO", 45.0560, 7.6820],
    ["Quadrilatero Romano", "Via Sant'Agostino, 10122 Torino TO", 45.0745, 7.6802],
    ["Museo Egizio", "Via Accademia delle Scienze, 6, 10123 Torino TO", 45.0684, 7.6843],
    ["Ospedale Molinette", "Corso Bramante, 88, 10126 Torino TO", 45.0410, 7.6740],
    ["Allianz Stadium", "Corso Gaetano Scirea, 50, 10151 Torino TO", 45.1096, 7.6413],
    ["Murazzi del Po", "Lungo Po Armando Diaz, 10124 Torino TO", 45.0649, 7.6970],
    ["Porta Palazzo", "Piazza della Repubblica, 10122 Torino TO", 45.0770, 7.6830],
    ["Gran Madre di Dio", "Piazza Gran Madre di Dio, 10131 Torino TO", 45.0626, 7.6990],
    ["Piazza Statuto", "10122 Torino TO", 45.0757, 7.6699],
    ["Piazza Carlo Felice", "10123 Torino TO", 45.0636, 7.6795],
    ["Piazza Solferino", "10121 Torino TO", 45.0688, 7.6773],
    ["Piazza Bodoni", "10123 Torino TO", 45.0636, 7.6838],
    ["Vanchiglia, Piazza Santa Giulia", "10124 Torino TO", 45.0697, 7.6993],
    ["Cit Turin, Piazza Benefica", "10138 Torino TO", 45.0743, 7.6600],
    ["Crocetta, Largo Orbassano", "10129 Torino TO", 45.0560, 7.6600],
    ["Aeroporto di Torino-Caselle", "Strada San Maurizio, 12, 10072 Caselle Torinese TO", 45.2008, 7.6496]
  ].map(function (a) { return { label: a[0], sub: a[1], lat: a[2], lng: a[3] }; });

  const STREETS = ["Via Roma","Via Po","Via Garibaldi","Via Lagrange","Via Carlo Alberto","Via Accademia Albertina","Via della Rocca","Via Mazzini","Via San Massimo","Via Nizza","Via Madama Cristina","Via Saluzzo","Via Ormea","Via Sacchi","Via XX Settembre","Via Pietro Micca","Via Cernaia","Via Bertola","Via Santa Teresa","Via Barbaroux","Via Milano","Via Cigna","Via Bologna","Via Vanchiglia","Via Santa Giulia","Via Napione","Via Giuseppe Verdi","Via Rossini","Via Cibrario","Via Frejus","Via Di Nanni","Via Monginevro","Via Arsenale","Via Stampatori","Via Bligny","Via Sant'Agostino","Via delle Orfane","Via Belfiore","Via Principe Tommaso","Via Baretti","Via Galliari","Via Berthollet","Via Valperga Caluso","Via Chiabrera","Via Cavour","Via Andrea Doria","Via Maria Vittoria","Via Giolitti","Via dei Mille","Via Bogino","Via San Francesco da Paola","Via Sant'Ottavio","Via Montebello","Via Nizza","Via Tripoli","Via Filadelfia","Via Guala","Corso Vittorio Emanuele II","Corso Francia","Corso Regina Margherita","Corso Giulio Cesare","Corso San Maurizio","Corso Casale","Corso Moncalieri","Corso Massimo d'Azeglio","Corso Re Umberto","Corso Galileo Ferraris","Corso Vinzaglio","Corso Duca degli Abruzzi","Corso Turati","Corso Unione Sovietica","Corso Orbassano","Corso Sebastopoli","Corso Bramante","Corso Dante","Corso Raffaello","Corso Peschiera","Corso Inghilterra","Corso Principe Oddone","Corso Svizzera","Corso Grosseto","Corso Belgio","Corso Tortona","Corso Regio Parco","Corso Novara","Corso Vercelli","Corso Palermo","Corso Lecce","Corso Racconigi","Corso Traiano","Corso Spezia","Corso Marconi","Corso Matteotti","Corso Stati Uniti","Corso Castelfidardo","Corso Ferrucci","Corso Rosselli","Corso Einaudi","Corso Trapani","Corso Mediterraneo","Piazza Carignano","Piazza Madama Cristina","Piazza Emanuele Filiberto","Piazza della Repubblica","Piazza Arbarello","Piazza Savoia","Largo Saluzzo","Piazza Sabotino","Piazza Rivoli","Piazza Bernini","Piazza Adriano","Piazza Carducci","Piazza Polonia","Piazza Crispi","Piazza Galimberti","Piazza Nizza","Lungo Po Cadorna","Lungo Dora Siena","Lungo Dora Napoli"];
  const PLACES = SPOTS.concat(STREETS.filter(function (s, i) { return STREETS.indexOf(s) === i; }).map(function (s) { return { label: s, sub: "Torino TO", street: true }; }));

  /* ---------- Helpers ---------- */
  const $ = function (s, el) { return (el || document).querySelector(s); };
  const $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { if (v == null || v === "") localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) {} }
  function nowISO() { return new Date().toISOString(); }
  function ago(iso) {
    if (!iso) return "";
    const s = (Date.now() - Date.parse(iso)) / 1000;
    if (s < 60) return "just now";
    if (s < 3600) return Math.floor(s / 60) + " min ago";
    if (s < 86400) return Math.floor(s / 3600) + " h ago";
    return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  }
  function hhmm(iso) { return iso ? new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : ""; }
  function first(name) { return String(name || "").trim().split(/\s+/)[0] || "Your driver"; }
  function initials(name) { const p = String(name || "?").trim().split(/\s+/); return ((p[0] || "?")[0] + (p[1] ? p[1][0] : "")).toUpperCase(); }
  function norm(s) { return String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(); }
  function pct(n, d) { return d ? Math.round((n / d) * 100) : 0; }
  const PIN_ICON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>';
  const CHECK = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>';

  /* ---------- State ---------- */
  const S = {
    dl: true, riderCount: 0, pins: {}, authChecking: false, recovery: false,
    rides: [], drivers: [], waitlist: [],
    loaded: { rides: false, drivers: false, waitlist: false, accounts: false },
    tab: "ride",
    fields: {},
    est: null,
    account: null, dismissed: new Set(), authMode: "login",
    pendingRide: null,
    pendingDriver: null,
    drafts: {},
    fbFor: null,
    sosAlerted: null
  };

  /* ---------- Toast ---------- */
  let toastTimer = null;
  function toast(msg, isErr, ms) {
    const t = $("#toast");
    t.textContent = msg;
    t.className = "toast" + (isErr ? " err" : "");
    t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.hidden = true; }, ms || (isErr ? 6000 : 3200));
  }

  /* ---------- Supabase connection (plain fetch, no library) ---------- */
  const CFG = window.WSR_CONFIG || {};
  const API = { url: String(CFG.supabaseUrl || "").trim().replace(/\/+$/, ""), key: String(CFG.supabaseAnonKey || "").trim() };
  function apiConfigured() { return (/^https:\/\/[^\s]+$/.test(API.url) || /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(API.url)) && API.url.indexOf("YOUR-PROJECT") === -1 && API.key.length > 30; }
  const SESSION_KEY = "wsr.session";
  let SESSION = null;
  try { SESSION = JSON.parse(lsGet(SESSION_KEY) || "null"); } catch (e) { SESSION = null; }
  function saveSession(s) { SESSION = s; lsSet(SESSION_KEY, s ? JSON.stringify(s) : null); }
  function apiError(message, code, status) { const e = new Error(message); e.code = code; e.status = status; return e; }
  function toSession(j) {
    return { access_token: j.access_token, refresh_token: j.refresh_token, expires_at: j.expires_at || Math.floor(Date.now() / 1000) + (j.expires_in || 3600), user: j.user || null };
  }
  async function authFetch(path, body, method, token) {
    let r;
    try {
      r = await fetch(API.url + "/auth/v1/" + path, {
        method: method || "POST",
        headers: Object.assign({ apikey: API.key, "Content-Type": "application/json" }, token ? { Authorization: "Bearer " + token } : {}),
        body: body == null ? undefined : JSON.stringify(body)
      });
    } catch (e) { throw apiError("network", "network", 0); }
    const txt = await r.text();
    let j = {};
    try { j = txt ? JSON.parse(txt) : {}; } catch (e) {}
    if (!r.ok) throw apiError(j.msg || j.error_description || j.message || ("Error " + r.status), j.error_code || j.code || j.error, r.status);
    return j;
  }
  let refreshing = null;
  async function accessToken() {
    if (!SESSION) return null;
    if (SESSION.expires_at - 60 > Date.now() / 1000) return SESSION.access_token;
    if (!refreshing) {
      refreshing = authFetch("token?grant_type=refresh_token", { refresh_token: SESSION.refresh_token })
        .then(function (j) { saveSession(toSession(j)); return SESSION.access_token; })
        .catch(function (e) { if (e.status >= 400 && e.status < 500) saveSession(null); throw e; })
        .finally(function () { refreshing = null; });
    }
    return refreshing;
  }
  async function rest(method, path, body, prefer) {
    const tok = await accessToken();
    const h = { apikey: API.key, Authorization: "Bearer " + (tok || API.key), "Content-Type": "application/json" };
    if (prefer) h.Prefer = prefer;
    let r;
    try { r = await fetch(API.url + "/rest/v1/" + path, { method: method, headers: h, body: body == null ? undefined : JSON.stringify(body) }); }
    catch (e) { throw apiError("network", "network", 0); }
    const txt = await r.text();
    let j = null;
    try { j = txt ? JSON.parse(txt) : null; } catch (e) {}
    if (!r.ok) throw apiError((j && (j.message || j.msg)) || ("Error " + r.status), j && j.code, r.status);
    return j;
  }
  const db = {
    select: function (table, query) { return rest("GET", table + "?" + query); },
    insert: function (table, row) { return rest("POST", table, row, "return=minimal"); },
    update: function (table, query, patch) { return rest("PATCH", table + "?" + query, patch, "return=minimal"); },
    rpc: function (fn, args) { return rest("POST", "rpc/" + fn, args || {}); }
  };
  function uuid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    const b = new Uint8Array(16);
    try { crypto.getRandomValues(b); } catch (e) { for (let i = 0; i < 16; i++) b[i] = Math.floor(Math.random() * 256); }
    b[6] = (b[6] & 0x0f) | 0x40; b[8] = (b[8] & 0x3f) | 0x80;
    const h = Array.from(b).map(function (x) { return x.toString(16).padStart(2, "0"); }).join("");
    return h.slice(0, 8) + "-" + h.slice(8, 12) + "-" + h.slice(12, 16) + "-" + h.slice(16, 20) + "-" + h.slice(20);
  }

  function errMsg(e) {
    const code = e && e.code, status = e && e.status, m = (e && e.message) || "";
    if (code === "network") return "Can't reach the server. Check your internet connection and try again.";
    if (status === 401 || code === "PGRST301" || code === "PGRST303") return "Your session has ended. Log in again.";
    if (code === "42501") return "You don't have permission to do that.";
    if (code === "P0001") return m;
    if (code === "23505") return "That's already saved.";
    return "Something went wrong (" + (m || code || "unknown error") + "). Try again.";
  }
  async function write(fn, okMsg) {
    if (!S.account) { toast("Log in first.", true); return false; }
    try { await fn(); if (okMsg) toast(okMsg); refresh(); return true; }
    catch (e) { console.warn(e); toast(errMsg(e), true); if (e.status === 401) forceLogout(); return false; }
  }

  /* ---------- Torino map data (OpenStreetMap, bundled with the app) ---------- */
  const MAPD = { ready: false, failed: false, OX: 7.55, OY: 44.99, Q: 1e5, names: [], nn: [], addr: [], center: [], grid: new Map(), F: null, waiters: [] };
  const CELL = 300;
  const TORINO = [45.0703, 7.6869];
  function toLL(x, y) { return { lat: MAPD.OY + y / MAPD.Q, lng: MAPD.OX + x / MAPD.Q }; }
  function mercX(lng) { return (lng + 180) / 360; }
  function mercY(lat) { const s = Math.sin(lat * Math.PI / 180); return 0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI); }
  function onMap(fn) { if (MAPD.ready || MAPD.failed) fn(); else MAPD.waiters.push(fn); }

  async function loadMapData() {
    try {
      const r = await fetch("torino-map.json");
      if (!r.ok) throw new Error("HTTP " + r.status);
      const d = await r.json();
      MAPD.OX = d.origin[0]; MAPD.OY = d.origin[1]; MAPD.Q = d.q;
      MAPD.names = d.names;
      MAPD.nn = d.names.map(function (n) { return norm(n); });
      d.addr.forEach(function (row) {
        const j = row[0], flat = row[1];
        const nums = [], xs = [], ys = [];
        let x = 0, y = 0;
        for (let t = 0; t < flat.length; t += 3) {
          x += flat[t + 1]; y += flat[t + 2];
          nums.push(String(flat[t])); xs.push(x); ys.push(y);
          const k = Math.floor(x / CELL) + ":" + Math.floor(y / CELL);
          let c = MAPD.grid.get(k); if (!c) { c = []; MAPD.grid.set(k, c); }
          c.push(j, xs.length - 1);
        }
        MAPD.addr[j] = { nums: nums, xs: xs, ys: ys };
      });
      let nv = 0;
      d.feats.forEach(function (f) { nv += f[2].length / 2; });
      const n = d.feats.length;
      const F = { n: n, T: new Uint8Array(n), N: new Int32Array(n), S0: new Uint32Array(n), C: new Uint32Array(n), B: new Float64Array(n * 4), MX: new Float64Array(nv), MY: new Float64Array(nv) };
      let v = 0;
      d.feats.forEach(function (f, i) {
        const fl = f[2], cnt = fl.length / 2, mid = Math.floor(cnt / 2);
        F.T[i] = f[0]; F.N[i] = f[1]; F.S0[i] = v; F.C[i] = cnt;
        let x = 0, y = 0, x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
        for (let k = 0; k < cnt; k++) {
          x += fl[2 * k]; y += fl[2 * k + 1];
          const ll = toLL(x, y), mx = mercX(ll.lng), my = mercY(ll.lat);
          F.MX[v] = mx; F.MY[v] = my; v++;
          if (mx < x0) x0 = mx; if (mx > x1) x1 = mx; if (my < y0) y0 = my; if (my > y1) y1 = my;
          if (k === mid && f[1] >= 0 && !MAPD.center[f[1]]) MAPD.center[f[1]] = ll;
        }
        F.B[i * 4] = x0; F.B[i * 4 + 1] = y0; F.B[i * 4 + 2] = x1; F.B[i * 4 + 3] = y1;
      });
      MAPD.F = F;
      MAPD.ready = true;
    } catch (e) {
      console.warn("map data", e);
      MAPD.failed = true;
    }
    const w = MAPD.waiters; MAPD.waiters = [];
    w.forEach(function (fn) { try { fn(); } catch (e) { console.warn(e); } });
  }

  /* ---------- Address search ---------- */
  function expandQ(s) {
    return norm(s)
      .replace(/\bv\.\s*le\b/g, "viale")
      .replace(/\bc\.?\s?so\b/g, "corso")
      .replace(/\bp\.?\s?zz?a\b/g, "piazza")
      .replace(/\bl\.?\s?go\b/g, "largo")
      .replace(/\bstr\.(?=\s|$)/g, "strada")
      .replace(/\bv\.\s*/g, "via ");
  }
  function numVal(s) { const m = /^(\d+)/.exec(String(s)); return m ? parseInt(m[1], 10) : NaN; }
  function findNum(A, num) {
    const want = String(num).toLowerCase().replace(/\s+/g, "");
    for (let k = 0; k < A.nums.length; k++) if (A.nums[k].toLowerCase().replace(/\s+/g, "") === want) return { k: k, exact: true };
    const n = numVal(num);
    if (isNaN(n)) return null;
    let best = -1, bd = Infinity;
    for (let k = 0; k < A.nums.length; k++) {
      const m = numVal(A.nums[k]); if (isNaN(m)) continue;
      const dd = Math.abs(m - n) + ((m % 2) !== (n % 2) ? 1000 : 0);
      if (dd < bd) { bd = dd; best = k; }
    }
    return best >= 0 ? { k: best, exact: false } : null;
  }
  function streetCenter(j) {
    const A = MAPD.addr[j];
    if (A && A.xs.length) { const k = Math.floor(A.xs.length / 2); return toLL(A.xs[k], A.ys[k]); }
    return MAPD.center[j] || null;
  }
  function matchPlaces(q) {
    const raw = String(q || "").trim();
    let words = expandQ(raw).replace(/[,;]/g, " ").split(/\s+/).filter(Boolean);
    let num = "";
    const ni = words.findIndex(function (w) { return /^\d+[a-z]?(\/[a-z0-9]+)?$/.test(w) || /^\d+bis$/.test(w); });
    if (ni >= 0) { num = words[ni]; words.splice(ni, 1); }
    words = words.filter(function (w) { return ["n", "n.", "nr", "torino", "to", "turin"].indexOf(w) === -1; });
    const mapRow = { label: "Choose on the map", sub: "Drop a pin on the exact spot", map: true };
    if (!words.length) return SPOTS.slice(0, 5).concat([mapRow]);
    const out = [];
    if (MAPD.ready) {
      const hits = [];
      for (let j = 0; j < MAPD.nn.length; j++) {
        const nn = MAPD.nn[j];
        if (!words.every(function (w) { return nn.indexOf(w) !== -1; })) continue;
        let sc = 0;
        words.forEach(function (w) { if (nn.indexOf(w) === 0 || nn.indexOf(" " + w) !== -1) sc += 2; });
        if (nn.indexOf(words.join(" ")) !== -1) sc += 3;
        if (MAPD.addr[j]) sc += 1;
        sc -= nn.length / 100;
        hits.push([sc, j]);
      }
      hits.sort(function (a, b) { return b[0] - a[0]; });
      hits.slice(0, num ? 4 : 5).forEach(function (h) {
        const j = h[1], A = MAPD.addr[j];
        if (num && A) {
          const r = findNum(A, num);
          if (r) {
            const ll = toLL(A.xs[r.k], A.ys[r.k]);
            out.push({ label: MAPD.names[j] + ", " + A.nums[r.k], sub: r.exact ? "Torino" : "Closest number to " + num + " · Torino", lat: ll.lat, lng: ll.lng, exact: true });
            return;
          }
        }
        const c = streetCenter(j);
        if (!c) return;
        out.push({ label: MAPD.names[j], sub: A ? "Add a house number for an exact pickup" : "Torino", lat: c.lat, lng: c.lng, street: true });
      });
    }
    const lm = SPOTS.filter(function (p) { const h = norm(p.label + " " + p.sub); return words.every(function (w) { return h.indexOf(w) !== -1; }); }).slice(0, 3);
    let list = num ? out.concat(lm) : lm.concat(out);
    if (MAPD.failed && raw.length >= 4) list.push({ label: raw.charAt(0).toUpperCase() + raw.slice(1), sub: "Use this address as typed", free: true });
    list = list.slice(0, 7);
    if (!MAPD.failed) list.push(mapRow);
    return list;
  }
  function reverseGeocode(lat, lng) {
    if (!MAPD.ready) return { label: "Pinned location", sub: lat.toFixed(5) + ", " + lng.toFixed(5), lat: lat, lng: lng };
    const x = (lng - MAPD.OX) * MAPD.Q, y = (lat - MAPD.OY) * MAPD.Q;
    const cx = Math.floor(x / CELL), cy = Math.floor(y / CELL);
    let best = null, bd = Infinity;
    for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) {
      const c = MAPD.grid.get((cx + i) + ":" + (cy + j)); if (!c) continue;
      for (let t = 0; t < c.length; t += 2) {
        const A = MAPD.addr[c[t]], k = c[t + 1];
        const dx = (A.xs[k] - x) * 0.707, dy = A.ys[k] - y, dd = dx * dx + dy * dy;
        if (dd < bd) { bd = dd; best = [c[t], k]; }
      }
    }
    const meters = Math.sqrt(bd) * 1.11;
    const spot = SPOTS.filter(function (p) { return haversineKm({ lat: lat, lng: lng }, p) < 0.07; })[0];
    const addrLabel = best ? MAPD.names[best[0]] + ", " + MAPD.addr[best[0]].nums[best[1]] : null;
    if (spot) return { label: spot.label, sub: addrLabel ? "Near " + addrLabel : spot.sub, lat: lat, lng: lng, pinned: true };
    if (best && meters <= 60) return { label: addrLabel, sub: "Torino", lat: lat, lng: lng, pinned: true };
    if (best && meters <= 400) return { label: "Near " + addrLabel, sub: "About " + Math.round(meters / 10) * 10 + " m away · pin placed exactly", lat: lat, lng: lng, pinned: true };
    return { label: "Pinned location", sub: "Outside the addresses we know · " + lat.toFixed(5) + ", " + lng.toFixed(5), lat: lat, lng: lng, pinned: true };
  }

  /* ---------- Map drawing (custom canvas layer on Leaflet) ---------- */
  const ROAD = {
    1: { min: 0, w: 9, cas: "#E7A1C0", fill: "#F7C6DA" },
    2: { min: 0, w: 7.5, cas: "#E9C3D3", fill: "#FFFFFF" },
    3: { min: 13.5, w: 5, cas: "#EBD5DF", fill: "#FFFFFF" },
    4: { min: 14.5, w: 4, cas: "#EAD8E0", fill: "#F8F0F4" },
    5: { min: 15.5, w: 3, cas: "#EEE0E7", fill: "#FFFFFF" }
  };
  const textW = new Map();
  function drawMap(ctx, z, w, h, offX, offY) {
    const F = MAPD.F; if (!F) return;
    const scale = 256 * Math.pow(2, z);
    const vx0 = offX / scale, vy0 = offY / scale, vx1 = (offX + w) / scale, vy1 = (offY + h) / scale;
    const byType = [[], [], [], [], [], [], [], [], []];
    for (let i = 0; i < F.n; i++) {
      const b = i * 4;
      if (F.B[b + 2] < vx0 || F.B[b] > vx1 || F.B[b + 3] < vy0 || F.B[b + 1] > vy1) continue;
      byType[F.T[i]].push(i);
    }
    function path(i, close) {
      const s = F.S0[i], c = F.C[i];
      ctx.moveTo(F.MX[s] * scale - offX, F.MY[s] * scale - offY);
      for (let k = 1; k < c; k++) ctx.lineTo(F.MX[s + k] * scale - offX, F.MY[s + k] * scale - offY);
      if (close) ctx.closePath();
    }
    ctx.lineJoin = "round"; ctx.lineCap = "round";
    // parks and water
    ctx.fillStyle = "#DCEFD5"; ctx.beginPath(); byType[7].forEach(function (i) { path(i, true); }); ctx.fill();
    ctx.fillStyle = "#C9DEF0"; ctx.beginPath(); byType[8].forEach(function (i) { path(i, true); }); ctx.fill();
    ctx.strokeStyle = "#C9DEF0"; ctx.lineWidth = Math.max(3, 14 * Math.pow(2, (z - 15) * 0.8)); ctx.beginPath(); byType[6].forEach(function (i) { path(i); }); ctx.stroke();
    const f = Math.max(0.35, Math.pow(2, (z - 16) * 0.65));
    const order = [5, 4, 3, 2, 1];
    // thin texture at low zoom
    if (z < 13.5) { ctx.strokeStyle = "#E8D2DC"; ctx.lineWidth = 0.6; ctx.beginPath(); byType[3].forEach(function (i) { path(i); }); ctx.stroke(); }
    order.forEach(function (t) {
      const R = ROAD[t]; if (z < R.min) return;
      ctx.strokeStyle = R.cas; ctx.lineWidth = R.w * f + 2; ctx.beginPath(); byType[t].forEach(function (i) { path(i); }); ctx.stroke();
    });
    order.forEach(function (t) {
      const R = ROAD[t]; if (z < R.min) return;
      ctx.strokeStyle = R.fill; ctx.lineWidth = R.w * f; ctx.beginPath(); byType[t].forEach(function (i) { path(i); }); ctx.stroke();
    });
    // street names
    const boxes = [];
    function free(x, y, hw, hh) {
      for (let i = 0; i < boxes.length; i++) { const b = boxes[i]; if (Math.abs(b[0] - x) < b[2] + hw && Math.abs(b[1] - y) < b[3] + hh) return false; }
      return true;
    }
    if (z >= 14.5) {
      ctx.font = "500 11px 'DM Sans', sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.lineWidth = 3.5; ctx.strokeStyle = "rgba(255,255,255,0.95)"; ctx.fillStyle = "#6E3B55";
      const done = new Set(); let count = 0;
      const types = z >= 16 ? [1, 2, 3] : z >= 15.5 ? [1, 2, 3] : [1, 2];
      types.forEach(function (t) {
        byType[t].forEach(function (i) {
          if (count > 140) return;
          const nIdx = F.N[i]; if (nIdx < 0 || done.has(nIdx)) return;
          const name = MAPD.names[nIdx];
          let tw = textW.get(name); if (tw == null) { tw = ctx.measureText(name).width; textW.set(name, tw); }
          const s = F.S0[i], c = F.C[i];
          let bestK = -1, bestL = 0;
          for (let k = 0; k < c - 1; k++) {
            const x1 = F.MX[s + k] * scale - offX, y1 = F.MY[s + k] * scale - offY, x2 = F.MX[s + k + 1] * scale - offX, y2 = F.MY[s + k + 1] * scale - offY;
            const L = Math.hypot(x2 - x1, y2 - y1);
            if (L > bestL) { bestL = L; bestK = k; }
          }
          if (bestK < 0 || bestL < tw + 16) return;
          const ax = F.MX[s + bestK] * scale - offX, ay = F.MY[s + bestK] * scale - offY, bx = F.MX[s + bestK + 1] * scale - offX, by = F.MY[s + bestK + 1] * scale - offY;
          const mx = (ax + bx) / 2, my = (ay + by) / 2;
          if (mx < 0 || my < 0 || mx > w || my > h) return;
          let ang = Math.atan2(by - ay, bx - ax);
          if (ang > Math.PI / 2) ang -= Math.PI; if (ang < -Math.PI / 2) ang += Math.PI;
          const hw = Math.abs(Math.cos(ang)) * tw / 2 + 6, hh = Math.abs(Math.sin(ang)) * tw / 2 + 8;
          if (!free(mx, my, hw, hh)) return;
          boxes.push([mx, my, hw, hh]); done.add(nIdx); count++;
          ctx.save(); ctx.translate(mx, my); ctx.rotate(ang); ctx.strokeText(name, 0, 0); ctx.fillText(name, 0, 0); ctx.restore();
        });
      });
    }
    // landmarks
    if (z >= 13.5) {
      ctx.font = "700 11px 'DM Sans', sans-serif"; ctx.textAlign = "left"; ctx.textBaseline = "middle";
      SPOTS.forEach(function (p) {
        const x = mercX(p.lng) * scale - offX, y = mercY(p.lat) * scale - offY;
        if (x < 0 || y < 0 || x > w || y > h) return;
        let tw = textW.get("§" + p.label); if (tw == null) { ctx.font = "700 11px 'DM Sans', sans-serif"; tw = ctx.measureText(p.label).width; textW.set("§" + p.label, tw); }
        if (!free(x + tw / 2 + 8, y, tw / 2 + 10, 9)) return;
        boxes.push([x + tw / 2 + 8, y, tw / 2 + 10, 9]);
        ctx.fillStyle = "#C42A6F"; ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill();
        ctx.lineWidth = 3.5; ctx.strokeStyle = "rgba(255,255,255,0.95)"; ctx.strokeText(p.label, x + 8, y);
        ctx.fillStyle = "#4A1491"; ctx.fillText(p.label, x + 8, y);
      });
    }
  }

  let StreetLayer = null;
  function streetLayerClass() {
    if (StreetLayer) return StreetLayer;
    StreetLayer = L.Layer.extend({
      onAdd: function (map) {
        this._map = map;
        this._c = document.createElement("canvas");
        this._c.className = "wsr-canvas";
        map.getPane("overlayPane").appendChild(this._c);
        map.on("moveend zoomend resize viewreset", this._redraw, this);
        map.on("zoomstart", this._hide, this);
        this._redraw();
      },
      onRemove: function (map) {
        this._c.remove();
        map.off("moveend zoomend resize viewreset", this._redraw, this);
        map.off("zoomstart", this._hide, this);
      },
      _hide: function () { this._c.style.visibility = "hidden"; },
      _redraw: function () {
        const map = this._map, size = map.getSize();
        if (!size.x || !size.y) return;
        const px = Math.round(size.x * 0.35), py = Math.round(size.y * 0.35);
        const w = size.x + 2 * px, h = size.y + 2 * py;
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        const c = this._c;
        c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
        c.style.width = w + "px"; c.style.height = h + "px";
        const tl = map.containerPointToLayerPoint([-px, -py]);
        L.DomUtil.setPosition(c, tl);
        const po = map.getPixelOrigin();
        const ctx = c.getContext("2d");
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);
        drawMap(ctx, map.getZoom(), w, h, po.x + tl.x, po.y + tl.y);
        c.style.visibility = "visible";
      }
    });
    return StreetLayer;
  }

  function newMap(el, interactive) {
    if (!window.L || !MAPD.ready) return null;
    const m = L.map(el, {
      zoomControl: !!interactive, attributionControl: true,
      dragging: !!interactive, touchZoom: !!interactive, scrollWheelZoom: !!interactive, doubleClickZoom: !!interactive, boxZoom: false, keyboard: !!interactive,
      zoomAnimation: false, fadeAnimation: false, markerZoomAnimation: false, inertia: true,
      zoomSnap: 0.25, minZoom: 10, maxZoom: 19,
      maxBounds: [[44.6, 7.0], [45.5, 8.4]], maxBoundsViscosity: 0.5
    });
    m.attributionControl.setPrefix(false);
    m.attributionControl.addAttribution('© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors');
    if (interactive) m.zoomControl.setPosition("bottomright");
    new (streetLayerClass())().addTo(m);
    m.setView(TORINO, 13);
    return m;
  }
  function pinIcon(letter) {
    return L.divIcon({ className: "mk-wrap", html: '<div class="mk mk-' + letter.toLowerCase() + '"><span>' + letter + "</span></div>", iconSize: [32, 40], iconAnchor: [16, 38] });
  }
  function showAB(m, store, a, b, pad) {
    if (!m) return;
    pad = pad || { tl: [30, 64], br: [30, 28] };
    (store.layers || []).forEach(function (l) { m.removeLayer(l); });
    store.layers = [];
    const pts = [];
    if (a && a.lat != null) { store.layers.push(L.marker([a.lat, a.lng], { icon: pinIcon("A"), keyboard: false, interactive: false }).addTo(m)); pts.push([a.lat, a.lng]); }
    if (b && b.lat != null) { store.layers.push(L.marker([b.lat, b.lng], { icon: pinIcon("B"), keyboard: false, interactive: false }).addTo(m)); pts.push([b.lat, b.lng]); }
    if (pts.length === 2) {
      store.layers.push(L.polyline(pts, { color: "#540CAA", weight: 4, dashArray: "2 9", lineCap: "round", interactive: false }).addTo(m));
      m.fitBounds(pts, { paddingTopLeft: pad.tl, paddingBottomRight: pad.br, maxZoom: 16, animate: false });
    } else {
      m.setView(pts.length ? pts[0] : TORINO, pts.length ? 16 : 13.5, { animate: false });
      const dx = (pad.tl[0] - pad.br[0]) / 2, dy = (pad.tl[1] - pad.br[1]) / 2;
      if (dx || dy) m.panBy([-dx, -dy], { animate: false });
    }
  }
  function gmapsDir(from, to) {
    return "https://www.google.com/maps/dir/?api=1" + (from ? "&origin=" + from.lat.toFixed(6) + "," + from.lng.toFixed(6) : "") + "&destination=" + to.lat.toFixed(6) + "," + to.lng.toFixed(6) + "&travelmode=driving";
  }

  const MAPS = { main: null, mainStore: {}, mainKey: null, picker: null };
  function sheetPad() {
    if (window.innerWidth >= 900) return { tl: [460, 90], br: [48, 48] };
    const h = $("#sheet").offsetHeight || 320;
    const H = $("#ride-screen").offsetHeight || window.innerHeight;
    const top = 76, bottom = Math.min(h + 24, Math.max(40, H - top - 110));
    return { tl: [36, top], br: [36, bottom] };
  }
  function updateMainMap(a, b, key) {
    if ($("#ride-screen").hidden || document.body.classList.contains("locked")) return;
    if (!MAPS.main) {
      if (MAPD.failed || !window.L) { $("#main-map-msg").textContent = "The map couldn't load. You can still search for addresses."; return; }
      if (!MAPD.ready) return;
      MAPS.main = newMap($("#main-map"), true);
      MAPS.main.removeControl(MAPS.main.zoomControl);
      MAPS.main.attributionControl.setPosition("topright");
      $("#main-map-msg").hidden = true;
    }
    MAPS.main.invalidateSize();
    const pad = sheetPad();
    const k = key + "|" + pad.br[1] + "|" + window.innerWidth;
    if (MAPS.mainKey === k) return;
    MAPS.mainKey = k;
    showAB(MAPS.main, MAPS.mainStore, a, b, pad);
  }

  /* ---------- Pin picker ---------- */
  const PICK = { field: null, result: null, raf: 0 };
  function updatePick() {
    PICK.raf = 0;
    const c = MAPS.picker.getCenter();
    PICK.result = reverseGeocode(c.lat, c.lng);
    $("#picker-addr").textContent = PICK.result.label;
    $("#picker-sub").textContent = PICK.result.sub;
  }
  function openPicker(field) {
    if (MAPD.failed || !window.L) { toast("The map couldn't load on this device. Search for the address instead.", true); return; }
    if (!MAPD.ready) { toast("The map is still loading. Try again in a moment."); return; }
    PICK.field = field;
    const isFrom = field === "from";
    $("#picker-title").textContent = isFrom ? "Move the map to your pickup" : "Move the map to your destination";
    $("#picker-kind").textContent = isFrom ? "Pickup" : "Destination";
    $("#picker-confirm").textContent = isFrom ? "Confirm pickup" : "Confirm destination";
    $("#picker").hidden = false;
    document.documentElement.style.overflow = "hidden";
    if (!MAPS.picker) {
      MAPS.picker = newMap($("#picker-map"), true);
      MAPS.picker.on("move", function () { if (!PICK.raf) PICK.raf = requestAnimationFrame(updatePick); });
      MAPS.picker.on("click", function (e) { MAPS.picker.panTo(e.latlng); });
    }
    MAPS.picker.invalidateSize();
    const cur = S.fields[field] && S.fields[field].sel;
    const other = S.fields[isFrom ? "to" : "from"] && S.fields[isFrom ? "to" : "from"].sel;
    const start = cur && cur.lat != null ? [cur.lat, cur.lng] : other && other.lat != null ? [other.lat, other.lng] : TORINO;
    MAPS.picker.setView(start, cur || other ? 17 : 15);
    updatePick();
  }
  function closePicker() {
    $("#picker").hidden = true;
    document.documentElement.style.overflow = "";
  }
  function confirmPick() {
    if (!PICK.result || !PICK.field) return;
    const f = PICK.field;
    S.fields[f].sel = PICK.result;
    $("#" + f).value = PICK.result.label;
    closePicker();
    afterPick(f);
  }
  function openSearch(field) {
    const f = field || (S.fields.from.sel ? "to" : "from");
    $("#search").hidden = false;
    document.documentElement.style.overflow = "hidden";
    setTimeout(function () { const el = $("#" + f); el.focus(); try { el.select(); } catch (e) {} }, 40);
  }
  function closeSearch() {
    $("#search").hidden = true;
    document.documentElement.style.overflow = "";
    $$(".ac-list").forEach(function (l) { l.hidden = true; });
  }
  function afterPick(field) {
    updateEstimate();
    const a = S.fields.from.sel, b = S.fields.to.sel;
    if (a && b) { closeSearch(); S.rideView = "choose"; renderRide(); return; }
    const other = field === "from" ? "to" : "from";
    if ($("#search").hidden) openSearch(other); else $("#" + other).focus();
    renderRide();
  }

  function setupAC(key) {
    const input = $("#" + key), list = $("#" + key + "-list");
    const st = S.fields[key] = { sel: null, items: [], hi: -1 };
    function draw() {
      st.items = matchPlaces(input.value);
      if (key === "from" && !input.value.trim()) st.items = [{ label: "Use my current location", sub: "Set pickup with your phone's GPS", gps: true }].concat(st.items);
      st.hi = -1;
      $$(".ac-list").forEach(function (l) { if (l !== list) l.hidden = true; });
      list.innerHTML = st.items.map(function (p, i) {
        return '<li role="option" class="opt' + (p.free ? " free" : "") + (p.map || p.gps ? " maprow" : "") + '" id="' + key + "-opt-" + i + '" data-i="' + i + '" aria-selected="false">' + PIN_ICON +
          "<span><b>" + esc(p.label) + "</b><small>" + esc(p.sub) + "</small></span></li>";
      }).join("");
      list.hidden = !st.items.length;
      input.setAttribute("aria-expanded", st.items.length ? "true" : "false");
    }
    function mark() {
      $$(".opt", list).forEach(function (li, i) { li.setAttribute("aria-selected", i === st.hi ? "true" : "false"); });
      if (st.hi >= 0) { input.setAttribute("aria-activedescendant", key + "-opt-" + st.hi); const el = $("#" + key + "-opt-" + st.hi); if (el) el.scrollIntoView({ block: "nearest" }); }
    }
    function pick(i) {
      const p = st.items[i];
      if (!p) return;
      if (p.map) { input.blur(); openPicker(key); return; }
      if (p.gps) { input.blur(); locate(key); return; }
      st.sel = p;
      input.value = p.label;
      afterPick(key);
    }
    input.addEventListener("input", function () { st.sel = null; draw(); updateEstimate(); });
    input.addEventListener("focus", draw);
    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); st.hi = Math.min(st.items.length - 1, st.hi + 1); mark(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); st.hi = Math.max(0, st.hi - 1); mark(); }
      else if (e.key === "Enter") { e.preventDefault(); pick(st.hi >= 0 ? st.hi : 0); }
      else if (e.key === "Escape") { e.preventDefault(); closeSearch(); renderRide(); }
    });
    list.addEventListener("mousedown", function (e) { if (e.target.closest(".opt")) e.preventDefault(); });
    list.addEventListener("click", function (e) { const li = e.target.closest(".opt"); if (li) pick(+li.dataset.i); });
  }

  function haversineKm(a, b) {
    const R = 6371, toR = Math.PI / 180;
    const dLat = (b.lat - a.lat) * toR, dLng = (b.lng - a.lng) * toR;
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * toR) * Math.cos(b.lat * toR) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  }

  function updateEstimate() {
    const a = S.fields.from && S.fields.from.sel, b = S.fields.to && S.fields.to.sel;
    S.est = null; S.samePlace = false;
    if (!a || !b) return;
    if (a.lat != null && b.lat != null ? haversineKm(a, b) < 0.05 : norm(a.label) === norm(b.label)) { S.samePlace = true; return; }
    if (a.lat != null && b.lat != null) {
      const km = haversineKm(a, b) * 1.3;
      const min = Math.max(4, Math.round((km / 22) * 60));
      const fare = Math.max(7, 3.5 + 1.3 * km + 0.3 * min);
      S.est = { lo: Math.round(fare * 0.9), hi: Math.round(fare * 1.15), km: Math.round(km * 10) / 10, min: min };
    }
  }

  /* ---------- Drafts (keep typed values across live updates) ---------- */
  document.addEventListener("input", function (e) { const k = e.target.getAttribute && e.target.getAttribute("data-draft"); if (k) S.drafts[k] = e.target.value; });
  document.addEventListener("change", function (e) { const k = e.target.getAttribute && e.target.getAttribute("data-draft"); if (k) S.drafts[k] = e.target.value; });
  function restoreDrafts(el) { $$("[data-draft]", el).forEach(function (f) { const k = f.getAttribute("data-draft"); if (S.drafts[k] != null) f.value = S.drafts[k]; }); }
  function paint(el, html) {
    const ae = document.activeElement;
    if (ae && el.contains(ae) && ae.matches("input, select, textarea")) { el.dataset.stale = "1"; return; }
    el.innerHTML = html;
    el.dataset.stale = "";
    restoreDrafts(el);
  }
  document.addEventListener("focusout", function (e) {
    const box = e.target.closest && e.target.closest("[data-stale='1']");
    if (!box) return;
    if (e.relatedTarget && box.contains(e.relatedTarget)) return;
    setTimeout(renderAll, 400);
  });

  /* ---------- Navigation ---------- */
  const PAGES = { drive: "Drive with us", team: "Pilot dashboard", socials: "Socials", account: "Your account" };
  function go(t) {
    closeDrawer();
    if (isLocked() || (t === "team" && !isTeam())) t = "ride";
    S.tab = t;
    lsSet("wsr.tab", t);
    const ride = t === "ride";
    $("#ride-screen").hidden = !ride;
    $("#page").hidden = ride;
    ["drive", "team", "socials", "account"].forEach(function (k) { $("#tab-" + k).hidden = k !== t; });
    if (!ride) $("#page-title").textContent = PAGES[t];
    $$(".dr-item").forEach(function (b) { if (b.dataset.to === t) b.setAttribute("aria-current", "page"); else b.removeAttribute("aria-current"); });
    window.scrollTo(0, 0);
    if (ride) MAPS.mainKey = null;
    renderAll();
  }
  function openDrawer() { if (isLocked()) return; $("#drawer").hidden = false; const f = $(".dr-item[aria-current]") || $(".dr-item"); if (f) f.focus(); }
  function closeDrawer() { $("#drawer").hidden = true; }

  /* ---------- RIDE ---------- */
  function currentRide() {
    if (S.pendingRide) {
      if (S.rides.some(function (x) { return x.id === S.pendingRide.id; })) S.pendingRide = null;
      else return S.pendingRide;
    }
    if (!S.account) return null;
    return S.rides.find(function (r) {
      return r.accountId === S.account.id && !r.passengerDismissed && !S.dismissed.has(r.id) && !(r.status === "completed" && r.feedback);
    }) || null;
  }
  function driverOf(r) { return r && r.driverId ? S.drivers.find(function (d) { return d.id === r.driverId; }) : null; }

  function shareText(r) {
    const d = driverOf(r);
    return "I'm on a Wubber ride: " + r.pickup + " → " + r.dropoff + ". " +
      (d ? "Driver: " + d.name + (d.car ? ", " + d.car : "") + (d.plate ? ", plate " + d.plate : "") + ". " : "Driver not assigned yet. ") +
      "Ride PIN " + r.pin + ". Booked at " + hhmm(r.createdAt) + ".";
  }

  const CAR_SVG = '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 16.5h16v-3.2c0-.8-.5-1.5-1.2-1.8l-1.6-.6-1.8-3.4A2 2 0 0013.6 6.5h-3.2a2 2 0 00-1.8 1L6.8 10.9l-1.6.6C4.5 11.8 4 12.5 4 13.3v3.2z"/><circle cx="7.5" cy="16.5" r="1.7"/><circle cx="16.5" cy="16.5" r="1.7"/><path d="M7 11h10"/></svg>';
  const PERSON_SVG = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>';
  const CASH_SVG = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/></svg>';
  const CHEV = '<svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';
  const SHARE_SVG = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>';
  const PHONE_SVG = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.5c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z"/></svg>';
  const SHIELD_SVG = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l7 3v6c0 4.4-3 7.8-7 9-4-1.2-7-4.6-7-9V6l7-3z"/><path d="M12 8v4M12 15.5h.01"/></svg>';
  const HOME_SPOTS = ["ESCP Business School, Turin campus", "Stazione Porta Nuova", "Politecnico di Torino", "Murazzi del Po"];

  function greeting() { const h = new Date().getHours(); return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening"; }
  function showView(v) { ["home", "choose", "auth", "live", "feedback"].forEach(function (k) { $("#sv-" + k).hidden = k !== v; }); }
  /* ---------- Accounts (Supabase Auth) ---------- */
  function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v || "").trim()); }
  function phoneOk(v) { const d = String(v || "").replace(/\D/g, ""); return d.length >= 8 && d.length <= 15; }
  function isLocked() { return !S.account; }
  function isTeam() { return !!(S.account && S.account.role === "team"); }
  function signupMissing() {
    const miss = [];
    if (!$("#su-name").value.trim()) miss.push("first name");
    if (!isEmail($("#su-email").value)) miss.push("a valid email");
    if (!phoneOk($("#su-phone").value)) miss.push("a phone number");
    const pw = $("#su-pass").value, pw2 = $("#su-pass2").value;
    if (pw.length < 8) miss.push("a password of at least 8 characters");
    else if (pw !== pw2) miss.push("the same password twice");
    if (!$("#su-terms").checked) miss.push("agreement to join the pilot");
    return miss;
  }
  function checkSignup() {
    const miss = signupMissing();
    $("#su-submit").disabled = miss.length > 0;
    $("#su-status").innerHTML = miss.length ? '<span class="req">*</span> Required. Still needed: ' + esc(miss.join(", ")) + "." : "All set. You can create your account.";
  }
  function setAuthMode(m) {
    S.authMode = m;
    $("#login-form").hidden = m !== "login";
    $("#signup-form").hidden = m !== "signup";
    $("#forgot-form").hidden = m !== "forgot";
    $("#reset-form").hidden = m !== "reset";
    $("#auth-seg").hidden = m === "forgot" || m === "reset";
    $("#tab-login").setAttribute("aria-selected", m === "login" ? "true" : "false");
    $("#tab-signup").setAttribute("aria-selected", m === "signup" ? "true" : "false");
    $("#auth-title").textContent = m === "forgot" ? "Reset your password" : m === "reset" ? "Choose a new password" : "Welcome to Wubber";
    $("#auth-sub").textContent = m === "forgot" ? "Enter your email and we'll send you a link to choose a new password." :
      m === "reset" ? "Pick a new password for your account." : "Log in or create an account to book a ride with a verified female driver.";
    if (m === "signup") checkSignup();
  }
  function authMsg(e) {
    const m = String((e && e.message) || "").toLowerCase(), code = e && e.code;
    if (code === "network") return "Can't reach the server. Check your internet connection and try again.";
    if (code === "invalid_credentials" || m.indexOf("invalid login") !== -1) return "Wrong email or password.";
    if (code === "email_not_confirmed" || m.indexOf("not confirmed") !== -1) return "Confirm your email first: open the link we sent you, then log in.";
    if (code === "user_already_exists" || m.indexOf("already registered") !== -1) return "An account with this email already exists. Log in instead.";
    if (code === "weak_password" || (m.indexOf("password") !== -1 && m.indexOf("character") !== -1)) return "Choose a stronger password (at least 8 characters).";
    if (code === "over_email_send_rate_limit" || code === "over_request_rate_limit" || (e && e.status === 429)) return "Too many tries. Wait a minute and try again.";
    if (code === "email_address_invalid") return "That email address isn't valid.";
    if (code === "signup_disabled") return "New sign-ups are switched off in the database settings.";
    return "Something went wrong (" + ((e && e.message) || code || "unknown error") + ").";
  }
  function busy(btn, on, label) { btn.disabled = on; if (label) btn.textContent = label; }

  async function loadMe() {
    const uid = SESSION && SESSION.user && SESSION.user.id;
    if (!uid) { S.account = null; return false; }
    const rows = await db.select("profiles", "select=*&id=eq." + encodeURIComponent(uid));
    const p = rows && rows[0];
    if (!p) { S.account = null; return false; }
    S.account = { id: p.id, name: p.name, phone: p.phone, email: p.email, trustedName: p.trusted_name, trustedPhone: p.trusted_phone, role: p.role, createdAt: p.created_at };
    return true;
  }
  async function afterAuth(welcome) {
    try {
      const ok = await loadMe();
      if (!ok) throw apiError("Your account has no profile. Make sure the database setup script ran, then create the account again.", "noprofile", 0);
    } catch (e) {
      console.warn(e);
      toast(e.code === "noprofile" ? e.message : errMsg(e), true);
      saveSession(null); S.account = null; S.authChecking = false; renderAll();
      return;
    }
    S.authChecking = false;
    if (welcome) toast(welcome);
    S.rideView = "home"; MAPS.mainKey = null;
    go("ride");
    startPolling();
  }
  async function login(e) {
    e.preventDefault();
    if (!apiConfigured()) { toast("This site isn't connected to its database yet. Fill in config.js.", true); return; }
    const email = $("#li-email").value.trim(), pw = $("#li-pass").value;
    if (!isEmail(email)) { toast("Enter your email address.", true); return; }
    if (!pw) { toast("Enter your password.", true); return; }
    const btn = $("#li-submit"); busy(btn, true, "Logging in…");
    try {
      const j = await authFetch("token?grant_type=password", { email: email, password: pw });
      saveSession(toSession(j));
      $("#login-form").reset();
      await afterAuth("Welcome back!");
    } catch (err) { console.warn(err); toast(authMsg(err), true); }
    finally { busy(btn, false, "Log in"); }
  }
  async function signup(e) {
    e.preventDefault();
    if (!apiConfigured()) { toast("This site isn't connected to its database yet. Fill in config.js.", true); return; }
    if (signupMissing().length) { checkSignup(); return; }
    const name = $("#su-name").value.trim(), email = $("#su-email").value.trim(), phone = $("#su-phone").value.trim(), pw = $("#su-pass").value;
    const tn = $("#su-tname").value.trim(), tp = $("#su-tphone").value.trim();
    const btn = $("#su-submit"); busy(btn, true, "Creating your account…");
    try {
      const j = await authFetch("signup", { email: email, password: pw, data: { name: name, phone: phone, trusted_name: tn, trusted_phone: tp } });
      $("#signup-form").reset();
      if (j.access_token) {
        saveSession(toSession(j));
        await afterAuth("Account created. Welcome, " + first(name) + "!");
      } else {
        setAuthMode("login");
        $("#li-email").value = email;
        toast("Account created. Open the confirmation link we emailed you, then log in.", false, 9000);
      }
    } catch (err) {
      console.warn(err);
      const m = authMsg(err);
      toast(m, true);
      $("#su-status").textContent = m;
    } finally {
      btn.textContent = "Create account";
      if (S.authMode === "signup") checkSignup();
    }
  }
  async function forgot(e) {
    e.preventDefault();
    const email = $("#fp-email").value.trim();
    if (!isEmail(email)) { toast("Enter your email address.", true); return; }
    const btn = $("#fp-submit"); busy(btn, true, "Sending…");
    try {
      await authFetch("recover", { email: email });
      toast("If an account exists for that email, we've sent a link to reset your password.", false, 8000);
      setAuthMode("login");
    } catch (err) { toast(authMsg(err), true); }
    finally { busy(btn, false, "Send reset link"); }
  }
  async function resetPassword(e) {
    e.preventDefault();
    const pw = $("#rp-pass").value, pw2 = $("#rp-pass2").value;
    if (pw.length < 8) { toast("Choose a password of at least 8 characters.", true); return; }
    if (pw !== pw2) { toast("The two passwords don't match.", true); return; }
    const btn = $("#rp-submit"); busy(btn, true, "Saving…");
    try {
      await authFetch("user", { password: pw }, "PUT", await accessToken());
      $("#reset-form").reset();
      S.recovery = false;
      setAuthMode("login");
      await afterAuth("New password saved.");
    } catch (err) { toast(authMsg(err), true); }
    finally { busy(btn, false, "Save new password"); }
  }
  // Links from emails (confirm account, reset password) land here with the session in the address.
  async function handleAuthRedirect() {
    const h = location.hash || "";
    if (h.indexOf("access_token=") === -1 && h.indexOf("error") === -1) return false;
    const p = new URLSearchParams(h.slice(1));
    history.replaceState(null, "", location.pathname + location.search);
    if (p.get("error")) { toast("That link didn't work: " + (p.get("error_description") || p.get("error")).replace(/\+/g, " ") + ". Request a new one.", true, 9000); return false; }
    const s = { access_token: p.get("access_token"), refresh_token: p.get("refresh_token"), expires_at: Math.floor(Date.now() / 1000) + Number(p.get("expires_in") || 3600), user: null };
    try { s.user = await authFetch("user", null, "GET", s.access_token); }
    catch (e) { toast("That link has expired. Request a new one.", true); return false; }
    saveSession(s);
    if (p.get("type") === "recovery") { S.recovery = true; S.authChecking = false; setAuthMode("reset"); renderAll(); return true; }
    await afterAuth("Your email is confirmed. Welcome!");
    return true;
  }
  function forceLogout() {
    stopPolling();
    saveSession(null);
    S.account = null; S.pendingRide = null; S.pendingDriver = null; S.rides = []; S.drivers = []; S.waitlist = []; S.pins = {};
    S.loaded.rides = S.loaded.drivers = S.loaded.waitlist = false;
    if (S.fields.from) { S.fields.from.sel = null; S.fields.to.sel = null; $("#from").value = ""; $("#to").value = ""; }
    S.rideView = "home";
    setAuthMode("login");
    go("ride");
  }
  async function logout() {
    const tok = SESSION && SESSION.access_token;
    if (tok) authFetch("logout", {}, "POST", tok).catch(function () {});
    forceLogout();
    toast("Logged out");
  }
  async function saveProfile(e) {
    e.preventDefault();
    if (!S.account) return;
    const patch = { name: $("#ac-name").value.trim(), phone: $("#ac-phone").value.trim(), trusted_name: $("#ac-tname").value.trim(), trusted_phone: $("#ac-tphone").value.trim() };
    if (!patch.name) { toast("Your first name can't be empty.", true); return; }
    if (!phoneOk(patch.phone)) { toast("Add a phone number your driver can call.", true); return; }
    const ok = await write(function () { return db.update("profiles", "id=eq." + S.account.id, patch); }, "Account details saved");
    if (ok) {
      S.account = Object.assign({}, S.account, { name: patch.name, phone: patch.phone, trustedName: patch.trusted_name, trustedPhone: patch.trusted_phone });
      ["ac-name", "ac-phone", "ac-tname", "ac-tphone"].forEach(function (k) { delete S.drafts[k]; });
      renderAccount();
    }
  }
  function renderAccount() {
    const box = $("#acct-body");
    const a = S.account;
    if (!a) { paint(box, '<div class="empty">You\'re not logged in.</div>'); return; }
    const done = S.rides.filter(function (r) { return r.accountId === a.id && r.status === "completed"; }).length;
    const since = a.createdAt ? new Date(a.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "";
    const f = function (id, label, val, type) {
      return '<div class="stack"><label class="lbl" for="' + id + '">' + label + '</label><input type="' + (type || "text") + '" id="' + id + '" data-draft="' + id + '" value="' + esc(val || "") + '"></div>';
    };
    paint(box,
      '<div class="card"><div class="driver"><div class="avatar" aria-hidden="true">' + esc(initials(a.name)) + '</div><div class="stack" style="gap:2px;min-width:0"><b style="font-size:20px">' + esc(a.name) + '</b><span class="muted">' + esc(a.email) + "</span>" +
      '<span class="fine">' + done + " completed ride" + (done === 1 ? "" : "s") + (since ? " · member since " + esc(since) : "") + (isTeam() ? " · pilot team" : "") + "</span></div></div></div>" +
      '<form id="profile-form" class="card" novalidate><h3>Your details</h3><div class="grid2">' + f("ac-name", "First name", a.name) + f("ac-phone", "Phone", a.phone, "tel") + "</div>" +
      '<h3>Trusted contact</h3><p class="fine">The person you send your trip details to during a ride.</p><div class="grid2">' + f("ac-tname", "Name", a.trustedName) + f("ac-tphone", "Phone", a.trustedPhone, "tel") + "</div>" +
      '<button type="submit" class="btn btn-primary btn-block">Save</button></form>' +
      '<button type="button" class="btn btn-ghost btn-block" data-act="logout">Log out</button>');
  }
  function renderHome() {
    const name = S.account && S.account.name;
    $("#greet").textContent = greeting() + (name ? ", " + first(name) : "");
    const a = S.fields.from.sel;
    $("#home-pickup").textContent = a ? a.label : "Set your pickup point";
    const box = $("#home-suggest");
    if (!box.dataset.done) {
      box.innerHTML = HOME_SPOTS.map(function (n) {
        const p = SPOTS.find(function (s) { return s.label === n; });
        if (!p) return "";
        return '<button type="button" class="row-btn" data-act="quick-dest" data-name="' + esc(p.label) + '"><span class="ico">' + PIN_ICON + '</span><span class="rb-text"><b>' + esc(p.label) + "</b><small>" + esc(p.sub) + "</small></span></button>";
      }).join("");
      box.dataset.done = "1";
    }
  }

  function renderChoose() {
    const a = S.fields.from.sel, b = S.fields.to.sel;
    if (!a || !b) return;
    const tn = S.account && S.account.trustedName, tp = S.account && S.account.trustedPhone;
    let h = '<div class="trip-rows">' +
      '<span class="ico-col"><i class="r-dot"></i></span><button type="button" class="trip-row" data-act="search-from"><small>Pickup</small><b>' + esc(a.label) + "</b></button>" +
      '<span class="ico-col"><i class="r-line"></i></span><span></span>' +
      '<span class="ico-col"><i class="r-sq"></i></span><button type="button" class="trip-row" data-act="search-to"><small>Destination</small><b>' + esc(b.label) + "</b></button></div>";
    if (S.samePlace) h += '<div class="alert">Pickup and destination are the same place. Change one of them.</div>';
    h += '<div class="ride-opt"><div class="car">' + CAR_SVG + '</div><div class="om"><b>Wubber</b><small>Verified female driver</small><small>' +
      (S.est ? "~" + S.est.min + " min ride · " + S.est.km + " km" : "Distance checked by the team") + '</small></div><div class="op"><b>' +
      (S.est ? "€" + S.est.lo + "–" + S.est.hi : "Set by team") + "</b><small>" + (S.est ? "estimate" : "") + "</small></div></div>";
    h += '<button type="button" class="row-btn" data-act="go" data-to="account"><span class="ico">' + PERSON_SVG + '</span><span class="rb-text"><b>' +
      (tn ? "Share trip with " + esc(tn) : "Add a trusted contact") + "</b><small>" + (tn ? esc(tp || "You'll send her your trip details") : "Optional: someone to send your trip details to") + "</small></span>" + CHEV + "</button>";
    h += '<div class="row-static"><span class="ico">' + CASH_SVG + '</span><span class="rb-text"><b>Pay your driver directly</b><small>The team confirms your price before pickup</small></span></div>';
    $("#choose-body").innerHTML = h;
    $("#req-btn").disabled = !!S.samePlace;
  }

  function liveHtml(r) {
    const d = driverOf(r);
    if (r.status === "cancelled") {
      return '<div class="stack"><h2 class="greet">Ride cancelled</h2><p class="muted">' +
        (r.cancelledBy === "team" ? "The pilot team couldn't find a driver for this ride. We're sorry; please try again later or book another way home." : "You cancelled this ride.") +
        '</p></div><button type="button" class="btn btn-primary btn-big btn-block" data-act="new-ride">Book a new ride</button>';
    }
    const steps = ["requested", "assigned", "on_trip", "completed"];
    const idx = steps.indexOf(r.status);
    const names = ["Requested", "Driver assigned", "On the way", "Arrived"];
    let title, sub;
    if (r.status === "requested") { title = "Finding your driver"; sub = "Our team is matching you with a verified female driver."; }
    else if (r.status === "assigned") { title = esc(first(d && d.name)) + " is on her way"; sub = (r.etaMin ? "Pickup in about " + esc(r.etaMin) + " min · " : "") + esc(r.pickup); }
    else { title = "Heading to " + esc(r.dropoff); sub = "Enjoy your ride. Your trip is shared with the pilot team."; }
    let html = '<div class="live-head"><div class="stack" style="gap:4px;min-width:0"><h2>' + title + '</h2><p class="muted">' + sub + "</p></div>";
    if (r.status !== "on_trip") {
      html += '<div class="stack" style="gap:4px;align-items:flex-end;flex:none"><span class="lbl">Ride PIN</span><div class="pin sm" aria-label="PIN ' + esc(r.pin.split("").join(" ")) + '">' +
        r.pin.split("").map(function (c) { return "<span>" + esc(c) + "</span>"; }).join("") + "</div></div>";
    }
    html += "</div>";
    html += '<div class="steps" aria-label="Ride progress">' + names.map(function (n, i) { return '<div class="step' + (i <= idx ? " done" : "") + '"><i></i>' + n + "</div>"; }).join("") + "</div>";
    if (r.status !== "on_trip") html += '<p class="fine">Tell your driver your PIN. She can only start the trip with it.</p>';
    if (r.sos && !r.sosResolved) html += '<div class="alert">Pilot team alerted at ' + esc(hhmm(r.sosAt)) + ". Call 112 if you are in danger.</div>";
    if (d) {
      html += '<div class="card"><div class="driver"><div class="avatar" aria-hidden="true">' + esc(initials(d.name)) + '</div><div class="stack" style="gap:4px;min-width:0"><b style="font-size:18px">' + esc(d.name) + '</b><div class="badges"><span class="badge">' + CHECK + "Identity checked</span>" +
        (d.ncc === "yes" ? '<span class="badge">' + CHECK + "NCC licence</span>" : "") + "</div></div></div>" +
        '<div class="kv"><div><span class="lbl">Car</span><b>' + esc(d.car || "Ask your driver") + '</b></div><div><span class="lbl">Plate</span><b>' + esc(d.plate || "—") + "</b></div>" +
        '<div><span class="lbl">Price</span><b>' + (r.fare ? "€" + esc(r.fare) + " agreed" : (r.fareEst ? "€" + r.fareEst.lo + "–" + r.fareEst.hi + " estimate" : "Set by the team")) + "</b></div>" +
        '<div><span class="lbl">Driver phone</span><b>' + esc(d.phone || "—") + "</b></div></div>" +
        '<p class="fine">Check the plate before you get in.</p></div>';
    } else {
      html += '<div class="trip-rows"><span class="ico-col"><i class="r-dot"></i></span><div class="trip-row" style="cursor:default"><small>Pickup</small><b>' + esc(r.pickup) + "</b></div>" +
        '<span class="ico-col"><i class="r-line"></i></span><span></span><span class="ico-col"><i class="r-sq"></i></span><div class="trip-row" style="cursor:default"><small>Destination</small><b>' + esc(r.dropoff) + "</b></div></div>" +
        '<p class="fine">' + (r.fareEst ? "Estimated fare €" + r.fareEst.lo + "–" + r.fareEst.hi + ". " : "") + "Keep this screen open; it updates on its own.</p>";
    }
    html += '<div class="actions">' +
      '<button type="button" class="act" data-act="copy-share">' + SHARE_SVG + "Share trip</button>" +
      (d && d.phone ? '<a class="act" href="tel:' + esc(String(d.phone).replace(/[^\d+]/g, "")) + '">' + PHONE_SVG + "Call " + esc(first(d.name)) + "</a>" : '<button type="button" class="act" disabled style="opacity:.5">' + PHONE_SVG + "Call driver</button>") +
      '<button type="button" class="act red" data-act="open-sos">' + SHIELD_SVG + "Safety</button></div>";
    html += '<textarea class="copybox" id="share-box" readonly hidden aria-label="Trip details">' + esc(shareText(r)) + "</textarea>";
    if (r.status === "requested" || r.status === "assigned") html += '<button type="button" class="linkbtn" data-act="cancel-ride">Cancel ride</button>';
    return html;
  }

  function renderRide() {
    if ($("#ride-screen").hidden) return;
    if (isLocked()) {
      document.body.classList.add("locked");
      $("#fab-sos").hidden = true;
      showView("auth");
      $("#auth-loading").hidden = !S.authChecking;
      $("#auth-forms").hidden = !!S.authChecking;
      requestAnimationFrame(function () { updateMainMap(null, null, "auth"); });
      return;
    }
    const r = currentRide();
    $("#fab-sos").hidden = !(r && (r.status === "requested" || r.status === "assigned" || r.status === "on_trip"));
    if (r && r.status === "completed") {
      showView("feedback");
      if (S.fbFor !== r.id) { $("#fb-form").reset(); S.fbFor = r.id; }
      $("#fb-sub").textContent = "You made it to " + r.dropoff + ". Two minutes of feedback helps us decide whether to launch.";
      requestAnimationFrame(function () { updateMainMap(r.pickupPos, r.dropoffPos, "done:" + r.id); });
      return;
    }
    if (r) {
      showView("live");
      paint($("#sv-live"), liveHtml(r));
      const off = r.status === "cancelled";
      requestAnimationFrame(function () { updateMainMap(off ? null : r.pickupPos, off ? null : r.dropoffPos, "live:" + r.id + ":" + r.status); });
      return;
    }
    const a = S.fields.from.sel, b = S.fields.to.sel;
    let v = S.rideView || "home";
    if (v === "choose" && !(a && b)) v = "home";
    S.rideView = v;
    showView(v);
    if (v === "home") renderHome();
    if (v === "choose") renderChoose();
    const showB = v !== "home" && b;
    requestAnimationFrame(function () {
      updateMainMap(a, showB ? b : null, v + ":" + (a ? a.lat + "," + a.lng : "") + ":" + (showB ? b.lat + "," + b.lng : ""));
    });
  }

  async function requestRide() {
    const a = S.fields.from.sel, b = S.fields.to.sel;
    if (!a || !b) { S.rideView = "home"; renderRide(); return; }
    if (S.samePlace) return;
    if (!S.account) { toast("Log in to book a ride.", true); return; }
    const acc = S.account;
    const id = uuid();
    const row = {
      id: id,
      passenger_name: acc.name, passenger_phone: acc.phone || "",
      pickup: a.label, pickup_lat: a.lat != null ? a.lat : null, pickup_lng: a.lng != null ? a.lng : null,
      dropoff: b.label, dropoff_lat: b.lat != null ? b.lat : null, dropoff_lng: b.lng != null ? b.lng : null,
      trusted_name: acc.trustedName || "", trusted_phone: acc.trustedPhone || "",
      fare_lo: S.est ? S.est.lo : null, fare_hi: S.est ? S.est.hi : null, km: S.est ? S.est.km : null
    };
    $("#req-btn").disabled = true;
    S.pendingRide = rowToRide(Object.assign({ created_at: nowISO(), rider_id: acc.id, status: "requested" }, row));
    renderRide();
    const ok = await write(function () { return db.insert("rides", row); }, "Ride requested");
    $("#req-btn").disabled = false;
    if (!ok) { S.pendingRide = null; renderRide(); }
    else {
      S.fields.from.sel = null; S.fields.to.sel = null; $("#from").value = ""; $("#to").value = "";
      S.est = null; S.rideView = "home";
    }
  }

  async function sendFeedback(e) {
    e.preventDefault();
    const r = currentRide();
    if (!r) return;
    const f = $("#fb-form");
    const val = function (n) { const el = f.querySelector('input[name="' + n + '"]:checked'); return el ? el.value : null; };
    const fb = { rating: val("rating") ? Number(val("rating")) : null, safety: val("safety"), freq: val("freq"), price: val("price"), comment: $("#fb-comment").value.trim(), at: nowISO() };
    if (!fb.rating && !fb.safety && !fb.freq && !fb.price && !fb.comment) { toast("Pick at least one answer, or skip feedback.", true); return; }
    const ok = await write(function () { return db.rpc("rider_action", { p_ride: r.id, p_action: "feedback", p_feedback: fb }); }, "Thank you! Feedback sent.");
    if (ok) { S.dismissed.add(r.id); renderRide(); window.scrollTo(0, 0); }
  }

  /* ---------- Rows from the database → objects the screens use ---------- */
  const RIDE_COLS = "id,created_at,rider_id,passenger_name,passenger_phone,pickup,pickup_lat,pickup_lng,dropoff,dropoff_lat,dropoff_lng," +
    "trusted_name,trusted_phone,fare_lo,fare_hi,km,status,driver_id,fare,eta_min,assigned_at,started_at,completed_at,cancelled_at,cancelled_by," +
    "sos,sos_at,sos_resolved,sos_resolved_at,passenger_dismissed,feedback";
  function rowToRide(x) {
    return {
      id: x.id, createdAt: x.created_at, accountId: x.rider_id,
      passengerName: x.passenger_name, passengerPhone: x.passenger_phone, passengerEmail: "",
      pickup: x.pickup, pickupPos: x.pickup_lat != null ? { lat: x.pickup_lat, lng: x.pickup_lng } : null,
      dropoff: x.dropoff, dropoffPos: x.dropoff_lat != null ? { lat: x.dropoff_lat, lng: x.dropoff_lng } : null,
      trustedName: x.trusted_name, trustedPhone: x.trusted_phone,
      pin: S.pins[x.id] || "····",
      fareEst: x.fare_lo != null ? { lo: x.fare_lo, hi: x.fare_hi } : null, km: x.km,
      status: x.status, driverId: x.driver_id, fare: x.fare, etaMin: x.eta_min,
      assignedAt: x.assigned_at, startedAt: x.started_at, completedAt: x.completed_at, cancelledAt: x.cancelled_at, cancelledBy: x.cancelled_by,
      sos: !!x.sos, sosAt: x.sos_at, sosResolved: !!x.sos_resolved, sosResolvedAt: x.sos_resolved_at,
      passengerDismissed: !!x.passenger_dismissed, feedback: x.feedback || null, femaleDriver: true
    };
  }
  function rowToDriver(x) {
    return { id: x.id, userId: x.user_id, name: x.name, phone: x.phone, ncc: x.ncc, car: x.car, plate: x.plate, slots: x.slots || [], areas: x.areas, status: x.status, createdAt: x.created_at };
  }

  /* ---------- DRIVE ---------- */
  function myDriverRecord() {
    if (!S.account) return null;
    const d = S.drivers.find(function (x) { return x.userId === S.account.id; });
    if (d) { S.pendingDriver = null; return d; }
    return S.pendingDriver && S.pendingDriver.userId === S.account.id ? S.pendingDriver : null;
  }
  function renderDrive() {
    const me = myDriverRecord();
    $("#drv-signup").hidden = !!me;
    const home = $("#drv-home");
    home.hidden = !me;
    if (!me) {
      if (S.account) {
        if (!$("#d-name").value && !S.drafts.dNameSet) { $("#d-name").value = S.account.name || ""; S.drafts.dNameSet = true; }
        if (!$("#d-phone").value && !S.drafts.dPhoneSet) { $("#d-phone").value = S.account.phone || ""; S.drafts.dPhoneSet = true; }
      }
      return;
    }

    const statusChip = me.status === "verified" ? '<span class="chip verified">Verified</span>' : me.status === "rejected" ? '<span class="chip rejected">Not approved</span>' : '<span class="chip pending">Waiting for verification</span>';
    let html = '<div class="stack"><div class="row" style="justify-content:space-between"><h1>Hi ' + esc(first(me.name)) + "</h1>" + statusChip + "</div>" +
      '<p class="muted">' + esc([me.car, me.plate].filter(Boolean).join(" · ") || "No car details yet") + "</p></div>";

    if (me.status !== "verified") {
      html += '<div class="card"><h3>' + (me.status === "rejected" ? "We can't add you to this pilot" : "Next step: meet the pilot team") + '</h3><p class="fine">' +
        (me.status === "rejected" ? "Thank you for signing up. Contact the pilot team if you think this is a mistake." : "Bring your ID and NCC licence. Once we've checked them, rides will appear here.") + "</p></div>";
    } else {
      const mine = S.rides.filter(function (r) { return r.driverId === me.id && (r.status === "assigned" || r.status === "on_trip"); });
      const done = S.rides.filter(function (r) { return r.driverId === me.id && r.status === "completed"; }).length;
      html += '<div class="sec-head"><h2>Your rides</h2><span class="count">' + done + " completed</span></div>";
      if (!mine.length) html += '<div class="empty">No rides assigned right now. Keep this screen open during your shift; new rides appear here automatically.</div>';
      mine.forEach(function (r) {
        html += '<article class="item"><div class="item-head"><span class="chip ' + r.status + '">' + (r.status === "assigned" ? "Go to pickup" : "On trip") + "</span><time>" + esc(ago(r.assignedAt || r.createdAt)) + "</time></div>" +
          '<div class="route"><div><span class="lbl">From</span><b>' + esc(r.pickup) + '</b></div><div><span class="lbl">To</span><b>' + esc(r.dropoff) + "</b></div></div>" +
          '<div class="kv"><div><span class="lbl">Passenger</span><b>' + esc(first(r.passengerName)) + '</b></div><div><span class="lbl">Phone</span><b>' + esc(r.passengerPhone || "—") + "</b></div>" +
          '<div><span class="lbl">Price</span><b>' + (r.fare ? "€" + esc(r.fare) : "Ask the team") + '</b></div><div><span class="lbl">Pickup in</span><b>' + (r.etaMin ? esc(r.etaMin) + " min" : "—") + "</b></div></div>";
        const navTo = r.status === "assigned" ? r.pickupPos : r.dropoffPos;
        if (navTo) html += '<a class="btn btn-ghost btn-sm" href="' + esc(gmapsDir(null, navTo)) + '" target="_blank" rel="noopener">' + (r.status === "assigned" ? "Navigate to pickup" : "Navigate to drop-off") + " in Google Maps</a>";
        if (r.status === "assigned") {
          html += '<div class="stack"><label class="lbl" for="pin-' + esc(r.id) + '">Passenger PIN</label><div class="row"><input type="text" inputmode="numeric" maxlength="4" id="pin-' + esc(r.id) + '" data-draft="pin-' + esc(r.id) + '" placeholder="4 digits" style="flex:1 1 120px">' +
            '<button type="button" class="btn btn-primary btn-sm" data-act="start-trip" data-id="' + esc(r.id) + '">Start trip</button></div><p class="fine">Ask the passenger to read her PIN from her app before she gets in.</p></div>';
        } else {
          html += '<button type="button" class="btn btn-primary btn-block" data-act="finish-trip" data-id="' + esc(r.id) + '">Passenger dropped off</button>';
        }
        if (r.sos && !r.sosResolved) html += '<div class="alert">The passenger pressed Emergency. The pilot team has been alerted.</div>';
        html += "</article>";
      });
    }
    paint(home, html);
  }

  async function driverSignup(e) {
    e.preventDefault();
    if (!S.account) { toast("Log in first.", true); return; }
    const f = $("#drv-form");
    const name = $("#d-name").value.trim(), phone = $("#d-phone").value.trim();
    const nccEl = f.querySelector('input[name="ncc"]:checked');
    if (!name || !phone) { toast("Add your name and phone number.", true); return; }
    if (!nccEl) { toast("Tell us whether you hold an NCC licence.", true); return; }
    if (!$("#d-consent").checked) { toast("Tick the consent box to continue.", true); return; }
    const row = {
      id: uuid(), user_id: S.account.id, name: name, phone: phone, ncc: nccEl.value,
      car: $("#d-car").value.trim(), plate: $("#d-plate").value.trim().toUpperCase(),
      slots: $$('input[name="slots"]:checked', f).map(function (i) { return i.value; }),
      areas: $("#d-areas").value.trim()
    };
    S.pendingDriver = rowToDriver(Object.assign({ status: "pending", created_at: nowISO() }, row));
    renderDrive();
    const ok = await write(function () { return db.insert("drivers", row); }, "You're signed up. The team will be in touch.");
    if (!ok) { S.pendingDriver = null; renderDrive(); }
    else f.reset();
  }

  /* ---------- TEAM ---------- */
  const FREQ = [["weekly", "Every week"], ["few_month", "A few times a month"], ["monthly", "About once a month"], ["rarely", "Rarely"]];
  const PRICE = [["same", "Same price"], ["plus1", "Up to €1 more"], ["plus2", "Up to €2 more"], ["plus3", "€3 or more extra"], ["less", "Only if cheaper"]];
  const SAFE = [["safer", "Safer"], ["same", "About the same"], ["less", "Less safe"]];
  const NCC = { yes: "NCC licence", in_progress: "NCC in progress", no: "No NCC yet" };

  function bars(list, key, opts) {
    const n = list.length;
    return '<div class="bars">' + opts.map(function (o) {
      const c = list.filter(function (x) { return x[key] === o[0]; }).length;
      const p = pct(c, n);
      return '<div class="bar"><span>' + esc(o[1]) + '</span><span class="track"><span class="fill" style="width:' + p + '%"></span></span><em>' + c + "</em></div>";
    }).join("") + "</div>";
  }

  function rideRoute(r) {
    return '<div class="route"><div><span class="lbl">From</span><b>' + esc(r.pickup) + '</b></div><div><span class="lbl">To</span><b>' + esc(r.dropoff) + "</b></div></div>";
  }

  function renderTeam() {
    const rides = S.rides;
    const verified = S.drivers.filter(function (d) { return d.status === "verified"; });
    const dname = function (id) { const d = S.drivers.find(function (x) { return x.id === id; }); return d ? d.name : "Unknown driver"; };
    const dphone = function (id) { const d = S.drivers.find(function (x) { return x.id === id; }); return d && d.phone ? d.phone : ""; };

    // SOS
    const sos = rides.filter(function (r) { return r.sos && !r.sosResolved; });
    $("#team-tab-label").textContent = sos.length ? "Pilot dashboard (" + sos.length + " SOS)" : "Pilot dashboard";
    paint($("#team-sos"), sos.map(function (r) {
      return '<article class="item sos"><div class="item-head"><span class="chip sos">Emergency</span><time>' + esc(hhmm(r.sosAt)) + "</time></div>" + rideRoute(r) +
        '<div class="kv"><div><span class="lbl">Passenger</span><b>' + esc(r.passengerName) + ((r.passengerPhone || r.passengerEmail) ? " · " + esc(r.passengerPhone || r.passengerEmail) : "") + '</b></div>' +
        '<div><span class="lbl">Driver</span><b>' + (r.driverId ? esc(dname(r.driverId)) + (dphone(r.driverId) ? " · " + esc(dphone(r.driverId)) : "") : "Not assigned") + "</b></div>" +
        '<div><span class="lbl">Trusted contact</span><b>' + esc(r.trustedName || "—") + (r.trustedPhone ? " · " + esc(r.trustedPhone) : "") + '</b></div><div><span class="lbl">Ride status</span><b>' + esc(r.status) + "</b></div></div>" +
        '<p class="fine">Call the passenger now. If she doesn\'t answer, call her trusted contact and 112.</p>' +
        '<button type="button" class="btn btn-ghost btn-sm" data-act="resolve-sos" data-id="' + esc(r.id) + '">Mark as handled</button></article>';
    }).join(""));

    // Open requests
    const open = rides.filter(function (r) { return r.status === "requested"; }).sort(function (a, b) { return a.createdAt < b.createdAt ? -1 : 1; });
    $("#c-open").textContent = open.length ? open.length + " waiting" : "";
    const opts = '<option value="">Choose a driver</option>' + verified.map(function (d) {
      const busy = rides.some(function (r) { return r.driverId === d.id && (r.status === "assigned" || r.status === "on_trip"); });
      return '<option value="' + esc(d.id) + '">' + esc(d.name) + (busy ? " (on a ride)" : "") + "</option>";
    }).join("");
    let oh = "";
    if (!S.loaded.rides) oh = '<div class="empty">Loading requests…</div>';
    else if (!open.length) oh = '<div class="empty">No one is waiting. New ride requests appear here the moment a passenger books.</div>';
    else {
      if (!verified.length) oh += '<div class="banner">No verified drivers yet. Verify a driver below before assigning rides.</div>';
      oh += open.map(function (r) {
        const mid = r.fareEst ? Math.round((r.fareEst.lo + r.fareEst.hi) / 2) : "";
        return '<article class="item"><div class="item-head"><span class="chip new">Waiting</span><time>' + esc(ago(r.createdAt)) + "</time></div>" + rideRoute(r) +
          '<p class="fine">' + esc(r.passengerName) + ((r.passengerPhone || r.passengerEmail) ? " · " + esc(r.passengerPhone || r.passengerEmail) : "") + " · " + (r.femaleDriver ? "Female driver requested" : "Any verified driver") +
          (r.fareEst ? " · estimate €" + r.fareEst.lo + "–" + r.fareEst.hi : " · price by hand") +
          (r.pickupPos && r.dropoffPos ? ' · <a href="' + esc(gmapsDir(r.pickupPos, r.dropoffPos)) + '" target="_blank" rel="noopener">See route</a>' : "") + "</p>" +
          '<div class="assign"><label><span class="lbl">Driver</span><select data-draft="drv-' + esc(r.id) + '">' + opts + "</select></label>" +
          '<label><span class="lbl">Price €</span><input type="number" min="0" step="1" inputmode="numeric" data-draft="fare-' + esc(r.id) + '" value="' + mid + '"></label>' +
          '<label><span class="lbl">Pickup in</span><input type="number" min="1" step="1" inputmode="numeric" data-draft="eta-' + esc(r.id) + '" value="8"></label></div>' +
          '<div class="row"><button type="button" class="btn btn-primary btn-sm" data-act="assign" data-id="' + esc(r.id) + '">Assign driver</button>' +
          '<button type="button" class="btn btn-ghost btn-sm" data-act="team-cancel" data-id="' + esc(r.id) + '">No driver available</button></div></article>';
      }).join("");
    }
    paint($("#team-open"), oh);

    // Active
    const act = rides.filter(function (r) { return r.status === "assigned" || r.status === "on_trip"; });
    $("#c-active").textContent = act.length ? String(act.length) : "";
    paint($("#team-active"), act.length ? act.map(function (r) {
      return '<article class="item"><div class="item-head"><span class="chip ' + r.status + '">' + (r.status === "assigned" ? "Driver on the way" : "On trip") + "</span><time>" + esc(ago(r.assignedAt)) + "</time></div>" + rideRoute(r) +
        '<p class="fine">' + esc(r.passengerName) + " with " + esc(dname(r.driverId)) + (r.fare ? " · €" + esc(r.fare) : "") + "</p>" +
        '<div class="row"><button type="button" class="btn btn-ghost btn-sm" data-act="complete" data-id="' + esc(r.id) + '">Mark completed</button>' +
        '<button type="button" class="btn btn-ghost btn-sm" data-act="team-cancel" data-id="' + esc(r.id) + '">Cancel ride</button></div></article>';
    }).join("") : '<div class="empty">No rides on the road.</div>');

    // Stats
    const nonTest = rides;
    const completed = nonTest.filter(function (r) { return r.status === "completed"; });
    const fbs = nonTest.map(function (r) { return r.feedback; }).filter(function (f) { return f && !f.skipped; });
    const rated = fbs.filter(function (f) { return f.rating; });
    const avg = rated.length ? (rated.reduce(function (s, f) { return s + f.rating; }, 0) / rated.length).toFixed(1) : "–";
    const freqAns = fbs.filter(function (f) { return f.freq; });
    const monthly = freqAns.filter(function (f) { return f.freq !== "rarely"; }).length;
    const safeAns = fbs.filter(function (f) { return f.safety; });
    let sh = '<div class="tiles">' +
      '<div class="tile"><strong>' + nonTest.length + "</strong><span>Ride requests</span></div>" +
      '<div class="tile"><strong>' + pct(completed.length, nonTest.length) + "%</strong><span>Completed (" + completed.length + " of " + nonTest.length + ")</span></div>" +
      '<div class="tile"><strong>' + avg + "</strong><span>Average rating (" + rated.length + ")</span></div>" +
      '<div class="tile"><strong>' + verified.length + "/" + S.drivers.length + "</strong><span>Drivers verified</span></div>" +
      '<div class="tile"><strong>' + S.riderCount + "</strong><span>Rider accounts</span></div></div>";
    if (!fbs.length) sh += '<div class="empty">Feedback charts appear here after the first passenger completes a ride and answers the survey.</div>';
    else {
      sh += '<div class="card plain"><div class="sec-head"><h3>Felt safer than usual (H3)</h3><span class="count">' + safeAns.length + (safeAns.length === 1 ? " answer" : " answers") + "</span></div>" + bars(safeAns, "safety", SAFE) + "</div>";
      sh += '<div class="card plain"><div class="sec-head"><h3>How often they\'d ride (H4)</h3><span class="count">' + (freqAns.length ? pct(monthly, freqAns.length) + "% monthly or more · " : "") + freqAns.length + (freqAns.length === 1 ? " answer" : " answers") + "</span></div>" + bars(freqAns, "freq", FREQ) + "</div>";
      const pa = fbs.filter(function (f) { return f.price; });
      sh += '<div class="card plain"><div class="sec-head"><h3>Price they\'d accept (H6)</h3><span class="count">' + pa.length + (pa.length === 1 ? " answer" : " answers") + "</span></div>" + bars(pa, "price", PRICE) + "</div>";
      const comments = nonTest.filter(function (r) { return r.feedback && r.feedback.comment; }).slice(0, 8);
      if (comments.length) sh += '<div class="card plain"><h3>What would build trust</h3>' + comments.map(function (r) { return '<p class="fine">“' + esc(r.feedback.comment) + "” · " + esc(first(r.passengerName)) + "</p>"; }).join("") + "</div>";
    }
    paint($("#team-stats"), sh);

    // Drivers
    $("#c-drivers").textContent = S.drivers.length ? verified.length + " verified · " + S.drivers.length + " signed up" : "";
    const pending = S.drivers.filter(function (d) { return !d.status || d.status === "pending"; });
    const others = S.drivers.filter(function (d) { return d.status === "verified" || d.status === "rejected"; });
    let dh = "";
    if (!S.drivers.length) dh = '<div class="empty">No drivers yet. Sign-ups from the Drive tab appear here for you to verify.</div>';
    dh += pending.map(function (d) {
      return '<article class="item"><div class="item-head"><span class="chip pending">To verify</span><time>' + esc(ago(d.createdAt)) + "</time></div>" +
        '<div class="kv"><div><span class="lbl">Name</span><b>' + esc(d.name) + '</b></div><div><span class="lbl">Phone</span><b>' + esc(d.phone) + "</b></div>" +
        '<div><span class="lbl">Licence</span><b>' + esc(NCC[d.ncc] || "—") + '</b></div><div><span class="lbl">Car</span><b>' + esc([d.car, d.plate].filter(Boolean).join(" · ") || "—") + "</b></div>" +
        '<div><span class="lbl">Hours</span><b>' + esc((d.slots || []).join(", ") || "—") + '</b></div><div><span class="lbl">Areas</span><b>' + esc(d.areas || "—") + "</b></div></div>" +
        '<div class="row"><button type="button" class="btn btn-primary btn-sm" data-act="verify" data-id="' + esc(d.id) + '">Verified in person</button><button type="button" class="btn btn-ghost btn-sm" data-act="reject" data-id="' + esc(d.id) + '">Not approved</button></div></article>';
    }).join("");
    if (others.length) {
      dh += '<div class="item">' + others.map(function (d) {
        const n = rides.filter(function (r) { return r.driverId === d.id && r.status === "completed"; }).length;
        return '<div class="row" style="justify-content:space-between"><div class="stack" style="gap:0"><b>' + esc(d.name) + '</b><span class="fine">' + esc(d.phone || "") + (d.car ? " · " + esc(d.car) : "") + " · " + n + " rides</span></div>" +
          '<span class="chip ' + esc(d.status) + '">' + (d.status === "verified" ? "Verified" : "Not approved") + "</span></div>";
      }).join('<hr style="border:0;border-top:1px solid var(--line);margin:0;width:100%">') + "</div>";
    }
    paint($("#team-drivers"), dh);

    // Past
    const past = rides.filter(function (r) { return r.status === "completed" || r.status === "cancelled"; });
    $("#c-past").textContent = past.length ? String(past.length) : "";
    paint($("#team-past"), past.length ? past.slice(0, 30).map(function (r) {
      const fb = r.feedback && !r.feedback.skipped ? r.feedback : null;
      return '<article class="item"><div class="item-head"><span class="chip ' + r.status + '">' + (r.status === "completed" ? "Completed" : "Cancelled") + "</span><time>" + esc(ago(r.completedAt || r.cancelledAt || r.createdAt)) + "</time></div>" + rideRoute(r) +
        '<p class="fine">' + esc(r.passengerName) + (r.driverId ? " with " + esc(dname(r.driverId)) : "") + (r.fare ? " · €" + esc(r.fare) : "") +
        (fb ? " · rated " + (fb.rating || "–") + "/5" : (r.status === "completed" ? " · no feedback yet" : "")) + "</p></article>";
    }).join("") : '<div class="empty">Completed and cancelled rides are listed here.</div>');

    $("#export-card").hidden = !S.dl;
  }

  /* ---------- CSV ---------- */
  function csv(rows, cols) {
    const q = function (v) { const s = v == null ? "" : (typeof v === "object" ? JSON.stringify(v) : String(v)); return /[",\n;]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
    return "﻿" + [cols.map(function (c) { return q(c[0]); }).join(",")].concat(rows.map(function (r) { return cols.map(function (c) { return q(c[1](r)); }).join(","); })).join("\n");
  }
  function exportFile(name, data) {
    try {
      const url = URL.createObjectURL(new Blob([data], { type: "text/csv;charset=utf-8" }));
      const a = document.createElement("a");
      a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
      toast("Download started");
    } catch (e) { toast("Couldn't create the download. Try again.", true); }
  }

  /* ---------- Actions ---------- */
  const ACT = {
    "pick-map": function (b) { openPicker(b.dataset.field); },
    "map-hint": function () { openPicker(S.fields.from.sel ? "to" : "from"); },
    "picker-close": function () { closePicker(); },
    "picker-confirm": function () { confirmPick(); },
    "new-ride": function () {
      const r = currentRide();
      if (r) { S.dismissed.add(r.id); db.rpc("rider_action", { p_ride: r.id, p_action: "dismiss" }).catch(function () {}); }
      S.rideView = "home"; renderRide();
    },
    "auth-mode": function (b) { setAuthMode(b.dataset.mode); },
    "logout": function () { logout(); },
    "locate-from": function () { locate("from"); },
    "menu": function () { openDrawer(); },
    "go": function (b) { go(b.dataset.to); },
    "search-to": function () { openSearch("to"); },
    "search-from": function () { openSearch("from"); },
    "search-close": function () { closeSearch(); renderRide(); },
    "back-home": function () { S.rideView = "home"; renderRide(); },
    "request": function () { requestRide(); },
    "quick-dest": function (b) {
      const p = SPOTS.find(function (s) { return s.label === b.dataset.name; });
      if (!p) return;
      S.fields.to.sel = p; $("#to").value = p.label;
      afterPick("to");
    },
    "cancel-ride": function () {
      const r = currentRide(); if (!r) return;
      write(function () { return db.rpc("rider_action", { p_ride: r.id, p_action: "cancel" }); }, "Ride cancelled");
    },
    "copy-share": function () {
      const r = currentRide(); if (!r) return;
      const text = shareText(r);
      const box = $("#share-box");
      const fallback = function () { box.hidden = false; box.focus(); box.select(); toast("Select the text and copy it."); };
      try {
        navigator.clipboard.writeText(text).then(function () { toast("Trip details copied. Paste them into a chat."); }, fallback);
      } catch (e) { fallback(); }
    },
    "open-sos": function () { renderSos(); $("#sos-sheet").hidden = false; $("#sos-sheet .sheet .btn-ghost").focus(); },
    "close-sos": function () { $("#sos-sheet").hidden = true; },
    "alert-team": async function () {
      const r = currentRide(); if (!r) return;
      const ok = await write(function () { return db.rpc("rider_action", { p_ride: r.id, p_action: "sos" }); });
      if (ok) { S.sosAlerted = r.id; renderSos(); }
    },
    "fb-skip": async function () {
      const r = currentRide(); if (!r) return;
      const ok = await write(function () { return db.rpc("rider_action", { p_ride: r.id, p_action: "feedback", p_feedback: { skipped: true, at: nowISO() } }); });
      if (ok) { S.dismissed.add(r.id); renderRide(); }
    },
    "start-trip": async function (b) {
      const id = b.dataset.id;
      const v = (($("#pin-" + id) || {}).value || "").trim();
      if (!/^\d{4}$/.test(v)) { toast("Type the passenger's 4-digit PIN.", true); return; }
      try {
        const ok = await db.rpc("driver_action", { p_ride: id, p_action: "start", p_pin: v });
        if (ok === false) { toast("That PIN doesn't match. Ask the passenger to read hers from the app.", true); return; }
        delete S.drafts["pin-" + id];
        toast("Trip started. Drive safe.");
        refresh();
      } catch (e) { toast(errMsg(e), true); }
    },
    "finish-trip": function (b) { write(function () { return db.rpc("driver_action", { p_ride: b.dataset.id, p_action: "complete" }); }, "Trip completed"); },
    "assign": function (b) {
      const id = b.dataset.id;
      const drv = S.drafts["drv-" + id] || "";
      if (!drv) { toast("Choose a driver first.", true); return; }
      const fareRaw = S.drafts["fare-" + id] != null ? S.drafts["fare-" + id] : ($('[data-draft="fare-' + id + '"]') || {}).value;
      const etaRaw = S.drafts["eta-" + id] != null ? S.drafts["eta-" + id] : ($('[data-draft="eta-' + id + '"]') || {}).value;
      const fare = fareRaw !== "" && fareRaw != null ? Number(fareRaw) : null;
      const eta = etaRaw !== "" && etaRaw != null ? Number(etaRaw) : null;
      write(function () { return db.rpc("team_ride_action", { p_ride: id, p_action: "assign", p_driver: drv, p_fare: fare, p_eta: eta }); }, "Driver assigned. The passenger can see her now.");
    },
    "team-cancel": function (b) { write(function () { return db.rpc("team_ride_action", { p_ride: b.dataset.id, p_action: "cancel" }); }, "Ride cancelled"); },
    "complete": function (b) { write(function () { return db.rpc("team_ride_action", { p_ride: b.dataset.id, p_action: "complete" }); }, "Marked completed"); },
    "resolve-sos": function (b) { write(function () { return db.rpc("team_ride_action", { p_ride: b.dataset.id, p_action: "resolve_sos" }); }, "Emergency marked as handled"); },
    "verify": function (b) { write(function () { return db.rpc("team_driver_status", { p_driver: b.dataset.id, p_status: "verified" }); }, "Driver verified"); },
    "reject": function (b) { write(function () { return db.rpc("team_driver_status", { p_driver: b.dataset.id, p_status: "rejected" }); }, "Driver marked not approved"); },
    "export-rides": function () {
      const dn = function (id) { const d = S.drivers.find(function (x) { return x.id === id; }); return d ? d.name : ""; };
      const fb = function (r, k) { return r.feedback && !r.feedback.skipped ? r.feedback[k] : ""; };
      exportFile("wubber-rides.csv", csv(S.rides, [
        ["Requested at", function (r) { return r.createdAt; }], ["Status", function (r) { return r.status; }],
        ["Passenger", function (r) { return r.passengerName; }], ["Pickup", function (r) { return r.pickup; }], ["Destination", function (r) { return r.dropoff; }],
        ["Female driver requested", function (r) { return r.femaleDriver ? "yes" : "no"; }], ["Trusted contact added", function (r) { return r.trustedName || r.trustedPhone ? "yes" : "no"; }],
        ["Estimate low €", function (r) { return r.fareEst ? r.fareEst.lo : ""; }], ["Estimate high €", function (r) { return r.fareEst ? r.fareEst.hi : ""; }],
        ["Price €", function (r) { return r.fare; }], ["Driver", function (r) { return dn(r.driverId); }],
        ["Assigned at", function (r) { return r.assignedAt; }], ["Completed at", function (r) { return r.completedAt; }], ["Cancelled by", function (r) { return r.cancelledBy; }],
        ["Emergency pressed", function (r) { return r.sos ? "yes" : "no"; }],
        ["Rating", function (r) { return fb(r, "rating"); }], ["Felt", function (r) { return fb(r, "safety"); }], ["Frequency", function (r) { return fb(r, "freq"); }],
        ["Price acceptance", function (r) { return fb(r, "price"); }], ["Comment", function (r) { return fb(r, "comment"); }],
        ["Feedback skipped", function (r) { return r.feedback && r.feedback.skipped ? "yes" : ""; }]
      ]));
    },
    "export-drivers": function () {
      exportFile("wubber-drivers.csv", csv(S.drivers, [
        ["Signed up at", function (d) { return d.createdAt; }], ["Name", function (d) { return d.name; }], ["Phone", function (d) { return d.phone; }],
        ["NCC licence", function (d) { return NCC[d.ncc] || ""; }], ["Car", function (d) { return d.car; }], ["Plate", function (d) { return d.plate; }],
        ["Hours", function (d) { return (d.slots || []).join(" / "); }], ["Areas", function (d) { return d.areas; }], ["Status", function (d) { return d.status; }],
        ["Completed rides", function (d) { return S.rides.filter(function (r) { return r.driverId === d.id && r.status === "completed"; }).length; }]
      ]));
    }
  };

  function renderSos() {
    const r = currentRide();
    const box = $("#sos-team");
    if (!r || r.status === "cancelled" || r.status === "completed") { box.innerHTML = ""; return; }
    if (r.sos && !r.sosResolved) {
      box.innerHTML = '<div class="note">Pilot team alerted at ' + esc(hhmm(r.sosAt)) + ". They can see your ride, your driver and your trusted contact, and will call you.</div>";
    } else {
      box.innerHTML = '<div class="stack"><button type="button" class="btn btn-danger btn-big btn-block" data-act="alert-team">Alert the pilot team</button>' +
        '<p class="fine">Sends your ride, driver and trusted contact to the pilot team\'s dashboard so they can call you.</p></div>';
    }
  }

  /* ---------- GPS ---------- */
  function locate(field) {
    if (!navigator.geolocation) { toast("This browser can't share your location. Type the address instead.", true); return; }
    toast("Finding your location…");
    navigator.geolocation.getCurrentPosition(function (pos) {
      const r = reverseGeocode(pos.coords.latitude, pos.coords.longitude);
      if (/^Pinned location/.test(r.label)) r.label = "My location";
      r.gps = true;
      S.fields[field].sel = r;
      $("#" + field).value = r.label;
      toast(field === "from" ? "Pickup set to where you are" : "Destination set to where you are");
      afterPick(field);
    }, function (err) {
      toast(err && err.code === 1 ? "Location access is blocked. Allow it in your browser settings, or type the address." : "Couldn't find your location. Type the address or drop a pin instead.", true);
    }, { enableHighAccuracy: true, timeout: 12000, maximumAge: 30000 });
  }

  /* ---------- Live updates ---------- */
  let pollTimer = null, refreshing2 = false;
  async function refresh() {
    if (!S.account || refreshing2) return;
    refreshing2 = true;
    try {
      const team = isTeam();
      const jobs = [
        db.select("rides", "select=" + RIDE_COLS + "&order=created_at.desc&limit=300"),
        db.select("drivers", "select=*&order=created_at.desc&limit=500")
      ];
      if (team) {
        jobs.push(db.select("profiles", "select=id,role"));
      }
      const res = await Promise.all(jobs);
      const mine = (res[0] || []).filter(function (x) { return x.rider_id === S.account.id && (x.status === "requested" || x.status === "assigned") && !S.pins[x.id]; });
      for (const x of mine.slice(0, 3)) {
        try { const pin = await db.rpc("my_ride_pin", { p_ride: x.id }); if (pin) S.pins[x.id] = String(pin); } catch (e) {}
      }
      S.rides = (res[0] || []).map(rowToRide);
      S.drivers = (res[1] || []).map(rowToDriver);
      if (team) {
        S.riderCount = (res[2] || []).filter(function (p) { return p.role !== "team"; }).length;
      }
      S.loaded.rides = S.loaded.drivers = S.loaded.waitlist = true;
      setConn("live");
    } catch (e) {
      console.warn("refresh", e);
      setConn("offline");
      if (e.status === 401) { toast("Your session has ended. Log in again.", true); forceLogout(); }
    } finally { refreshing2 = false; }
    renderAll();
  }
  function startPolling() {
    stopPolling();
    refresh();
    pollTimer = setInterval(function () { if (!document.hidden) refresh(); }, 4000);
  }
  function stopPolling() { if (pollTimer) clearInterval(pollTimer); pollTimer = null; }

  /* ---------- Render all ---------- */
  function renderAll() {
    const locked = isLocked();
    document.body.classList.toggle("locked", locked);
    $("#dr-team").hidden = !isTeam();
    if (locked) {
      closeDrawer();
      if (S.tab !== "ride") { go("ride"); return; }
    }
    renderRide();
    if (S.tab === "account") renderAccount();
    if (S.tab === "drive") renderDrive();
    if (S.tab === "team") renderTeam();
    else {
      const sos = S.rides.filter(function (r) { return r.sos && !r.sosResolved; }).length;
      $("#team-tab-label").textContent = sos ? "Pilot dashboard (" + sos + " SOS)" : "Pilot dashboard";
    }
    if (!$("#sos-sheet").hidden) renderSos();
  }

  function setConn(state) {
    const c = $("#conn");
    if (state === "live") { c.className = "conn live"; c.lastElementChild.textContent = "Live"; }
    else if (state === "offline") { c.className = "conn"; c.lastElementChild.textContent = "Offline"; }
    else { c.className = "conn"; c.lastElementChild.textContent = "Connecting…"; }
  }

  /* ---------- Boot ---------- */
  function bindStatic() {
    setupAC("from"); setupAC("to");
    $("#login-form").addEventListener("submit", login);
    $("#signup-form").addEventListener("submit", signup);
    $("#signup-form").addEventListener("input", checkSignup);
    $("#signup-form").addEventListener("change", checkSignup);
    $("#forgot-form").addEventListener("submit", forgot);
    $("#reset-form").addEventListener("submit", resetPassword);
    document.addEventListener("submit", function (e) { if (e.target.id === "profile-form") saveProfile(e); });
    $("#drawer").addEventListener("click", function (e) { if (e.target.id === "drawer") closeDrawer(); });
    $("#drv-form").addEventListener("submit", driverSignup);
    $("#fb-form").addEventListener("submit", sendFeedback);
    document.addEventListener("click", function (e) {
      const b = e.target.closest && e.target.closest("[data-act]");
      if (b && ACT[b.dataset.act]) { e.preventDefault(); ACT[b.dataset.act](b, e); }
    });
    $("#sos-sheet").addEventListener("click", function (e) { if (e.target.id === "sos-sheet") $("#sos-sheet").hidden = true; });
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      if (!$("#sos-sheet").hidden) $("#sos-sheet").hidden = true;
      else if (!$("#picker").hidden) closePicker();
      else if (!$("#drawer").hidden) closeDrawer();
      else if (!$("#search").hidden) { closeSearch(); renderRide(); }
    });
    document.addEventListener("visibilitychange", function () { if (!document.hidden && S.account) refresh(); });
    let rz = 0;
    window.addEventListener("resize", function () { clearTimeout(rz); rz = setTimeout(function () { MAPS.mainKey = null; renderRide(); }, 150); });
    setInterval(function () { if (S.account) renderAll(); }, 30000);
  }

  async function boot() {
    bindStatic();
    loadMapData();
    onMap(function () { MAPS.mainKey = null; renderAll(); });
    setAuthMode("login");
    if (!apiConfigured()) {
      $("#setup-banner").hidden = false;
      setConn("offline");
      go("ride");
      return;
    }
    const fromLink = await handleAuthRedirect();
    if (fromLink) return;
    if (SESSION && SESSION.user) {
      S.authChecking = true;
      go("ride");
      try { await accessToken(); } catch (e) {}
      if (SESSION) await afterAuth(null);
      else { S.authChecking = false; renderAll(); }
    } else {
      go("ride");
    }
  }

  boot();

})();
