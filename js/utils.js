const CART_KEY = 'media_cart';

export function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

export function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function updateCartCount() {
    const cart = getCart();
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cartCount');
    if (badge) {
        badge.innerText = total;
        badge.classList.toggle('hidden', total === 0);
    }
}

export function addToCart(product) {
    let cart = getCart();
    const existing = cart.find(i => String(i.id) === String(product.id));
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCart(cart);
    showToast(`Added ${product.name}!`, 'success');
}

export function removeFromCart(id) {
    let cart = getCart();
    cart = cart.filter(i => String(i.id) !== String(id));
    saveCart(cart);
}

export function updateQuantity(id, qty) {
    let cart = getCart();
    const item = cart.find(i => String(i.id) === String(id));
    if (item) item.quantity = qty;
    saveCart(cart);
}

export function calculateTotals() {
    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return { subtotal, tax: subtotal * 0.1, total: subtotal * 1.1 };
}

export function formatCurrency(num) {
    return `$${Number(num).toLocaleString()}`;
}

export function getUrlParameter(name) {
    return new URLSearchParams(window.location.search).get(name);
}

export function showToast(msg, type = 'success') {
    const t = document.createElement('div');
    const bgColor = type === 'error' ? 'bg-red-600' : type === 'warning' ? 'bg-yellow-600' : 'bg-blue-600';
    t.className = `fixed bottom-5 right-5 ${bgColor} text-white p-4 rounded-lg z-50 animate-fade-in shadow-lg`;
    t.innerText = msg;
    document.body.appendChild(t);
    setTimeout(() => {
        t.style.opacity = '0';
        t.style.transition = 'opacity 0.3s';
        setTimeout(() => t.remove(), 300);
    }, 3000);
}