const C='gas-v8-hub-repair';
const FILES=["./", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png", "./8ballpool.html", "./Index.html", "./about.html", "./airhockey.html", "./archery.html", "./blockpuzzle.html", "./carrom.html", "./chess.html", "./chorpolice.html", "./crazyknife.html", "./galaxy.html", "./impossible.html", "./ludo.html", "./privacy.html", "./snake.html", "./stack.html", "./tictactoe.html", "./watersort.html"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  if(new URL(e.request.url).origin===location.origin){
    e.respondWith(fetch(e.request).then(r=>{if(r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));}return r}).catch(()=>caches.match(e.request)));
  }
});
