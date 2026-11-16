/* Wubber service worker: lets phones install the site as an app.
   It doesn't cache anything, so every visit loads the latest version. */
self.addEventListener("install", function () { self.skipWaiting(); });
self.addEventListener("activate", function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener("fetch", function () { /* network as usual */ });
