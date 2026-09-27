const C='gas-v5';
const FILES=['./','./index.html','./manifest.json','./galaxy.html','./tictactoe.html','./watersort.html','./blockpuzzle.html','./ludo.html','./crazyknife.html','./airhockey.html','./carrom.html','./archery.html','./chorpolice.html','./8ballpool.html','./chess.html','./impossible.html'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  if(new URL(e.request.url).origin===location.origin){
    e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request)));
  }
});
