if('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('serviceWorkerCacheSite.js')
        .then(function (register) {
            console.log("reg scope", register.scope);
        })
        .catch((err)=>{
            console.log(`Service worker error : ${err}`);
        })
    })
}