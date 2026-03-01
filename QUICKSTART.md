# Quick Start Guide - Media E-commerce Platform

Get your store running in 5 minutes!

## ⚡ Quick Setup

### Step 1: Firebase Configuration (2 minutes)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project called "media-store"
3. Go to Authentication → Sign-in method → Enable "Email/Password" and "Google"
4. Go to Project Settings → Your apps → Add web app
5. Copy the config object

### Step 2: Update Configuration (1 minute)

Open `js/config.js` and replace:

```javascript
export const firebaseConfig = {
    apiKey: "PASTE_YOUR_API_KEY",
    authDomain: "PASTE_YOUR_AUTH_DOMAIN",
    projectId: "PASTE_YOUR_PROJECT_ID",
    storageBucket: "PASTE_YOUR_STORAGE_BUCKET",
    messagingSenderId: "PASTE_YOUR_SENDER_ID",
    appId: "PASTE_YOUR_APP_ID"
};
```

### Step 3: Run the Application (1 minute)

**Option A: Simple File Open**
- Just open `index.html` in Chrome, Firefox, or Edge

**Option B: Local Server (Recommended)**
```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

Then open: `http://localhost:8000`

### Step 4: Test Everything (1 minute)

1. ✅ Browse products on home page
2. ✅ Search for "laptop" on products page
3. ✅ Click a product to view details
4. ✅ Add items to cart
5. ✅ Register a new account
6. ✅ View your profile

## 🎉 You're Done!

Your e-commerce platform is now fully functional!

## 🔥 Key Features to Try

### Instant Search
Go to Products page and start typing - results update in real-time!

### Category Filters
Click category buttons to filter products instantly

### Product Details
Click any product card to see full details with quantity selector

### Shopping Cart
- Add multiple items
- Adjust quantities with +/- buttons
- Remove items
- See live total calculations

### Authentication
- Register with email/password
- Sign in with Google (works immediately!)
- View profile with avatar
- Sign out

## 📊 What's Included

- **24 Products** across 5 categories
- **6 HTML Pages** (Home, Products, Details, Cart, Auth, Profile)
- **9 JavaScript Modules** (Clean ES6 code)
- **Firebase Auth** (Email, Google, Facebook, GitHub)
- **localStorage Cart** (Persists between sessions)
- **Responsive Design** (Mobile, Tablet, Desktop)

## 🎨 Customization Tips

### Add Your Own Products
Edit `js/config.js` - add items to the products array

### Change Colors
Search and replace in HTML files:
- `bg-blue-600` → `bg-purple-600` (buttons)
- `text-blue-500` → `text-green-500` (accents)

### Modify Tax Rate
Edit `js/utils.js` line 42:
```javascript
const tax = subtotal * 0.15; // Change to your rate
```

## 🚨 Troubleshooting

**Problem: "Firebase not defined"**
- Solution: Check your Firebase config in `js/config.js`

**Problem: "Module not found"**
- Solution: Use a local server, not file:// protocol

**Problem: Cart not saving**
- Solution: Check browser localStorage is enabled

**Problem: Can't login**
- Solution: Verify Firebase Auth is enabled in console

## 📚 Next Steps

1. Read `FIREBASE_SETUP.md` for advanced auth setup
2. Check `README.md` for full documentation
3. Deploy to Firebase Hosting or Netlify

## 🎯 Production Checklist

Before going live:
- [ ] Add your domain to Firebase authorized domains
- [ ] Set up Firestore for order management
- [ ] Implement payment processing (Stripe/PayPal)
- [ ] Add email notifications
- [ ] Set up Firebase security rules
- [ ] Enable Firebase Analytics
- [ ] Add product inventory management
- [ ] Implement order tracking

## 💡 Pro Tips

1. **Test on mobile** - The site is fully responsive
2. **Use Chrome DevTools** - Check console for any errors
3. **Clear localStorage** - If cart acts weird: `localStorage.clear()`
4. **Check Network tab** - Verify Firebase API calls
5. **Enable persistence** - Add offline support with Firestore

## 🤝 Need Help?

- Firebase Docs: https://firebase.google.com/docs
- Tailwind Docs: https://tailwindcss.com/docs
- JavaScript Modules: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

---

Happy coding! 🚀