# 👨‍💻 Developer Reference - Media Store

## Quick Reference Guide for Developers

---

## 🔥 Firebase Setup

### Static Imports (No More Errors!)
```javascript
// js/firebase-init.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

### Usage in Other Files:
```javascript
import { auth, db } from './firebase-init.js';
// Ready to use - no async needed!
```

---

## 🔍 Global Search Implementation

### 1. Navbar Search (Any Page):
```javascript
// In navbar
<input id="globalSearch" placeholder="Search products...">

// JavaScript
globalSearch.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        window.location.href = `products.html?search=${encodeURIComponent(e.target.value)}`;
    }
});
```

### 2. Products Page Receives Search:
```javascript
// js/products.js
const urlSearch = getUrlParameter('search');
if (urlSearch) {
    searchTerm = urlSearch.toLowerCase();
    document.getElementById('searchInput').value = urlSearch;
    renderProducts(); // Auto-filters
}
```

### 3. Filter Function:
```javascript
function filterProducts() {
    return products.filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm)
    );
}
```

---

## 🛒 Cart System

### Add to Cart:
```javascript
import { addToCart, showToast, updateCartCount } from './utils.js';

// Add product
addToCart(product, quantity);

// Show notification
showToast('Added to cart!');

// Update badge (automatic)
updateCartCount();
```

### Cart Structure (localStorage):
```javascript
{
    cart: [
        {
            id: "firestore-doc-id",
            name: "Product Name",
            price: 1499,
            image: "https://...",
            quantity: 2,
            category: "laptop"
        }
    ]
}
```

### Get Cart:
```javascript
import { getCart } from './utils.js';
const cart = getCart(); // Returns array
```

### Update Quantity:
```javascript
import { updateQuantity } from './utils.js';
updateQuantity(productId, newQuantity);
```

### Remove Item:
```javascript
import { removeFromCart } from './utils.js';
removeFromCart(productId);
```

---

## 🎨 Styling Classes

### Navbar:
```css
.navbar-glass          /* Glassmorphism navbar */
.nav-link              /* Navigation links */
.search-input          /* Search bar */
.cart-badge            /* Cart counter badge */
.auth-btn              /* Login button */
.profile-link          /* Profile avatar link */
.user-avatar           /* User profile image */
```

### Product Cards:
```css
.product-card          /* Product container */
.product-card:hover    /* Hover effect */
.product-card img      /* Product image */
.product-card-content  /* Card content area */
.price                 /* Price display */
```

### Buttons:
```css
.filter-btn            /* Category filter buttons */
.filter-btn.active     /* Active filter */
.quantity-btn          /* +/- quantity buttons */
```

### Toast:
```css
.toast-notification    /* Toast container */
.toast-notification.show /* Visible state */
```

---

## 📦 Firestore Operations

### Fetch All Products:
```javascript
import { db } from './firebase-init.js';
import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

const querySnapshot = await getDocs(collection(db, 'products'));
const products = [];
querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
});
```

### Fetch Single Product:
```javascript
import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

const docRef = doc(db, 'products', productId);
const docSnap = await getDoc(docRef);
if (docSnap.exists()) {
    const product = { id: docSnap.id, ...docSnap.data() };
}
```

### Add Product:
```javascript
import { addDoc, collection } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

await addDoc(collection(db, 'products'), {
    name: "Product Name",
    category: "laptop",
    price: 1499,
    image: "https://...",
    description: "...",
    specs: { ... }
});
```

---

## 🖼️ Image System

### Using Product Images:
```javascript
import { getProductImage } from './product-images.js';

// Get image by category and index
const image = getProductImage('laptop', 0);
// Returns: https://images.unsplash.com/photo-...?auto=format&fit=crop&q=80&w=800
```

### Image Arrays:
```javascript
import { productImages } from './product-images.js';

// Access specific category
const laptopImages = productImages.laptop; // Array of 20 images
const monitorImages = productImages.monitor; // Array of 20 images
```

### Image URL Format:
```
https://images.unsplash.com/photo-{PHOTO_ID}?auto=format&fit=crop&q=80&w=800

Parameters:
- auto=format: Automatic format selection (WebP, JPEG)
- fit=crop: Crop to fit dimensions
- q=80: Quality 80%
- w=800: Width 800px
```

---

## 🎭 Animations & Transitions

### Hover Effects:
```css
/* Scale up on hover */
.product-card:hover {
    transform: scale(1.05);
    box-shadow: 0 20px 40px rgba(59, 130, 246, 0.3);
}

