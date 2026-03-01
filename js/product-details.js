// Product Details Module - Firestore Integration
import { doc, getDoc, collection, query, where, getDocs } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';
import { db, setupAuthObserver } from './firebase-init.js';
import { updateCartCounter } from './main.js';
import { getUrlParameter, showToast } from './utils.js';
import { getProductImage } from './product-images.js';

let currentProduct = null;
let quantity = 1;
let productIndex = 0;

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    try {
        console.log('📦 Loading product details...');
        setupAuthObserver();
        updateCartCounter();
        await loadProductDetails();
    } catch (error) {
        console.error('❌ Initialization error:', error);
    }
});

// Load product details from Firestore
async function loadProductDetails() {
    const productId = getUrlParameter('id');
    
    if (!productId) {
        console.error('No product ID provided');
        window.location.href = 'products.html';
        return;
    }
    
    try {
        const docRef = doc(db, 'products', productId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            currentProduct = {
                id: docSnap.id,
                ...docSnap.data()
            };
            
            // Get product index for correct image
            await getProductIndex(currentProduct.category, currentProduct.id);
            
            // Clean URL - remove query parameters
            window.history.replaceState({}, '', 'product-details.html');
            
            console.log('✅ Product loaded:', currentProduct.name);
            renderProductDetails();
        } else {
            console.error('Product not found:', productId);
            window.location.href = 'products.html';
        }
    } catch (error) {
        console.error('❌ Error loading product:', error);
        window.location.href = 'products.html';
    }
}

// Get product index within its category
async function getProductIndex(category, productId) {
    try {
        const q = query(collection(db, 'products'), where('category', '==', category));
        const querySnapshot = await getDocs(q);
        
        let index = 0;
        querySnapshot.forEach((doc) => {
            if (doc.id === productId) {
                productIndex = index;
            }
            index++;
        });
    } catch (error) {
        console.error('Error getting product index:', error);
        productIndex = 0;
    }
}

// Render product details
function renderProductDetails() {
    const container = document.getElementById('productDetails');
    const imageUrl = getProductImage(currentProduct.category.toLowerCase(), productIndex);
    
    container.innerHTML = `
        <div>
            <img src="${imageUrl}" 
                 alt="${currentProduct.name}" 
                 onerror="this.src='https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=800'"
                 class="w-full rounded-2xl shadow-2xl object-cover">
        </div>
        <div>
            <h1 class="text-4xl font-bold mb-4">${currentProduct.name}</h1>
            <div class="text-3xl text-blue-500 font-bold mb-6">$${currentProduct.price.toLocaleString()}</div>
            <p class="text-gray-300 text-lg mb-8">${currentProduct.description || 'High-quality tech product with excellent performance and reliability.'}</p>
            
            <div class="mb-6">
                <label class="block mb-2 text-lg font-semibold">Quantity</label>
                <div class="flex items-center space-x-4">
                    <button onclick="decreaseQuantity()" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition font-bold text-xl">-</button>
                    <span id="quantityDisplay" class="text-2xl font-bold w-12 text-center">${quantity}</span>
                    <button onclick="increaseQuantity()" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition font-bold text-xl">+</button>
                </div>
            </div>
            
            <button onclick="handleAddToCart()" 
                class="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-xl font-semibold transition mb-6">
                Add to Cart - $${(currentProduct.price * quantity).toLocaleString()}
            </button>
            
            <div class="bg-slate-900 rounded-lg p-6 border border-slate-800">
                <h3 class="text-xl font-bold mb-4">Product Details</h3>
                <ul class="space-y-2 text-gray-300">
                    <li>• Category: ${getCategoryName(currentProduct.category)}</li>
                    <li>• Product ID: #${currentProduct.id.slice(0, 8)}</li>
                    <li>• Free shipping on orders over $50</li>
                    <li>• 30-day return policy</li>
                    <li>• 1-year warranty included</li>
                </ul>
            </div>
        </div>
    `;
}

// Get category display name
function getCategoryName(category) {
    const categories = {
        laptop: 'Laptops',
        case: 'PC Cases',
        monitor: 'Monitors',
        mouse: 'Mice',
        keyboard: 'Keyboards'
    };
    return categories[category.toLowerCase()] || category.charAt(0).toUpperCase() + category.slice(1);
}

// Quantity controls
window.increaseQuantity = function() {
    quantity++;
    updateQuantityDisplay();
};

window.decreaseQuantity = function() {
    if (quantity > 1) {
        quantity--;
        updateQuantityDisplay();
    }
};

function updateQuantityDisplay() {
    document.getElementById('quantityDisplay').textContent = quantity;
    const addButton = document.querySelector('button[onclick="handleAddToCart()"]');
    if (addButton) {
        addButton.innerHTML = `Add to Cart - $${(currentProduct.price * quantity).toLocaleString()}`;
    }
}

// Add to cart handler
window.handleAddToCart = function() {
    if (!currentProduct) return;
    
    try {
        // Get existing cart
        let cart = JSON.parse(localStorage.getItem('media_cart')) || [];
        
        // Check if product already in cart
        const existingIndex = cart.findIndex(item => item.id === currentProduct.id);
        
        if (existingIndex > -1) {
            // Increase quantity
            cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + quantity;
            showToast(`Updated ${currentProduct.name} quantity in cart`, 'success');
        } else {
            // Add new product
            const imageUrl = getProductImage(currentProduct.category.toLowerCase(), productIndex);
            cart.push({
                id: currentProduct.id,
                name: currentProduct.name,
                price: currentProduct.price,
                category: currentProduct.category,
                image: imageUrl,
                quantity: quantity
            });
            showToast(`✅ Added ${quantity}x ${currentProduct.name} to cart!`, 'success');
        }
        
        // Save to localStorage
        localStorage.setItem('media_cart', JSON.stringify(cart));
        
        // Update cart counter
        updateCartCounter();
        
        console.log(`✅ Added ${quantity}x ${currentProduct.name} to cart`);
        
        // Reset quantity
        quantity = 1;
        updateQuantityDisplay();
        
    } catch (error) {
        console.error('❌ Error adding to cart:', error);
        showToast('Failed to add to cart', 'error');
    }
};
