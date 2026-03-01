# Media - Advanced Multi-Page E-commerce Platform

A fully functional, modern e-commerce platform built with HTML5, Tailwind CSS, Vanilla JavaScript ES6 Modules, and Firebase.

## 🚀 Features

### Multi-Page Architecture
- **Home Page** - Hero carousel with featured products
- **Products Page** - Full catalog with instant search and filters
- **Product Details** - Dynamic product pages with quantity selector
- **Shopping Cart** - Full cart management with localStorage persistence
- **Authentication** - Login/Register with multiple providers
- **Profile Page** - User dashboard with order history placeholder

### Advanced Functionality
- ✅ **Instant Search** - Real-time product filtering as you type
- ✅ **Category Filters** - Filter by Laptops, Monitors, Keyboards, Mice, Headsets
- ✅ **Dynamic Routing** - URL parameters for product details
- ✅ **Quantity Selector** - Adjust quantities before adding to cart
- ✅ **Toast Notifications** - User-friendly feedback messages
- ✅ **Cart Persistence** - Cart saved in localStorage
- ✅ **Cart Counter** - Live cart item count in navbar
- ✅ **Price Calculations** - Subtotal, tax (10%), and total

### Authentication
- Email/Password registration and login
- Google Sign-In
- Facebook Login
- GitHub Login
- Protected profile page
- Auto-redirect after login

### Design
- Dark theme with Slate-950 background
- Blue-500 accent colors
- Fully responsive (Mobile/Tablet/Desktop)
- Smooth transitions and hover effects
- Modern card-based UI

## 📁 Project Structure

```
media-ecommerce/
├── index.html              # Home page
├── products.html           # Products listing
├── product-details.html    # Product details
├── cart.html              # Shopping cart
├── auth.html              # Authentication
├── profile.html           # User profile
├── css/
│   └── style.css          # Custom styles
├── js/
│   ├── config.js          # Configuration & data
│   ├── firebase-init.js   # Firebase setup
│   ├── utils.js           # Utility functions
│   ├── home.js            # Home page module
│   ├── products.js        # Products page module
│   ├── product-details.js # Product details module
│   ├── cart.js            # Cart module
│   ├── auth.js            # Authentication module
│   └── profile.js         # Profile module
├── FIREBASE_SETUP.md      # Firebase configuration guide
└── README.md              # This file
```

## 🛠️ Setup Instructions

### 1. Clone or Download
Download all files to your local machine.

### 2. Configure Firebase
Follow the detailed instructions in `FIREBASE_SETUP.md` to:
- Create a Firebase project
- Enable authentication providers
- Get your Firebase configuration
- Update `js/config.js` with your credentials

### 3. Run the Application
Open `index.html` in a modern web browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000`

## 🎯 Usage

### Shopping Flow
1. Browse featured products on home page
2. Click "View All Products" or navigate to Products page
3. Use instant search or category filters to find items
4. Click a product card to view details
5. Select quantity and add to cart
6. View cart and adjust quantities
7. Proceed to checkout (placeholder)

### Authentication Flow
1. Click "Login" in navbar
2. Register a new account or sign in
3. Use email/password or social login
4. Redirected to profile page
5. View profile information
6. Sign out when done

## 🔧 Customization

### Adding Products
Edit `js/config.js` and add items to the `products` array:

```javascript
{
    id: 25,
    name: "Product Name",
    category: "laptop", // laptop, mouse, keyboard, monitor, headset
    price: 999,
    image: "https://example.com/image.jpg",
    description: "Product description"
}
```

### Changing Colors
Update Tailwind classes in HTML files:
- Background: `bg-slate-950` → `bg-gray-900`
- Accent: `bg-blue-600` → `bg-purple-600`
- Text: `text-blue-500` → `text-green-500`

### Modifying Tax Rate
Edit `js/utils.js` in the `calculateTotals()` function:

```javascript
const tax = subtotal * 0.1; // Change 0.1 to your tax rate
```

## 🔒 Security Best Practices

1. Never commit Firebase credentials to public repositories
2. Add your domain to Firebase authorized domains
3. Implement Firestore security rules for production
4. Use environment variables for sensitive data
5. Enable Firebase App Check for additional security

## 📱 Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Requires ES6 module support.

## 🚀 Deployment

### Firebase Hosting
```bash
firebase init hosting
firebase deploy
```

### Netlify
1. Drag and drop project folder to Netlify
2. Site will be live instantly

### Vercel
```bash
vercel
```

## 📝 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to fork, modify, and use this project for your own purposes.

## 📧 Support

For issues or questions, refer to:
- Firebase Documentation: https://firebase.google.com/docs
- Tailwind CSS: https://tailwindcss.com/docs
- MDN Web Docs: https://developer.mozilla.org

---

Built with ❤️ using modern web technologies