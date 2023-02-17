self.addEventListener("install",()=>
{
    caches.open('mycache').then(cache =>
        {
            cache.add("index.html");
            cache.add("stock.json");
            cache.add("sw.js");
            cache.add("manifest.json");
        });

    console.log("installed");
});
self.addEventListener("active",()=>{console.log("activated")});
self.addEventListener("fetch",(event)=>
{
    fetch('./stock.json')
            .then((response) => response.json())
            .then((json) => console.log("sw fetched: "+json));
    console.log("fetched");
    event.respondWith(caches.match(event.request).then(
        respevt =>
        {
            return respevt || fetch(event.request);
        }
    )
)
   
});