/* ===== Tears of Metal Guide - Service Worker ===== */
var CACHE_NAME = "tm-guide-v3.1";
var ASSETS = [
  "index.html",
  "getting-started.html",
  "combat.html",
  "towers.html",
  "economy.html",
  "maps.html",
  "codex.html",
  "bosses.html",
  "faq.html",
  "about.html",
  "changelog.html",
  "css/style.css",
  "js/common.js",
  "manifest.json"
];

self.addEventListener("install", function(e){
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){
      return cache.addAll(ASSETS);
    }).then(function(){
      return self.skipWaiting();
    })
  );
});

self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(
        keys.filter(function(k){ return k !== CACHE_NAME; })
            .map(function(k){ return caches.delete(k); })
      );
    }).then(function(){
      return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", function(e){
  if(e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(function(cached){
      if(cached) return cached;
      return fetch(e.request).then(function(response){
        var url = new URL(e.request.url);
        if(url.origin === self.location.origin){
          var respClone = response.clone();
          caches.open(CACHE_NAME).then(function(cache){
            cache.put(e.request, respClone);
          });
        }
        return response;
      }).catch(function(){
        if(e.request.mode === "navigate"){
          return caches.match("index.html");
        }
      });
    })
  );
});
