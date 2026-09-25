/*
 * Starhela Agencies — Service Worker
 * Precaches every page + static asset so the site (not just the homepage)
 * keeps working offline / on flaky connections, and updates itself
 * automatically whenever a new version is deployed.
 */

const CACHE_VERSION = "v3";
const PRECACHE = `starhela-precache-${CACHE_VERSION}`;
const RUNTIME = `starhela-runtime-${CACHE_VERSION}`;

// Every same-origin page and asset in the site. Using the clean URLs
// (no .html) here because those are the URLs the browser actually
// requests in production (Vercel/.htaccess rewrite clean URLs to the
// matching .html file server-side).
const PRECACHE_URLS = [
  "/",
  "/bonus",
  "/manifest.json",

  // Earn pages
  "/earn/chatting",
  "/earn/videos",
  "/earn/ads",
  "/earn/surveys",
  "/earn/training-ai",
  "/earn/online-writing",
  "/earn/spinandwin",
  "/earn/teaching-language",

  // Country pages
  "/countries/kenya",
  "/countries/uganda",
  "/countries/nigeria",
  "/countries/tanzania",
  "/countries/ghana",
  "/countries/cameroon",
  "/countries/zambia",
  "/countries/burundi",

  // Stylesheets
  "/css/starhela.css",
  "/css/ads.css",
  "/css/chatting.css",
  "/css/countries.css",
  "/css/online-writing.css",
  "/css/spinandwin.css",
  "/css/surveys.css",
  "/css/teaching-language.css",
  "/css/train-ai.css",
  "/css/videos.css",

  // Scripts
  "/js/starhela.js",
  "/js/ads.js",
  "/js/chatting.js",
  "/js/online-writing.js",
  "/js/spinandwin.js",
  "/js/surveys.js",
  "/js/teaching-language.js",
  "/js/train-ai.js",
  "/js/videos.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(PRECACHE).then((cache) => {
      // Cache each URL individually so one failed request (e.g. a page
      // that's briefly unreachable during a deploy) can't abort caching
      // of everything else, the way cache.addAll() would.
      return Promise.all(
        PRECACHE_URLS.map((url) =>
          cache.add(url).catch((err) => {
            console.warn("[sw] failed to precache", url, err);
          }),
        ),
      );
    }),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== PRECACHE && key !== RUNTIME)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Only handle GET requests — POSTs (forms, APIs) always go to the network.
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Page navigations: try the network first so users always get the latest
  // content when online, and fall back to the cached page (then the
  // cached homepage as a last resort) when offline.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(PRECACHE).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(
          async () =>
            (await caches.match(request)) ||
            (await caches.match("/")) ||
            Response.error(),
        ),
    );
    return;
  }

  // Same-origin static assets: cache-first for speed, refreshing the cache
  // in the background so the next visit picks up any changes.
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const network = fetch(request)
          .then((response) => {
            const copy = response.clone();
            caches.open(PRECACHE).then((cache) => cache.put(request, copy));
            return response;
          })
          .catch(() => cached);
        return cached || network;
      }),
    );
    return;
  }

  // Cross-origin assets (fonts, Cloudinary images, CDN libraries): try the
  // network, fall back to a runtime cache when offline.
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(RUNTIME).then((cache) => cache.put(request, copy));
        }
        return response;
      })
      .catch(() => caches.match(request)),
  );
});
