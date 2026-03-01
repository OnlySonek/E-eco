// Disable console logs in production
(function() {
    // Override console methods
    console.log = function() {};
    console.info = function() {};
    console.warn = function() {};
    // Keep console.error for debugging critical issues
    // console.error = function() {};
})();
