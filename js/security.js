// Security Protection Script
(function() {
    'use strict';

    // 1. Disable Right Click
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });

    // 2. Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    document.addEventListener('keydown', function(e) {
        // F12
        if (e.keyCode === 123) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+Shift+I (Inspect)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+Shift+J (Console)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+Shift+C (Inspect Element)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+U (View Source)
        if (e.ctrlKey && e.keyCode === 85) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+S (Save Page)
        if (e.ctrlKey && e.keyCode === 83) {
            e.preventDefault();
            return false;
        }
    });

    // 3. Detect DevTools Opening
    let devtoolsOpen = false;
    const threshold = 160;

    const detectDevTools = () => {
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        
        if (widthThreshold || heightThreshold) {
            if (!devtoolsOpen) {
                devtoolsOpen = true;
                handleDevToolsOpen();
            }
        } else {
            devtoolsOpen = false;
        }
    };

    // 4. Handle DevTools Detection
    function handleDevToolsOpen() {
        // Option 1: Redirect to blank page
        // window.location.href = 'about:blank';
        
        // Option 2: Reload page continuously
        // setInterval(() => { window.location.reload(); }, 100);
        
        // Option 3: Debugger trap (most effective)
        setInterval(() => {
            debugger;
        }, 100);
        
        // Option 4: Clear page content
        // document.body.innerHTML = '';
    }

    // 5. Check for DevTools every 500ms
    setInterval(detectDevTools, 500);

    // 6. Disable text selection
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
    });

    // 7. Disable copy
    document.addEventListener('copy', function(e) {
        e.preventDefault();
        return false;
    });

    // 8. Disable cut
    document.addEventListener('cut', function(e) {
        e.preventDefault();
        return false;
    });

    // 9. Disable drag
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });

    // 10. Console protection
    console.log = function() {};
    console.info = function() {};
    console.warn = function() {};
    console.error = function() {};
    console.debug = function() {};
    console.clear = function() {};

    // 11. Detect console.log override attempts
    Object.defineProperty(console, 'log', {
        get: function() {
            return function() {};
        },
        set: function() {}
    });

    // 12. Anti-debugging
    (function() {
        function detectDebugger() {
            const start = new Date();
            debugger;
            const end = new Date();
            if (end - start > 100) {
                handleDevToolsOpen();
            }
        }
        setInterval(detectDebugger, 1000);
    })();

    // 13. Disable iframe embedding (Clickjacking protection)
    if (window.top !== window.self) {
        window.top.location = window.self.location;
    }

    // 14. Clear console on load
    if (window.console && window.console.clear) {
        window.console.clear();
    }

})();
