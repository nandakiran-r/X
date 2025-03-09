// Service Worker for HerSakhi PWA
const CACHE_NAME = 'hersakhi-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/offline.html',
  '/src/main.tsx',
  '/manifest.json',
  '/android-icon-36x36.png',
  '/android-icon-48x48.png',
  '/android-icon-72x72.png',
  '/android-icon-96x96.png',
  '/android-icon-144x144.png',
  '/android-icon-192x192.png',
  '/icon-512x512.png',
  '/images/bg.webp',
  '/images/bg2.jpeg',
  '/images/bg3.jpg',
  // Add other static assets your app needs
];

// Install event - cache the assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache opened');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached response if found
        if (response) {
          return response;
        }

        // Clone the request
        const fetchRequest = event.request.clone();

        // Try network request
        return fetch(fetchRequest)
          .then((response) => {
            // Check if response is valid
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Add to cache
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // If fetch fails (offline), return the offline page for navigation requests
            if (event.request.destination === 'document') {
              return caches.match('/offline.html');
            }
          });
      })
  );
});

// Handle background sync for period tracking data
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-period-data') {
    event.waitUntil(syncPeriodData());
  }
});

// Function to sync period data when back online
function syncPeriodData() {
  // Get pending data from localStorage
  return new Promise((resolve) => {
    // Get data from localStorage
    const pendingData = localStorage.getItem('sakhi-pending-sync');
    
    if (pendingData) {
      // In a real app, you would send this data to your server
      console.log('Syncing period data in background');
      
      // After successful sync
      localStorage.removeItem('sakhi-pending-sync');
    }
    
    resolve();
  });
}