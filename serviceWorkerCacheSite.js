const cacheName = "v3"; //Name can be any and value too

self.addEventListener('install', (event)=>{
    console.log("event install",event);
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
    event.respondWith(fetch(event.request)
        .then((response)=>{
            const resClone = response.clone();
            caches.open(cacheName)
                .then((cache) => {
                    cache.put(event.request, resClone)
                })
            return response;
        })
        .catch(()=>{
            caches.match(event.request).then(res=>res);
        }))
})