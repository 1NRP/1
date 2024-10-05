self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('M3U8-Cache').then((cache) => {
            return cache.addAll([
                // Static files to cache.
                '/1/M3U8/CSS-JS/style.css',
                '/1/M3U8/CSS-JS/mux-mp4.js',
                '/1/M3U8/CSS-JS/script.js',
                //'/1/M3U8-CSS-JS/aes-decryptor.js',
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
