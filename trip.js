/* Wubber: the page a trusted contact opens from a "share my trip" link. */
(function () {
  "use strict";
  const CFG = window.WSR_CONFIG || {};
  const URL_ = String(CFG.supabaseUrl || "").replace(/\/+$/, ""), KEY = String(CFG.supabaseAnonKey || "");
  const token = new URLSearchParams(location.search).get("t") || "";
  const body = document.getElementById("t-body");
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function hhmm(iso) { return iso ? new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : ""; }
  function ago(iso) {
    const s = (Date.now() - Date.parse(iso)) / 1000;
    if (s < 60) return "just now";
    return Math.floor(s / 60) + " min ago";
  }
  function initials(n) { const p = String(n || "?").trim().split(/\s+/); return ((p[0] || "?")[0] + (p[1] ? p[1][0] : "")).toUpperCase(); }

  let map = null, layers = [], fitted = false, timer = null;

  function drawMap(t) {
    const pts = [];
    if (t.pickup_lat != null) pts.push({ lat: t.pickup_lat, lng: t.pickup_lng, c: "#C42A6F", r: 8 });
    if (t.dropoff_lat != null) pts.push({ lat: t.dropoff_lat, lng: t.dropoff_lng, c: "#540CAA", r: 8 });
    if (t.loc && t.loc.lat != null) pts.push({ lat: t.loc.lat, lng: t.loc.lng, c: "#1A73E8", r: 10, me: true });
    const box = document.getElementById("t-mapbox");
    if (!pts.length || !window.L) { box.hidden = true; document.getElementById("t-legend").hidden = true; return; }
    box.hidden = false; document.getElementById("t-legend").hidden = false;
    if (!map) {
      map = L.map("t-map", { zoomControl: true, attributionControl: false });
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19 }).addTo(map);
      map.setView([45.0703, 7.6869], 13);
    }
    layers.forEach(function (l) { map.removeLayer(l); }); layers = [];
    pts.forEach(function (p) {
      layers.push(L.circleMarker([p.lat, p.lng], { radius: p.r, color: "#FFFFFF", weight: 3, fillColor: p.c, fillOpacity: 1 }).addTo(map));
    });
    if (!fitted) {
      if (pts.length === 1) map.setView([pts[0].lat, pts[0].lng], 15);
      else map.fitBounds(pts.map(function (p) { return [p.lat, p.lng]; }), { padding: [36, 36] });
      fitted = true;
    } else {
      const me = pts.find(function (p) { return p.me; });
      if (me && !map.getBounds().contains([me.lat, me.lng])) map.panTo([me.lat, me.lng]);
    }
  }

  function render(t) {
    if (!t || !t.found) {
      body.innerHTML = '<h1>Trip not found</h1><p class="muted">This link doesn\'t match a Wubber ride. Check that you copied the whole link.</p>';
      return false;
    }
    if (t.expired) {
      body.innerHTML = '<h1>This trip has ended</h1><p class="muted">Shared trips stop showing 1 hour after the ride ends.</p>';
      document.getElementById("t-mapbox").hidden = true; document.getElementById("t-legend").hidden = true;
      return false;
    }
    const who = esc(t.rider || "Your friend"), d = t.driver;
    let title, sub = "";
    if (t.status === "requested") { title = who + " is waiting for a driver"; sub = "Booked at " + hhmm(t.created_at) + ". The pilot team is matching her with a verified female driver."; }
    else if (t.status === "assigned") { title = esc(d ? d.name : "Her driver") + " is on her way to pick up " + who; sub = t.eta_min ? "Pickup in about " + esc(t.eta_min) + " min" : "Driver assigned at " + hhmm(t.assigned_at); }
    else if (t.status === "on_trip") { title = who + " is on the road"; sub = "Picked up at " + hhmm(t.started_at); }
    else if (t.status === "completed") { title = who + " has arrived"; sub = "Dropped off at " + hhmm(t.completed_at); }
    else { title = who + "'s ride was cancelled"; sub = "Cancelled at " + hhmm(t.cancelled_at); }

    let h = '<div class="t-status"><h1>' + title + '</h1><p class="muted">' + esc(sub) + "</p></div>";
    if (t.sos) h += '<div class="t-alert">She pressed the emergency button. The pilot team has been alerted.</div>';
    if (t.status === "completed") h += '<div class="t-ok">Arrived safely.</div>';
    if (d) {
      h += '<div class="card"><div class="driver">' +
        (d.photo_url ? '<div class="avatar has-photo"><img src="' + esc(d.photo_url) + '" alt="Photo of ' + esc(d.name) + '"></div>' : '<div class="avatar" aria-hidden="true">' + esc(initials(d.name)) + "</div>") +
        '<div class="stack" style="gap:4px;min-width:0"><span class="lbl">Her driver</span><b style="font-size:18px">' + esc(d.name) + "</b></div></div>" +
        '<div class="kv"><div><span class="lbl">Car</span><b>' + esc(d.car || "—") + '</b></div><div><span class="lbl">Plate</span><b>' + esc(d.plate || "—") + "</b></div></div></div>";
    }
    h += '<div class="card plain t-route"><div><span class="lbl">From</span><b>' + esc(t.pickup) + '</b></div><div><span class="lbl">To</span><b>' + esc(t.dropoff) + "</b></div></div>";
    if (t.status === "assigned" || t.status === "on_trip") {
      h += '<p class="t-meta">' + (t.loc ? "Her phone's location updated " + ago(t.loc.at) + "." : "She isn't sharing her location right now; you'll still see her ride status.") + " This page refreshes on its own.</p>";
    }
    body.innerHTML = h;
    drawMap(t);
    return t.status !== "completed" && t.status !== "cancelled";
  }

  async function load() {
    if (!/^[0-9a-f-]{36}$/i.test(token) || !URL_) { render(null); return; }
    try {
      const r = await fetch(URL_ + "/rest/v1/rpc/shared_trip", {
        method: "POST",
        headers: { apikey: KEY, Authorization: "Bearer " + KEY, "Content-Type": "application/json" },
        body: JSON.stringify({ p_token: token })
      });
      if (!r.ok) throw new Error(r.status);
      const t = await r.json();
      const live = render(t);
      clearTimeout(timer);
      timer = setTimeout(load, live ? 10000 : 60000);
    } catch (e) {
      if (!body.querySelector("h1")) body.innerHTML = '<p class="muted">Can\'t reach Wubber right now. Retrying…</p>';
      clearTimeout(timer);
      timer = setTimeout(load, 15000);
    }
  }
  document.addEventListener("visibilitychange", function () { if (!document.hidden) load(); });
  load();
})();
