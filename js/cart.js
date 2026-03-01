// Shopping Cart Module
import { getCart, removeFromCart, updateQuantity, calculateTotals, formatCurrency, showToast } from './utils.js';
import { updateCartCounter } from './main.js';
import { setupAuthObserver, auth } from './firebase-init.js';
import { getProductImage } from './product-images.js';

function renderCart() {
    const cart = getCart();
    const container = document.getElementById('cartItems');
    const emptyMsg = document.getElementById('emptyCart');

    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '';
        if (emptyMsg) emptyMsg.classList.remove('hidden');
        updateTotalsDisplay();
        return;
    }

    if (emptyMsg) emptyMsg.classList.add('hidden');
    
    container.innerHTML = cart.map((item, index) => {
        // Get proper image for the product
        const imageUrl = item.image || getProductImage(item.category?.toLowerCase() || 'laptop', index);
        
        return `
            <div class="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-4 mb-4">
                <img src="${imageUrl}" class="w-20 h-20 object-cover rounded-lg" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=800'">
                <div class="flex-1">
                    <h3 class="font-bold text-lg text-white">${item.name}</h3>
                    <p class="text-blue-500 font-bold">$${formatCurrency(item.price)}</p>
                </div>
                <div class="flex items-center gap-3 bg-slate-800 rounded-lg px-2 py-1">
                    <button onclick="handleQty('${item.id}', -1)" class="w-8 h-8 hover:text-blue-500 transition">-</button>
                    <span class="font-bold w-4 text-center text-blue-400">${item.quantity}</span>
                    <button onclick="handleQty('${item.id}', 1)" class="w-8 h-8 hover:text-blue-500 transition">+</button>
                </div>
                <button onclick="handleRemove('${item.id}')" class="text-red-500 p-2 hover:bg-red-500/10 rounded-lg transition">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
            </div>
        `;
    }).join('');
    
    updateTotalsDisplay();
}

function updateTotalsDisplay() {
    const totals = calculateTotals();
    const sub = document.getElementById('subtotal');
    const tax = document.getElementById('tax');
    const tot = document.getElementById('total');

    if (sub) sub.innerText = formatCurrency(totals.subtotal);
    if (tax) tax.innerText = formatCurrency(totals.tax);
    if (tot) tot.innerText = formatCurrency(totals.total);
}

// Make functions available to HTML
window.handleQty = (id, change) => {
    const cart = getCart();
    const item = cart.find(i => String(i.id) === String(id));
    if (item) {
        const newQty = item.quantity + change;
        if (newQty <= 0) return handleRemove(id);
        updateQuantity(id, newQty);
        renderCart();
        updateCartCounter();
    }
};

window.handleRemove = (id) => {
    removeFromCart(id);
    renderCart();
    updateCartCounter();
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('🛒 Cart page initializing...');
    setupAuthObserver();
    updateCartCounter();
    renderCart();
    setupCheckout();
    console.log('✅ Cart page ready');
});

// Setup checkout
function setupCheckout() {
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }
}

// Handle checkout
async function handleCheckout() {
    const cart = getCart();
    
    if (cart.length === 0) {
        showToast('Your cart is empty!', 'error');
        return;
    }
    
    // Check if user is logged in
    if (!auth.currentUser) {
        showToast('Please sign in to checkout', 'warning');
        setTimeout(() => {
            window.location.href = 'auth.html';
        }, 1500);
        return;
    }
    
    // Show confirmation
    const totals = calculateTotals();
    const confirmed = confirm(`Complete your order?\n\nTotal: $${formatCurrency(totals.total)}\n\nThis will save your order to your profile.`);
    
    if (!confirmed) return;
    
    try {
        // Create order
        const order = {
            id: Date.now().toString().slice(-8),
            userId: auth.currentUser.uid,
            userEmail: auth.currentUser.email,
            items: cart,
            subtotal: totals.subtotal,
            tax: totals.tax,
            total: totals.total,
            status: 'pending',
            date: new Date().toISOString()
        };
        
        // Save to localStorage
        const orders = JSON.parse(localStorage.getItem('orders_' + auth.currentUser.uid)) || [];
        orders.unshift(order);
        localStorage.setItem('orders_' + auth.currentUser.uid, JSON.stringify(orders));
        
        // Clear cart
        localStorage.removeItem('media_cart');
        updateCartCounter();
        
        // Show success
        showToast('✅ Order placed successfully!', 'success');
        
        // Redirect to profile
        setTimeout(() => {
            window.location.href = 'profile.html';
        }, 2000);
        
    } catch (error) {
        console.error('Checkout error:', error);
        showToast('Error placing order. Please try again.', 'error');
    }
}
