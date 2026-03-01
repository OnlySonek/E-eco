// Secure Firebase Initialization
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js';

// Security checks
const securityCheck = () => {
    // Check if running in production
    const isProd = window.location.hostname !== 'localhost' && 
                   window.location.hostname !== '127.0.0.1';
    
    if (isProd) {
        // Disable console in production
        const noop = () => {};
        ['log', 'debug', 'info', 'warn', 'error', 'dir', 'trace', 'assert', 'clear', 
         'count', 'countReset', 'group', 'groupCollapsed', 'groupEnd', 'table', 
         'time', 'timeEnd', 'timeLog', 'profile', 'profileEnd'].forEach(method => {
            console[method] = noop;
        });
        
        // Disable debugger
        setInterval(() => {
            (function() {
                return false;
            })['constructor']('debugger')['call']();
        }, 50);
    }
    
    return true;
};

// Initialize only if security check passes
let app, auth, db, storage;

if (securityCheck() && window._fbConfig) {
    try {
        app = initializeApp(window._fbConfig);
        auth = getAuth(app);
        db = getFirestore(app);
        storage = getStorage(app);
        
        // Clear config from memory
        delete window._fbConfig;
    } catch (error) {
        // Silent fail
    }
}

// Export with protection
export { auth, db, storage };

// Setup auth observer with protection
export function setupAuthObserver() {
    // Implementation here
}
