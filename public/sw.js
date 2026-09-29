/**
 * Service Worker Resiliente do Codex Culinarius
 * Guarda em cache a estrutura da aplicação, páginas e recursos estáticos
 */

const CACHE_NAME = 'codex-culinarius-v1';
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.svg',
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  '/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('Pre-cache parcial durante install do Service Worker:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Ignora requisições não-GET ou extensões do navegador
  if (request.method !== 'GET' || !request.url.startsWith('http')) {
    return;
  }

  // Ignora chamadas de APIs externas dinâmicas para não bloquear
  if (
    request.url.includes('themealdb.com') ||
    request.url.includes('dummyjson.com') ||
    request.url.includes('openfoodfacts.org') ||
    request.url.includes('fruityvice.com') ||
    request.url.includes('noembed.com') ||
    request.url.includes('youtube')
  ) {
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        // Atualiza a cache em segundo plano (Stale-While-Revalidate)
        fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, networkResponse);
              });
            }
          })
          .catch(() => {});
        return cachedResponse;
      }

      return fetch(request)
        .then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }

          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });

          return networkResponse;
        })
        .catch(() => {
          // Se for navegação HTML e estiver offline, devolve a página principal em cache
          if (request.mode === 'navigate') {
            return caches.match('/');
          }
        });
    })
  );
});
