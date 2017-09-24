var CACHE_NAME = "my-cache";
var cachedFiles = [
  '/bekkenapp/',
  '/bekkenapp/css/style.css',
  '/bekkenapp/css/style.css.map',
  '/bekkenapp/index.html',
  '/bekkenapp/js/jquery-3.2.1.min.js',
  '/bekkenapp/js/script-jquery.js',
  '/bekkenapp/js/script.js',
  '/bekkenapp/resources/img/arrow-left.svg',
  '/bekkenapp/resources/img/background-main.png',
  '/bekkenapp/resources/img/caret-left.svg',
  '/bekkenapp/resources/img/caret-right-dark.svg',
  '/bekkenapp/resources/img/caret-right-light.svg',
  '/bekkenapp/resources/img/check-light.svg',
  '/bekkenapp/resources/img/clock-dark.svg',
  '/bekkenapp/resources/img/clock-light.svg',
  '/bekkenapp/resources/img/edit-light.svg',
  '/bekkenapp/resources/img/explanationvideo.jpg',
  '/bekkenapp/resources/img/info-dark.svg',
  '/bekkenapp/resources/img/list.svg',
  '/bekkenapp/resources/img/music1.jpg',
  '/bekkenapp/resources/img/scheme.svg',
  '/bekkenapp/resources/img/settings.svg',
  '/bekkenapp/resources/img/stats.svg',
  '/bekkenapp/resources/img/user.svg',
  '/bekkenapp/resources/audio/10x20-1.ogg',
  '/bekkenapp/resources/audio/10x20-2.ogg',
  '/bekkenapp/resources/audio/10x20-3.ogg',
  '/bekkenapp/resources/audio/music1.ogg',
  '/bekkenapp/sw-register.js',
]

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then(function(cache) {
				console.log('opened cache')
				return cache.addAll(cachedFiles);
			})
	); 
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', function(event) {

  var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