/* Underline grow */
.nav-link::after {
    width: 0;
    transition: width 0.3s ease;
}
.nav-link:hover::after {
    width: 100%;
}
```

### Toast Animation:
```css
.toast-notification {
    transform: translateY(100px);
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
.toast-notification.show {
    transform: translateY(0);
    opacity: 1;
}
```

### Cart Badge Pulse:
```css
@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}
.cart-badge {
    animation: pulse 2s infinite;
}
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First */
.container {
    padding: 1rem;
}

/* Tablet */
@media (min-width: 768px) {
    .container {
        padding: 2rem;
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .container {
        padding: 4rem;
    }
}
```

### Grid Layouts:
```html
<!-- Mobile: 1 column, Tablet: 2 columns, Desktop: 4 columns -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
```

---

## 🔧 Utility Functions

### Get URL Parameter:
```javascript
import { getUrlParameter } from './utils.js';
const category = getUrlParameter('category');
const search = getUrlParameter('search');
```

### Format Currency:
```javascript
import { formatCurrency } from './utils.js';
const formatted = formatCurrency(1499.99); // "1499.99"
```

### Calculate Totals:
```javascript
import { calculateTotals } from './utils.js';
const { subtotal, tax, total } = calculateTotals();
```

---

## 🎯 Event Listeners

### Setup Pattern:
```javascript
function setupEventListeners() {
    // Search
    document.getElementById('searchInput').addEventListener('input', (e) => {
        searchTerm = e.target.value.toLowerCase();
        renderProducts();
    });
    
    // Filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentCategory = btn.dataset.category;
            renderProducts();
        });
    });
}
```

---

## 🚀 Performance Tips

### 1. Lazy Loading Images:
```html
<img src="..." alt="..." loading="lazy">
```

### 2. Debounce Search:
```javascript
let searchTimeout;
searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        searchTerm = e.target.value.toLowerCase();
        renderProducts();
    }, 300);
});
```

### 3. Cache Firestore Data:
```javascript
let productsCache = null;
async function fetchProducts() {
    if (productsCache) return productsCache;
    // Fetch from Firestore
    productsCache = products;
    return products;
}
```

---

## 🔐 Security Best Practices

### 1. Firestore Rules (Production):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{product} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

### 2. Sanitize User Input:
```javascript
function sanitizeInput(input) {
    return input.replace(/[<>]/g, '');
}
```

### 3. Validate Data:
```javascript
function validateProduct(product) {
    return product.name && 
           product.price > 0 && 
           product.category && 
           product.image;
}
```

---

## 📊 Analytics Integration

### Google Analytics:
```html
<!-- Add to <head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Track Events:
```javascript
// Track add to cart
gtag('event', 'add_to_cart', {
    'items': [{
        'id': product.id,
        'name': product.name,
        'price': product.price
    }]
});
```

---

## 🐛 Debugging

### Console Logs:
```javascript
console.log('✅ Success:', data);
console.error('❌ Error:', error);
console.warn('⚠️ Warning:', message);
console.log('📦 Products loaded:', products.length);
```

### Check Firebase Connection:
```javascript
console.log('Firebase Config:', firebaseConfig);
console.log('Auth Instance:', auth);
console.log('Firestore Instance:', db);
```

### Check Cart:
```javascript
console.log('Cart:', localStorage.getItem('cart'));
console.log('Parsed Cart:', JSON.parse(localStorage.getItem('cart')));
```

---

## 📚 File Structure

```
project/
├── index.html
├── products.html
├── product-details.html
├── cart.html
├── auth.html
├── profile.html
├── admin-upload.html
├── css/
│   └── style.css
├── js/
│   ├── config.js
│   ├── firebase-init.js
│   ├── utils.js
│   ├── home.js
│   ├── products.js
│   ├── product-details.js
│   ├── cart.js
│   ├── auth.js
│   ├── profile.js
│   ├── upload-products.js
│   ├── product-images.js
│   └── products-data.js (legacy)
└── components/
    └── navbar.html
```

---

## 🎓 Learning Resources

- [Firebase Docs](https://firebase.google.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Unsplash API](https://unsplash.com/developers)
- [MDN Web Docs](https://developer.mozilla.org)

---

**Happy Coding!** 🚀
