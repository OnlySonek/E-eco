// Home Page Module - Firestore Integration with Lazy Loading
import { collection, getDocs, limit, query } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';
import { db, setupAuthObserver } from './firebase-init.js';
import { updateCartCounter } from './main.js';
import { showToast } from './utils.js';
import { getProductImage } from './product-images.js';

let products = [];
let currentSlide = 0;
const totalSlides = 3;

// Fetch featured products from Firestore
async function fetchFeaturedProducts() {
    try {
        const q = query(collection(db, 'products'), limit(8));
        const querySnapshot = await getDocs(q);
        products = [];
        
        querySnapshot.forEach((doc) => {
            products.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        return products;
    } catch (error) {
        showToast('Failed to load products', 'error');
        throw error;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    try {
        console.log('🏠 Initializing home page...');
        
        // Initialize animations if available
        if (typeof window.initAnimations === 'function') {
            window.initAnimations();
        }
        
        setupAuthObserver();
        updateCartCounter();
        
        // Show loading state
        const container = document.getElementById('featuredProducts');
        if (container) {
            container.innerHTML = '<div class="col-span-full text-center py-12"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div><p class="mt-4 text-gray-400">Loading products...</p></div>';
        }
        
        // Fetch and render featured products
        await fetchFeaturedProducts();
        renderFeaturedProducts();
        
        // Setup product hover animations after rendering
        setTimeout(() => {
            if (typeof window.setupProductHoverAnimations === 'function') {
                window.setupProductHoverAnimations();
            }
            if (typeof window.animateProducts === 'function') {
                window.animateProducts();
            }
        }, 100);
        
        startCarousel();
        console.log('✅ Home page initialized successfully');
    } catch (error) {
        console.error('❌ Initialization error:', error);
        const container = document.getElementById('featuredProducts');
        if (container) {
            container.innerHTML = '<div class="col-span-full text-center py-12 text-red-400">⚠️ Failed to load products. Please refresh the page.</div>';
        }
    }
});

// Render featured products with lazy loading
function renderFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;
    
    const featured = products.slice(0, 8);
    
    if (featured.length === 0) {
        container.innerHTML = '<div class="col-span-full text-center py-12 text-gray-400">No products available</div>';
        return;
    }
    
    container.innerHTML = featured.map((product, index) => {
        const imageUrl = getProductImage(product.category.toLowerCase(), index);
        return `
            <div class="product-card cursor-pointer" onclick="window.location.href='product-details.html?id=${product.id}'">
                <div class="product-image-wrapper">
                    <div class="product-image-placeholder">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                    </div>
                    <img 
                        data-src="${imageUrl}" 
                        alt="${product.name}" 
                        class="lazy-loading"
                        onerror="this.src='https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=800'"
                    >
                </div>
                <div class="product-card-content">
                    <h3 class="text-lg font-semibold mb-2">${product.name}</h3>
                    <div class="price text-xl font-bold text-blue-400 mb-3">${product.price.toLocaleString()}</div>
                    <button onclick="event.stopPropagation(); addToCartFromHome('${product.id}')" class="w-full mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition font-medium" data-i18n="products.addtocart">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
    }).join('');
    
    // Initialize lazy loading
    initLazyLoading();
    
    console.log(`✅ Rendered ${featured.length} products with lazy loading`);
}

// Lazy Loading Implementation
function initLazyLoading() {
    const images = document.querySelectorAll('img.lazy-loading');
    
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
            rootMargin: '50px' // Start loading 50px before image enters viewport
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => loadImage(img));
    }
}

function loadImage(img) {
    const src = img.getAttribute('data-src');
    if (!src) return;
    
    // Create a new image to preload
    const tempImg = new Image();
    
    tempImg.onload = function() {
        img.src = src;
        img.classList.remove('lazy-loading');
        img.classList.add('lazy-loaded');
        
        // Hide placeholder
        const placeholder = img.previousElementSibling;
        if (placeholder && placeholder.classList.contains('product-image-placeholder')) {
            placeholder.style.opacity = '0';
            setTimeout(() => {
                placeholder.style.display = 'none';
            }, 500);
        }
    };
    
    tempImg.onerror = function() {
        // Fallback image on error
        img.src = 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=800';
        img.classList.remove('lazy-loading');
        img.classList.add('lazy-loaded');
        
        const placeholder = img.previousElementSibling;
        if (placeholder && placeholder.classList.contains('product-image-placeholder')) {
            placeholder.style.display = 'none';
        }
    };
    
    tempImg.src = src;
}

// Carousel functions
function startCarousel() {
    setInterval(() => {
        nextSlide();
    }, 5000);
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function updateCarousel() {
    const carousel = document.getElementById('heroCarousel');
    if (carousel) {
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    // Update dots
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Go to specific slide
window.goToSlide = function(index) {
    currentSlide = index;
    updateCarousel();
};

// Add to cart from home page
window.addToCartFromHome = function(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        showToast('Product not found', 'error');
        return;
    }
    
    try {
        // Get existing cart
        let cart = JSON.parse(localStorage.getItem('media_cart')) || [];
        
        // Check if product already in cart
        const existingIndex = cart.findIndex(item => item.id === productId);
        
        if (existingIndex > -1) {
            // Increase quantity
            cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
            showToast(`Increased ${product.name} quantity`, 'success');
        } else {
            // Add new product
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                category: product.category,
                quantity: 1
            });
            showToast(`✅ Added ${product.name} to cart!`, 'success');
        }
        
        // Save to localStorage
        localStorage.setItem('media_cart', JSON.stringify(cart));
        
        // Update cart counter
        updateCartCounter();
        
        console.log('🛒 Cart updated:', cart);
    } catch (error) {
        console.error('❌ Error adding to cart:', error);
        showToast('Failed to add to cart', 'error');
    }
};

// Make functions global
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
