/* Wubber: light / dark theme.
   Loaded in <head> so the page never flashes the wrong colours.
   Uses the phone's setting until someone taps the sun or moon in the menu. */
(function () {
  "use strict";
  var KEY = "wubber.theme";
  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  // Optional look to preview a restyle: open the site with ?look=bold, ?look=minimal or ?look=night (?look=off resets).
  var LOOKS = { bold: 1, minimal: 1, night: 1 }, LK = "wubber.look";
  try {
    var q = new URLSearchParams(location.search).get("look");
    if (q !== null) localStorage.setItem(LK, LOOKS[q] ? q : "");
  } catch (e) {}
  var look = ""; try { look = localStorage.getItem(LK) || ""; } catch (e) {}
  if (LOOKS[look]) {
    document.documentElement.setAttribute("data-look", look);
    document.write('<link rel="stylesheet" href="looks/' + look + '.css">');
  }
  var mq = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  function current() { if (look === "night") return "dark"; var s = get(); return s === "dark" || s === "light" ? s : (mq && mq.matches ? "dark" : "light"); }

  function apply(t, announce) {
    var root = document.documentElement;
    root.setAttribute("data-theme", t);
    window.WUBBER_THEME = t;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", t === "dark" ? "#17101F" : "#FFFFFF");
    // Android colours its bottom bar from the app manifest, so swap it with the theme.
    var man = document.querySelector('link[rel="manifest"]');
    if (man) man.setAttribute("href", (t === "dark" ? "manifest-dark.webmanifest" : "manifest.webmanifest") + "?v=3");
    var imgs = document.querySelectorAll("img[data-logo]");
    for (var i = 0; i < imgs.length; i++) imgs[i].src = "logo-" + imgs[i].getAttribute("data-logo") + (t === "dark" ? "-dark" : "") + ".png";
    var bs = document.querySelectorAll(".theme-btn[data-theme-set]");
    for (var j = 0; j < bs.length; j++) bs[j].setAttribute("aria-pressed", bs[j].getAttribute("data-theme-set") === t ? "true" : "false");
    if (announce) { try { window.dispatchEvent(new CustomEvent("wubber:theme", { detail: t })); } catch (e) {} }
  }
  apply(current(), false);
  document.addEventListener("DOMContentLoaded", function () { apply(current(), false); });
  if (mq && mq.addEventListener) mq.addEventListener("change", function () { if (!get()) apply(current(), true); });
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest(".theme-btn[data-theme-set]");
    if (!b) return;
    e.preventDefault();
    var t = b.getAttribute("data-theme-set");
    set(t);
    apply(t, true);
  });
})();
