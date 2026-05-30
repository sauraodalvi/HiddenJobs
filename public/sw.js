const CACHE = "hiddenjobs-v1";
const PRECACHE_URLS = ["/"];

function isCacheable(req) {
  const url = new URL(req.url);
  return url.protocol === "http:" || url.protocol === "https:";
}

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  if (!isCacheable(e.request)) return;

  const url = new URL(e.request.url);

  // Skip API routes — dynamic data, never cache
  if (url.pathname.startsWith("/api/")) return;

  e.respondWith(
    fetch(e.request)
      .then((res) => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then((cache) => cache.put(e.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(e.request).then((cached) => cached || new Response("", { status: 503 })))
  );
});
