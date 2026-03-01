# 🔥 Firebase Connection Guide - Media Store

Complete step-by-step guide to connect your Media Store to Firebase.

## 📋 What You Need

From your Firebase Console, you should have:
- ✅ Project created: "e-commerce-store-39665"
- ✅ Web app registered: "Media-Store"
- ✅ Firebase configuration object

## 🔧 Step 1: Get Your Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **e-commerce-store-39665**
3. Click the gear icon ⚙️ → **Project settings**
4. Scroll to "Your apps" section
5. Find your "Media-Store" web app
6. Copy the `firebaseConfig` object

It should look like this:
```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "e-commerce-store-39665.firebaseapp.com",
  projectId: "e-commerce-store-39665",
  storageBucket: "e-commerce-store-39665.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123..."
};
```

## 📝 Step 2: Update Your Configuration File

Open `js/config.js` and replace the placeholder values:

**Before:**
```javascript
export const firebaseConfig = {
    apiKey: "YOUR_API_KEY_FROM_FIREBASE_CONSOLE",
    authDomain: "e-commerce-store-39665.firebaseapp.com",
    projectId: "e-commerce-store-39665",
    storageBucket: "e-commerce-store-39665.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID_FROM_FIREBASE_CONSOLE",
    appId: "YOUR_APP_ID_FROM_FIREBASE_CONSOLE"
};
```

**After (with your actual values):**
```javascript
export const firebaseConfig = {
    apiKey: "AIzaSyC...",  // ← Paste your actual API key
    authDomain: "e-commerce-store-39665.firebaseapp.com",
    projectId: "e-commerce-store-39665",
    storageBucket: "e-commerce-store-39665.appspot.com",
    messagingSenderId: "123456789",  // ← Paste your actual sender ID
    appId: "1:123456789:web:abc123..."  // ← Paste your actual app ID
};
```

## 🔐 Step 3: Enable Authentication Methods

### Enable Email/Password Authentication

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Click **Email/Password**
3. Toggle **Enable**
4. Click **Save**

### Enable Google Sign-In

1. In the same **Sign-in method** page
2. Click **Google**
3. Toggle **Enable**
4. Select a support email
5. Click **Save**

### Enable Facebook Login (Optional)

