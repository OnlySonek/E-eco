# Firebase Setup Guide for Media E-commerce Platform

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: "media-ecommerce"
4. Follow the setup wizard (disable Google Analytics if not needed)

## Step 2: Enable Authentication Methods

1. In Firebase Console, go to "Authentication" > "Sign-in method"
2. Enable the following providers:
   - **Email/Password** - Click Enable and Save
   - **Google** - Click Enable and Save
   - **Facebook** (optional) - Requires Facebook App ID and Secret
   - **GitHub** (optional) - Requires GitHub OAuth App credentials

## Step 3: Get Your Firebase Config

1. Go to Project Settings (gear icon in sidebar)
2. Scroll down to "Your apps" section
3. Click the web icon (`</>`) to add a web app
4. Register your app with nickname "Media Store"
5. Copy the `firebaseConfig` object

## Step 4: Update js/config.js

Replace the Firebase configuration in `js/config.js` with your actual config:

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

## Step 5: Configure OAuth Providers (Optional)

### Google
- No additional setup required - works out of the box

### Facebook
1. Create a Facebook App at [Facebook Developers](https://developers.facebook.com/)
2. Add "Facebook Login" product
3. In Firebase Console, copy the OAuth redirect URI
4. Add the redirect URI to Facebook App settings
5. Copy Facebook App ID and App Secret to Firebase Console

### GitHub
1. Create OAuth App at [GitHub Settings > Developer settings > OAuth Apps](https://github.com/settings/developers)
2. Set Authorization callback URL to: `https://YOUR_PROJECT_ID.firebaseapp.com/__/auth/handler`
3. Copy Client ID and Client Secret to Firebase Console

## Step 6: Test Your Application

1. Open `index.html` in a modern browser (Chrome, Firefox, Edge)
2. Navigate to Products page and test instant search
3. Click on a product to view details
4. Add items to cart and verify localStorage persistence
5. Go to auth.html and test registration with email/password
6. Test social login buttons (Google should work immediately)
7. After login, verify profile page displays user info correctly

## Project Structure

```
media-ecommerce/
├── index.html              # Home page with carousel
├── products.html           # Products listing with filters
├── product-details.html    # Individual product page
├── cart.html              # Shopping cart
├── auth.html              # Login/Register
├── profile.html           # User profile
├── css/
│   └── style.css          # Custom styles
└── js/
    ├── config.js          # Firebase config & products data
    ├── firebase-init.js   # Firebase initialization
    ├── utils.js           # Utility functions
    ├── home.js            # Home page logic
    ├── products.js        # Products page with instant search
    ├── product-details.js # Product details with quantity selector
    ├── cart.js            # Cart management
    ├── auth.js            # Authentication logic
    └── profile.js         # Profile page logic
```

## Features Implemented

✅ Multi-page architecture with separate HTML files
✅ ES6 modules for clean code organization
✅ Instant search with onInput event
✅ Category filtering
✅ Dynamic product details with URL parameters
✅ Quantity selector with live price updates
✅ Toast notifications
✅ localStorage cart persistence
✅ Cart with increase/decrease/remove functionality
✅ Subtotal, tax, and total calculations
✅ Firebase Authentication (Email, Google, Facebook, GitHub)
✅ Protected profile page
✅ Responsive navbar with cart counter
✅ Dark theme (Slate-950 background, Blue-500 accents)

## Security Notes

1. Add your domain to Firebase authorized domains:
   - Firebase Console > Authentication > Settings > Authorized domains
   
2. For production, consider adding Firestore security rules

3. Never commit your Firebase config with real credentials to public repositories

## Deployment to Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init hosting

# Deploy
firebase deploy
```

## Troubleshooting

- **CORS errors**: Make sure you're testing on a web server, not file:// protocol
- **Auth not working**: Verify Firebase config is correct in js/config.js
- **Cart not persisting**: Check browser localStorage is enabled
- **Module errors**: Ensure you're using a modern browser with ES6 support
