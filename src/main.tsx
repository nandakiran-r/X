import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
        
        // Register for background sync if available
        if ('sync' in registration) {
          // Set up periodic sync for data updates
          document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
              // Register for background sync when app is hidden
              registration.sync.register('sync-period-data')
                .catch(err => console.log('Background sync failed:', err));
            }
          });
        }
      })
      .catch(error => {
        console.error('ServiceWorker registration failed: ', error);
      });
  });
}

createRoot(document.getElementById("root")!).render(<App />);