1. Create a Facebook App at [Facebook Developers](https://developers.facebook.com/)
2. Get your App ID and App Secret
3. In Firebase Console → **Authentication** → **Sign-in method**
4. Click **Facebook**
5. Toggle **Enable**
6. Paste App ID and App Secret
7. Copy the OAuth redirect URI
8. Add it to your Facebook App settings
9. Click **Save**

### Enable GitHub Login (Optional)

1. Go to [GitHub Settings](https://github.com/settings/developers)
2. Click **New OAuth App**
3. Fill in details:
   - Application name: Media Store
   - Homepage URL: Your site URL
   - Authorization callback URL: `https://e-commerce-store-39665.firebaseapp.com/__/auth/handler`
4. Get Client ID and Client Secret
5. In Firebase Console → **Authentication** → **Sign-in method**
6. Click **GitHub**
7. Toggle **Enable**
8. Paste Client ID and Client Secret
9. Click **Save**

## 🌐 Step 4: Add Authorized Domains

1. In Firebase Console → **Authentication** → **Settings**
2. Scroll to **Authorized domains**
3. Add your domains:
   - `localhost` (for local testing)
   - Your production domain (e.g., `yourdomain.com`)

## ✅ Step 5: Test Your Connection

### Test Locally

1. **Open your project in a browser:**
   ```bash
   # Option 1: Python
   python -m http.server 8000
   
   # Option 2: Node.js
   npx http-server
   ```

2. **Open browser console (F12)**

3. **Navigate to `auth.html`**

4. **Check console for:**
   ```
   🔐 Initializing authentication...
   ✅ Firebase initialized successfully
   Project ID: e-commerce-store-39665
   ✅ Authentication initialized
   ```

### Test Authentication

1. **Try Email Registration:**
   - Go to auth.html
   - Click "Sign up"
   - Enter email and password
   - Click "Create Account"
   - Should redirect to profile.html

2. **Try Google Sign-In:**
   - Go to auth.html
   - Click "Google" button
   - Select Google account
   - Should redirect to profile.html

3. **Check Firebase Console:**
   - Go to **Authentication** → **Users**
   - You should see your registered user

## 🔍 Troubleshooting

### Issue: "Firebase not initialized"

**Solution:**
1. Check `js/config.js` has correct values
2. Verify all fields are filled (no "YOUR_..." placeholders)
3. Check browser console for errors

### Issue: "Auth domain not authorized"

**Solution:**
1. Go to Firebase Console → Authentication → Settings
2. Add your domain to Authorized domains
3. For local testing, add `localhost`

### Issue: "API key not valid"

**Solution:**
1. Verify you copied the entire API key
2. Check for extra spaces or characters
3. Regenerate API key in Firebase Console if needed

### Issue: Google Sign-In not working

**Solution:**
1. Verify Google provider is enabled in Firebase Console
2. Check you selected a support email
3. Clear browser cache and try again

### Issue: Console shows CORS errors

**Solution:**
1. Use a local server (not file:// protocol)
2. Add domain to Firebase authorized domains
3. Check Firebase security rules

## 📊 Verify Everything Works

### Checklist:

- [ ] Firebase config updated in `js/config.js`
- [ ] Email/Password auth enabled
- [ ] Google auth enabled
- [ ] Authorized domains added
- [ ] Local server running
- [ ] Browser console shows no errors
- [ ] Can register new account
- [ ] Can login with email/password
- [ ] Can login with Google
- [ ] Profile page shows user info
- [ ] Can sign out

## 🎯 What Happens Behind the Scenes

### When You Open the App:

1. **Browser loads `index.html`**
2. **`home.js` imports `firebase-init.js`**
3. **`firebase-init.js` imports `config.js`**
4. **Firebase SDK loads from CDN**
5. **`initializeApp()` connects to Firebase**
6. **Auth state observer starts**
7. **UI updates based on auth state**

### When You Login:

1. **User clicks "Login"**
2. **`auth.js` calls `signInWithEmailAndPassword()`**
3. **Firebase validates credentials**
4. **Returns user object**
5. **`onAuthStateChanged` fires**
6. **UI updates (shows avatar, hides login button)**
7. **Redirects to profile page**

### When You Add to Cart:

1. **User clicks "Add to Cart"**
2. **`utils.js` gets cart from localStorage**
3. **Adds/updates item**
4. **Saves to localStorage**
5. **Updates cart counter**
6. **Shows toast notification**

## 🚀 Next Steps

### After Connection Works:

1. **Test all features** (see `TESTING_CHECKLIST.md`)
2. **Customize products** (edit `js/config.js`)
3. **Deploy to production** (see `DEPLOYMENT.md`)

### Optional Enhancements:

1. **Add Firestore for orders:**
   ```javascript
   import { getFirestore, collection, addDoc } from 'firebase/firestore';
   const db = getFirestore(app);
   ```

2. **Add Firebase Storage for images:**
   ```javascript
   import { getStorage } from 'firebase/storage';
   const storage = getStorage(app);
   ```

3. **Add Firebase Analytics:**
   ```javascript
   import { getAnalytics } from 'firebase/analytics';
   const analytics = getAnalytics(app);
   ```

## 📞 Need Help?

### Firebase Documentation:
- [Firebase Auth Docs](https://firebase.google.com/docs/auth)
- [Firebase Web Setup](https://firebase.google.com/docs/web/setup)
- [Firebase Console](https://console.firebase.google.com/)

### Common Resources:
- [Firebase Status](https://status.firebase.google.com/)
- [Firebase Support](https://firebase.google.com/support)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/firebase)

## ✨ Success Indicators

You'll know everything is working when:

✅ Console shows: "✅ Firebase initialized successfully"
✅ Console shows: "Project ID: e-commerce-store-39665"
✅ No red errors in browser console
✅ Can register new account
✅ Can login with email/password
✅ Can login with Google
✅ Profile page shows user avatar and email
✅ Cart persists across page refreshes
✅ All features work as expected

## 🎉 You're Connected!

Once you see the success messages in the console and can login, your app is fully connected to Firebase!

**Next:** Test all features using `TESTING_CHECKLIST.md`

---

**Project:** Media E-commerce Store
**Firebase Project:** e-commerce-store-39665
**App Name:** Media-Store
**SDK Version:** Firebase v10.8.0 (Modular)