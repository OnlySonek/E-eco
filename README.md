# 🛒 Media E-Commerce Store

Modern e-commerce website built with vanilla JavaScript, Firebase, and Tailwind CSS.

## 🚀 Features

### Core Features
- 🛍️ Product catalog with categories
- 🛒 Shopping cart functionality
- 👤 User authentication (Firebase Auth)
- 💳 Order management
- 📧 Contact form with EmailJS integration
- 🔍 Product search
- 📱 Fully responsive design

### Technical Features
- 🎨 Pure CSS animations (no GSAP)
- 🌓 Dark/Light mode toggle
- 🌍 Multi-language support (Arabic/English)
- 🖼️ Lazy loading for images
- 🔒 Advanced security features
- 🔥 Firebase Firestore database
- ⚡ Fast and optimized

## 📁 Project Structure

```
├── index.html              # Homepage
├── products.html           # Products page
├── product-details.html    # Product details
├── cart.html              # Shopping cart
├── auth.html              # Login/Register
├── profile.html           # User profile
├── contact.html           # Contact form
├── css/
│   └── style.css          # Main styles
├── js/
│   ├── main.js            # Main app logic
│   ├── auth.js            # Authentication
│   ├── cart.js            # Cart functionality
│   ├── products.js        # Products display
│   ├── contact.js         # Contact form
│   ├── i18n.js            # Internationalization
│   ├── animations.js      # CSS animations
│   ├── lazy-loading.js    # Image lazy loading
│   ├── security.js        # Security features
│   ├── firebase-init.js   # Firebase config
│   └── config.js          # App configuration
└── firestore.rules        # Firestore security rules
```

## 🔧 Setup

### 1. Firebase Configuration

Create `js/config.js`:
```javascript
export const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### 2. EmailJS Configuration

Update in `contact.html`:
```javascript
const PUBLIC_KEY = "YOUR_PUBLIC_KEY";
window.EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
window.EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
```

### 3. Firestore Rules

Deploy the security rules from `firestore.rules` to your Firebase project.

### 4. Admin Setup

See `🔑_MAKE_ADMIN_GUIDE.md` for instructions on creating admin users.

## 📚 Documentation

- `📧_EMAIL_SETUP_GUIDE.md` - EmailJS integration guide
- `📸_LAZY_LOADING_GUIDE.md` - Image lazy loading implementation
- `🔒_SECURITY_GUIDE.md` - Security features documentation
- `🔥_FIRESTORE_RULES_GUIDE.md` - Firestore security rules
- `🔑_MAKE_ADMIN_GUIDE.md` - Admin user setup
- `PRODUCTS_DATABASE_GUIDE.md` - Products database structure
- `UPLOAD_INSTRUCTIONS.md` - Product upload instructions

## 🎨 Features Details

### Animations
- Pure CSS animations (no JavaScript libraries)
- Smooth transitions and effects
- Performance optimized
- Dark/Light mode compatible

### Security
- Console protection
- DevTools detection
- Right-click disabled
- Text selection disabled
- API key obfuscation
- Firestore security rules

### Internationalization
- Arabic and English support
- RTL layout for Arabic
- Language switcher
- Persistent language preference

### Lazy Loading
- Images load on scroll
- Shimmer placeholder effect
- Bandwidth optimization
- Smooth fade-in animation

## 🚀 Deployment

### Firebase Hosting

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize project:
```bash
firebase init hosting
```

4. Deploy:
```bash
firebase deploy
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🔐 Security Notes

- Never commit `js/config.js` with real credentials
- Use environment variables for sensitive data
- Keep Firebase security rules updated
- Regularly review user permissions

## 📞 Contact

- Email: abdelrhmansherif140@gmail.com
- Phone: +20 115 023 8481
- Location: Giza, Cairo, Egypt

## 📄 License

This project is private and proprietary.

---

**Built with ❤️ by Kiro AI**
