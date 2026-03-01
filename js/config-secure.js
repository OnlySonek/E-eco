// Secure Firebase Configuration with Advanced Obfuscation
(function() {
    'use strict';
    
    // Anti-debugging techniques
    const antiDebug = () => {
        // Detect DevTools
        const devtools = /./;
        devtools.toString = function() {
            this.opened = true;
        };
        
        // Check if DevTools is open
        const checkDevTools = () => {
            if (devtools.opened) {
                // Redirect or block
                window.location.href = 'about:blank';
            }
        };
        
        setInterval(checkDevTools, 1000);
        
        // Disable right-click
        document.addEventListener('contextmenu', e => e.preventDefault());
        
        // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
        document.addEventListener('keydown', e => {
            if (e.keyCode === 123 || // F12
                (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
                (e.ctrlKey && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J
                (e.ctrlKey && e.keyCode === 85)) { // Ctrl+U
                e.preventDefault();
                return false;
            }
        });
    };
    
    // Obfuscated config parts (split and encoded)
    const _0x1a2b = ['QUl6YVN5Q2lEUF8tTlF0Rllr', 'Z21CakpNMnB2WGQzRW9QanF0VDlKNA=='];
    const _0x3c4d = ['ZS1jb21tZXJjZS1zdG9yZS0zOTY2NS5maXJlYmFzZWFwcC5jb20='];
    const _0x5e6f = ['ZS1jb21tZXJjZS1zdG9yZS0zOTY2NQ=='];
    const _0x7g8h = ['ZS1jb21tZXJjZS1zdG9yZS0zOTY2NS5maXJlYmFzZXN0b3JhZ2UuYXBw'];
    const _0x9i0j = ['Mjk1NzIxODYzOTk3'];
    const _0xak1l = ['MToyOTU3MjE4NjM5OTc6d2ViOmE3NWNiNTQwZWJhOGRlOTIxOWQzNTQ='];
    const _0xbm2n = ['Ry1aMFRTRzZaWEJL'];
    
    // Decoding function with additional obfuscation
    const _d = (s) => {
        try {
            return atob(s);
        } catch(e) {
            return '';
        }
    };
    
    // Build config dynamically
    const _buildConfig = () => {
        const parts = {
            a: _d(_0x1a2b[0]) + _d(_0x1a2b[1]),
            b: _d(_0x3c4d[0]),
            c: _d(_0x5e6f[0]),
            d: _d(_0x7g8h[0]),
            e: _d(_0x9i0j[0]),
            f: _d(_0xak1l[0]),
            g: _d(_0xbm2n[0])
        };
        
        return {
            apiKey: parts.a,
            authDomain: parts.b,
            projectId: parts.c,
            storageBucket: parts.d,
            messagingSenderId: parts.e,
            appId: parts.f,
            measurementId: parts.g
        };
    };
    
    // Freeze and seal the config
    const config = Object.freeze(_buildConfig());
    
    // Export with getter only (no setter)
    Object.defineProperty(window, '_fbConfig', {
        get: function() {
            // Additional check before returning
            if (typeof window.chrome !== 'undefined' && window.chrome.runtime) {
                // Possible extension detected
                return null;
            }
            return config;
        },
        set: function() {
            // Prevent modification
            return false;
        },
        configurable: false,
        enumerable: false
    });
    
    // Initialize anti-debugging
    antiDebug();
    
    // Clear traces
    _0x1a2b.length = 0;
    _0x3c4d.length = 0;
    _0x5e6f.length = 0;
    _0x7g8h.length = 0;
    _0x9i0j.length = 0;
    _0xak1l.length = 0;
    _0xbm2n.length = 0;
    
})();
