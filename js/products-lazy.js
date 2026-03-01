// Products Page Module with Lazy Loading
import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';
import { db, setupAuthObserver } from './firebase-init.js';
import { showToast, getUrlParameter } from './utils.js';
import { getProductImage } from './product-images.js';
import { updateCartCounter } from './main.js';

let products = [];
let currentCategory = 'all';
let searchTerm = '';

const categories = {
    all: 'All Products',
    laptop: 'Laptops',
    monitor: 'Monitors',
    mouse: 'Mice',
    keyboard: 'Keyboards',
    case: 'PC Cases'
};

// Fetch products from Firestore
async function fetchProducts() {
    try {
        console.log('📦 Fetching products from Firestore...');
        const querySnapshot = await getDocs(collection(db, 'products'));
        products = [];
        
        querySnapshot.forEach((doc) => {
            products.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        console.log(`✅ Loaded ${products.length} products from Firestore`);
        return products;
    } catch (error) {
        console.error('❌ Error fetching products:', error);
        throw error;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    try {
        console.log('🛍️ Products page initializing...');
        
        const container = document.getElementById('productsGrid');
        if (container) {
            container.innerHTML = '<div class="col-span-full text-center py-12"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div><p class="text-gray-400">Loading products...</p></div>';
        }
        
        setupAuthObserver();
        updateCartCounter();
        
        await fetchProducts();
        
        // Get parameters from URL
        const urlCategory = getUrlParameter('category');
        if (urlCategory) {
            currentCategory = urlCategory;
            updateActiveFilter(urlCategory);
            window.history.replaceState({}, '', 'products.html');
        }
        
        const urlSearch = getUrlParameter('search');
        if (urlSearch) {
            searchTerm = urlSearch.toLowerCase();
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.value = urlSearch;
            }
            window.history.replaceState({}, '', 'products.html');
        }
        
        renderProducts();
        setupEventListeners();
        updateProductCount();
        
        console.log('✅ Products page ready');
        
    } catch (error) {
        console.error('❌ Initialization error:', error);
        const container = document.getElementById('productsGrid');
        if (container) {
            container.innerHTML = '<div class="col-span-full text-center py-12"><div class="text-2xl text-red-400">⚠️ Error loading products. Please refresh the page.</div></div>';
        }
    }
});

// Setup event listeners
function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchTerm = e.target.value.toLowerCase();
            renderProducts();
            window.history.replaceState({}, '', 'products.html');
            console.log(`🔍 Search: "${searchTerm}" - ${filterProducts().length} results`);
        });
    }
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            currentCategory = btn.dataset.category;
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProducts();
            window.history.replaceState({}, '', 'products.html');
            console.log(`📂 Filter: ${categories[currentCategory]} - ${filterProducts().length} products`);
        });
    });
}

// Update active filter button
function updateActiveFilter(category) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Filter products
function filterProducts() {
    let filtered = products;
    
    if (currentCategory !== 'all') {
        filtered = filtered.filter(p => p.category.toLowerCase() === currentCategory.toLowerCase());
    }
    
    if (searchTerm) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(searchTerm) ||
            p.category.toLowerCase().includes(searchTerm) ||
            (p.description && p.description.toLowerCase().includes(searchTerm))
        );
    }
    
    return filtered;
}

// Render products with lazy loading
function renderProducts() {
    const container = document.getElementById('productsGrid');
    const noResults = document.getElementById('noResults');
    
    if (!container) return;
    
    const filtered = filterProducts();
    
    if (filtered.length === 0) {
        container.innerHTML = '';
        if (noResults) {
            noResults.classList.remove('hidden');
            noResults.innerHTML = `
                <p class="text-2xl text-gray-400 mb-4">No products found</p>
                <p class="text-gray-500 mb-6">Try adjusting your search or filter</p>
                <button onclick="resetFilters()" class="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition">
                    Reset Filters
                </button>
            `;
        }
        return;
    }
    
    if (noResults) {
        noResults.classList.add('hidden');
    }
    
    // Group products by category for proper image indexing
    const categoryProducts = {};
    products.forEach(p => {
        const cat = p.category.toLowerCase();
        if (!categoryProducts[cat]) {
            categoryProducts[cat] = [];
        }
        categoryProducts[cat].push(p);
    });
    
    // Render with lazy loading
    container.innerHTML = filtered.map(product => {
        const cat = product.category.toLowerCase();
        const categoryIndex = categoryProducts[cat].indexOf(product);
        const imageUrl = getProductImage(cat, categoryIndex);
        
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
                <p class="text-gray-400 text-sm mb-2">${getCategoryName(product.category)}</p>
                <div class="price text-xl font-bold text-blue-400 mb-3">${product.price.toLocaleString()}</div>
                <button onclick="event.stopPropagation(); handleAddToCart('${product.id}')" 
                    class="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition font-medium">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
    }).join('');
    
    // Initialize lazy loading
    initLazyLoading();
    
    updateProductCount();
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
            rootMargin: '100px' // Start loading 100px before image enters viewport
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
        
        // Hide placeholder with fade effect
        const placeholder = img.previousElementSibling;
        if (placeholder && placeholder.classList.contains('product-image-placeholder')) {
            placeholder.style.opacity = '0';
            placeholder.style.transition = 'opacity 0.5s ease';
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

// Get category display name
function getCategoryName(category) {
    return categories[category.toLowerCase()] || category;
}

// Update product count
function updateProductCount() {
    const filtered = filterProducts();
    const countDisplay = document.getElementById('productCount');
    if (countDisplay) {
        countDisplay.textContent = `Showing ${filtered.length} of ${products.length} products`;
    }
}

// Reset filters
window.resetFilters = function() {
    currentCategory = 'all';
    searchTerm = '';
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        if (btn.dataset.category === 'all') {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    window.history.replaceState({}, '', 'products.html');
    renderProducts();
};

// Add to cart
window.handleAddToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        showToast('Product not found', 'error');
        return;
    }
    
    try {
        // Get cart from localStorage
        let cart = JSON.parse(localStorage.getItem('media_cart')) || [];
        
        // Check if product already in cart
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;
            showToast(`Increased ${product.name} quantity`, 'success');
        } else {
            const cat = product.category.toLowerCase();
            const categoryIndex = products.filter(p => p.category.toLowerCase() === cat).indexOf(product);
            
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: getProductImage(cat, categoryIndex),
                category: product.category,
                quantity: 1
            });
            showToast(`✅ Added ${product.name} to cart!`, 'success');
        }
        
        // Save to localStorage
        localStorage.setItem('media_cart', JSON.stringify(cart));
        
        // Update counter
        updateCartCounter();
        
        console.log(`✅ Added to cart: ${product.name}`);
    } catch (error) {
        console.error('❌ Error adding to cart:', error);
        showToast('Failed to add to cart', 'error');
    }
};
