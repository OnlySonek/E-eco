// 🖼️ Lazy Loading Utility Module
// Handles lazy loading for all product images with placeholder

/**
 * Initialize lazy loading for all images with class 'lazy-loading'
 * Uses IntersectionObserver for modern browsers, falls back to immediate loading
 */
export function initLazyLoading() {
    const images = document.querySelectorAll('img.lazy-loading');
    
    if (images.length === 0) {
        console.log('📸 No images to lazy load');
        return;
    }
    
    if ('IntersectionObserver' in window) {
        // Modern browsers - use IntersectionObserver
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    loadImage(img);
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '100px', // Start loading 100px before image enters viewport
            threshold: 0.01
        });
        
        images.forEach(img => imageObserver.observe(img));
        console.log(`📸 Lazy loading initialized for ${images.length} images`);
    } else {
        // Fallback for older browsers - load all images immediately
        console.log('📸 IntersectionObserver not supported, loading all images');
        images.forEach(img => loadImage(img));
    }
}

/**
 * Load a single image
 * @param {HTMLImageElement} img - The image element to load
 */
function loadImage(img) {
    const src = img.getAttribute('data-src');
    if (!src) {
        console.warn('⚠️ Image has no data-src attribute', img);
        return;
    }
    
    // Create a new image to preload
    const tempImg = new Image();
    
    tempImg.onload = function() {
        // Image loaded successfully
        img.src = src;
        img.classList.remove('lazy-loading');
        img.classList.add('lazy-loaded');
        
        // Hide placeholder with fade effect
        hidePlaceholder(img);
        
        console.log('✅ Image loaded:', src.substring(0, 50) + '...');
    };
    
    tempImg.onerror = function() {
        // Image failed to load - use fallback
        console.error('❌ Failed to load image:', src);
        img.src = 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=800';
        img.classList.remove('lazy-loading');
        img.classList.add('lazy-loaded');
        
        hidePlaceholder(img);
    };
    
    // Start loading
    tempImg.src = src;
}

/**
 * Hide the placeholder with fade effect
 * @param {HTMLImageElement} img - The image element
 */
function hidePlaceholder(img) {
    const placeholder = img.previousElementSibling;
    if (placeholder && placeholder.classList.contains('product-image-placeholder')) {
        placeholder.style.opacity = '0';
        placeholder.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            placeholder.style.display = 'none';
        }, 500);
    }
}

/**
 * Create HTML for product image with placeholder
 * @param {string} imageUrl - The image URL
 * @param {string} altText - Alt text for the image
 * @param {string} customClass - Optional custom class
 * @returns {string} HTML string
 */
export function createLazyImage(imageUrl, altText, customClass = '') {
    return `
        <div class="product-image-wrapper ${customClass}">
            <div class="product-image-placeholder">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
            </div>
            <img 
                data-src="${imageUrl}" 
                alt="${altText}" 
                class="lazy-loading"
                onerror="this.src='https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=800'"
            >
        </div>
    `;
}

// Make functions available globally for non-module scripts
if (typeof window !== 'undefined') {
    window.initLazyLoading = initLazyLoading;
    window.createLazyImage = createLazyImage;
}
