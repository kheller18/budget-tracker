const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";

// files to cache
const FILES_TO_CACHE = [
  "/",
  "/db.js",
  "/index.html",
  "/styles.css",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png"
];

// cacheing files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("cache successful");
        return cache.addAll(FILES_TO_CACHE);
      })
  );
  self.skipWaiting();
});

// fetching cached files
self.addEventListener("fetch", (event) => {
  console.log(caches);
  if (event.request.url.includes("/api/")) {
    event.respondWith(
      caches.open(DATA_CACHE_NAME)
        .then(cache => {
          return fetch(event.request)
            .then(response => {
              if (response.status === 200) {
                cache.put(event.request.url, response.clone());
              }
              return response;
            })
        })
    );
    return;
  };
});
