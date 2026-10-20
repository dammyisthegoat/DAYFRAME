const V="dayframe-v2",A=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(A)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);
if(r.mode==="navigate"){e.respondWith(fetch(r).then(n=>{const c=n.clone();caches.open(V).then(x=>x.put("index.html",c));return n}).catch(()=>caches.match("index.html")));return}
if(u.origin===location.origin||/fonts\.(googleapis|gstatic)\.com/.test(u.host)){e.respondWith(caches.match(r).then(h=>h||fetch(r).then(n=>{const c=n.clone();caches.open(V).then(x=>x.put(r,c));return n})))}});
