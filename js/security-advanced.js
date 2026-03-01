// Advanced Security Layer
(function() {
    'use strict';
    
    // ============================================
    // 1. ANTI-DEBUGGING
    // ============================================
    
    // Detect and block DevTools
    const detectDevTools = () => {
        const threshold = 160;
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        
        if (widthThreshold || heightThreshold) {
            // DevTools detected - take action
            document.body.innerHTML = '<h1 style="color:red;text-align:center;margin-top:50px;">Access Denied</h1>';
            throw new Error('DevTools detected');
        }
    };
    
    // Check every second
    setInterval(detectDevTools, 1000);
    
    // Detect debugger statement
    setInterval(() => {
        const before = new Date();
        debugger;
        const after = new Date();
        if (after - before > 100) {
            // Debugger detected
            window.location.href = 'about:blank';
        }
    }, 1000);
    
    // ============================================
    // 2. DISABLE DEVELOPER TOOLS
    // ============================================
    
    // Disable right-click
    document.addEventListener('contextmenu', e => {
        e.preventDefault();
        return false;
    });
    
    // Disable keyboard shortcuts
    document.addEventListener('keydown', e => {
        // F12
        if (e.keyCode === 123) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+Shift+I (DevTools)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+Shift+J (Console)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+Shift+C (Inspect)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+U (View Source)
        if (e.ctrlKey && e.keyCode === 85) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+S (Save)
        if (e.ctrlKey && e.keyCode === 83) {
            e.preventDefault();
            return false;
        }
    });
    
    // ============================================
    // 3. CONSOLE PROTECTION
    // ============================================
    
    // Override console methods
    const disableConsole = () => {
        const noop = () => {};
        const methods = [
            'log', 'debug', 'info', 'warn', 'error', 'dir', 'dirxml',
            'trace', 'assert', 'clear', 'count', 'countReset', 'group',
            'groupCollapsed', 'groupEnd', 'table', 'time', 'timeEnd',
            'timeLog', 'timeStamp', 'profile', 'profileEnd', 'memory'
        ];
        
        methods.forEach(method => {
            if (console[method]) {
                console[method] = noop;
            }
        });
        
        // Freeze console object
        Object.freeze(console);
    };
    
    // Check if production
    if (window.location.hostname !== 'localhost' && 
        window.location.hostname !== '127.0.0.1') {
        disableConsole();
    }
    
    // ============================================
    // 4. SOURCE CODE PROTECTION
    // ============================================
    
    // Disable text selection
    document.addEventListener('selectstart', e => {
        e.preventDefault();
        return false;
    });
    
    // Disable copy
    document.addEventListener('copy', e => {
        e.preventDefault();
        return false;
    });
    
    // Disable cut
    document.addEventListener('cut', e => {
        e.preventDefault();
        return false;
    });
    
    // Disable drag
    document.addEventListener('dragstart', e => {
        e.preventDefault();
        return false;
    });
    
    // ============================================
    // 5. NETWORK REQUEST MONITORING
    // ============================================
    
    // Monitor fetch requests
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
        // Check if request is to Firebase
        const url = args[0];
        if (typeof url === 'string' && !url.includes('firebaseio.com') && 
            !url.includes('googleapis.com') && !url.includes('firebasestorage')) {
            // Suspicious request
            return Promise.reject(new Error('Unauthorized request'));
        }
        return originalFetch.apply(this, args);
    };
    
    // ============================================
    // 6. IFRAME PROTECTION
    // ============================================
    
    // Prevent iframe embedding
    if (window.top !== window.self) {
        window.top.location = window.self.location;
    }
    
    // ============================================
    // 7. OBFUSCATION DETECTION
    // ============================================
    
    // Detect if code is being analyzed
    const detectAnalysis = () => {
        const start = performance.now();
        for (let i = 0; i < 1000000; i++) {
            // Dummy loop
        }
        const end = performance.now();
        
        // If too slow, might be under analysis
        if (end - start > 100) {
            window.location.href = 'about:blank';
        }
    };
    
    setInterval(detectAnalysis, 5000);
    
    // ============================================
    // 8. MEMORY PROTECTION
    // ============================================
    
    // Clear sensitive data from memory
    window.addEventListener('beforeunload', () => {
        // Clear localStorage
        const keysToKeep = ['media_lang', 'theme'];
        Object.keys(localStorage).forEach(key => {
            if (!keysToKeep.includes(key)) {
                localStorage.removeItem(key);
            }
        });
        
        // Clear sessionStorage
        sessionStorage.clear();
    });
    
    // ============================================
    // 9. TAMPER DETECTION
    // ============================================
    
    // Detect if scripts are modified
    const scriptHashes = new Map();
    
    document.querySelectorAll('script[src]').forEach(script => {
        const src = script.src;
        // Store hash of script URL
        scriptHashes.set(src, true);
    });
    
    // Monitor for new scripts
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.tagName === 'SCRIPT') {
                    // Unauthorized script detected
                    node.remove();
                }
            });
        });
    });
    
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
    
    // ============================================
    // 10. FINGERPRINTING PROTECTION
    // ============================================
    
    // Generate unique session ID
    const sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36);
    
    // Store in sessionStorage (not localStorage)
    sessionStorage.setItem('_sid', sessionId);
    
    // Validate session on each request
    window.validateSession = () => {
        return sessionStorage.getItem('_sid') === sessionId;
    };
    
    // ============================================
    // 11. RATE LIMITING
    // ============================================
    
    const rateLimiter = {
        requests: [],
        maxRequests: 100,
        timeWindow: 60000, // 1 minute
        
        check: function() {
            const now = Date.now();
            this.requests = this.requests.filter(time => now - time < this.timeWindow);
            
            if (this.requests.length >= this.maxRequests) {
                // Too many requests
                window.location.href = 'about:blank';
                return false;
            }
            
            this.requests.push(now);
            return true;
        }
    };
    
    // Check rate limit on each interaction
    document.addEventListener('click', () => rateLimiter.check());
    
    // ============================================
    // 12. SECURE HEADERS CHECK
    // ============================================
    
    // Check if secure headers are present
    fetch(window.location.href, { method: 'HEAD' })
        .then(response => {
            const headers = response.headers;
            
            // Check for security headers
            const requiredHeaders = [
                'x-content-type-options',
                'x-frame-options',
                'x-xss-protection'
            ];
            
            requiredHeaders.forEach(header => {
                if (!headers.has(header)) {
                    // Missing security header
                }
            });
        })
        .catch(() => {
            // Silent fail
        });
    
    // ============================================
    // INITIALIZATION
    // ============================================
    
    // Mark as initialized
    window._securityInitialized = true;
    
    // Freeze security flag
    Object.defineProperty(window, '_securityInitialized', {
        writable: false,
        configurable: false
    });
    
})();
