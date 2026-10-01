// Scope-relative shell: works both at / and /Longwave/, never caches private API data.
const BASE=new URL('./',self.location.href);
const CACHE='longwave-preview-glass-v6-'+BASE.pathname;
const SHELL=['','index.html','preview-api.js?v=falki','app.css','layout-preview.css?v=20260930-coastal-home','app.js?v=admin-logo','manifest.webmanifest','assets/brand.png','assets/favicon-glass-32.png','assets/apple-touch-glass.png','assets/icon-glass-192.png','assets/icon-glass-512.png','assets/favicon.ico?v=glass'].map(p=>new URL(p,BASE).href);
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>(k.startsWith('longwave-preview-')||k.startsWith('longwave-shell-'))&&k.endsWith(BASE.pathname)&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||!SHELL.includes(e.request.url))return;e.respondWith(fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}return r}).catch(()=>caches.match(e.request)));});
