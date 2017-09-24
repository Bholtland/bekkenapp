var CACHE_NAME = "my-cache";
var cachedFiles = [
  '/',
  '/css/style.css',
  '/css/style.css.map',
  '/index.html',
  '/js/jquery-3.2.1.min.js',
  '/script-jquery.js',
  '/script.js',
  '/resources/img/arrow-left.svg',
  '/resources/img/background-main.png',
  '/resources/img/caret-left.svg',
  '/resources/img/caret-right-dark.svg',
  '/resources/img/caret-right-light.svg',
  '/resources/img/check-light.svg',
  '/resources/img/clock-dark.svg',
  '/resources/img/clock-light.svg',
  '/resources/img/edit-light.svg',
  '/resources/img/explanationvideo.jpg',
  '/resources/img/info-dark.svg',
  '/resources/img/list.svg',
  '/resources/img/music1.jpg',
  '/resources/img/scheme.svg',
  '/resources/img/settings.svg',
  '/resources/img/stats.svg',
  '/resources/img/user.svg',
  '/resources/img/sw-register.js',
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

