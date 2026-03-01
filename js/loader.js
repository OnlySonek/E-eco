// Encrypted Code Loader
// This loader will decrypt and execute code at runtime
(function() {
    'use strict';
    
    // Simple XOR encryption/decryption
    const key = 'M3d1aS3cur3K3y2024';
    
    function xorEncrypt(str) {
        let result = '';
        for (let i = 0; i < str.length; i++) {
            result += String.fromCharCode(str.charCodeAt(i) ^ key.charCodeAt(i % key.length));
        }
        return btoa(result);
    }
    
    function xorDecrypt(encrypted) {
        const str = atob(encrypted);
        let result = '';
        for (let i = 0; i < str.length; i++) {
            result += String.fromCharCode(str.charCodeAt(i) ^ key.charCodeAt(i % key.length));
        }
        return result;
    }
    
    // Load and execute encrypted module
    window.loadSecureModule = async function(moduleName) {
        try {
            const response = await fetch(`js/secure/${moduleName}.enc`);
            const encrypted = await response.text();
            const code = xorDecrypt(encrypted);
            
            // Execute in isolated scope
            const script = document.createElement('script');
            script.type = 'module';
            script.textContent = code;
            document.head.appendChild(script);
            
            return true;
        } catch (error) {
            console.error('Module load failed');
            return false;
        }
    };
    
    // Anti-debugging
    setInterval(() => {
        const start = performance.now();
        debugger;
        const end = performance.now();
        if (end - start > 100) {
            document.body.innerHTML = '';
            window.location.href = 'about:blank';
        }
    }, 1000);
    
    // Detect DevTools
    const element = new Image();
    Object.defineProperty(element, 'id', {
        get: function() {
            document.body.innerHTML = '';
            window.location.href = 'about:blank';
        }
    });
    
    setInterval(() => {
        console.log(element);
        console.clear();
    }, 1000);
    
})();
