const cacheName = "v2"; //Name can be any and value too
const cacheAssets = [
    'index.html',
    'styles/styles.css',
    'scripts/main.js'
]; //Name can be any

self.addEventListener('install', (event)=>{
    console.log("event install",event);
    event.waitUntil(
        caches.open(cacheName)
            .then((cache) => {
                console.log("cache", cache);
                cache.addAll(cacheAssets);
            })
            .then(() => {
                self.skipWaiting();
            })
    )
})

self.addEventListener('activate', (event)=>{
    console.log("event activate",event);
    event.waitUntil(
        caches.keys().then((cacheNamesParam) => {
            return Promise.all(
                cacheNamesParam.map(cache => {
                    if(cache !== cacheName) {
                        caches.delete(cache);
                    }
                })
            )
        })
    )
})

self.addEventListener('fetch', (event) => {
    console.log("fetch event");
    event.respondWith(fetch(event.request).catch(()=>{
        caches.match(event.request);
    }))
})