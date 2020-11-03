self.addEventListener('install', function (event) {
  console.log('SW Installed');
  event.waitUntil(
      caches.open('static')
          .then(function (cache) {
              cache.addAll([
                './index.html', 
                './styles.css',
                './app.js',
                './about.html',
                './tentang.html',
                'https://newsapi.org/v2/top-headlines?country=id&apiKey=bebcf14cc496450bbbd17dd3d8730346',
                'https://newsapi.org/v2/top-headlines?country=us&apiKey=bebcf14cc496450bbbd17dd3d8730346',
                'https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
                'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
                '/images/icon/circular-arrow-clock-128x128.png',
                '/images/sorry.png',
              ]);
          })
  );
});

self.addEventListener('activate', function () {
  console.log('SW activated');
});
self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  var dataUrl = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=bebcf14cc496450bbbd17dd3d8730346';
  if (e.request.url.indexOf(dataUrl) > -1) {
    /*
     * When the request URL contains dataUrl, the app is asking for fresh
     * weather data. In this case, the service worker always goes to the
     * network and then caches the response. This is called the "Cache then
     * network" strategy:
     */
    e.respondWith(
      caches.open(dataCacheName).then(function(cache) {
        return fetch(e.request).then(function(response){
          cache.put(e.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    /*
     * The app is asking for app shell files. In this scenario the app uses the
     * "Cache, falling back to the network" offline strategy:
     */
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }
});
