// Scope-relative shell: works both at / and /Longwave/, never caches private API data.
const BASE=new URL('./',self.location.href);
const CACHE='longwave-shell-v4-'+BASE.pathname;
const SHELL=['','index.html','app.css','layout-preview.css?v=20260930-clear-cards','app.js?v=falki','preview-api.js?v=falki','manifest.webmanifest','assets/brand.png','assets/icon-192.png','assets/icon-512.png'].map(p=>new URL(p,BASE).href);
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('longwave-shell-')&&k.endsWith(BASE.pathname)&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||!SHELL.includes(e.request.url))return;e.respondWith(fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}return r}).catch(()=>caches.match(e.request)));});
