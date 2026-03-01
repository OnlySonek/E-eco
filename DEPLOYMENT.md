# Deployment Guide - Media E-commerce Platform

Complete guide to deploying your e-commerce platform to production.

## 🚀 Pre-Deployment Checklist

Before deploying, ensure:
- [ ] Firebase configuration is set in `js/config.js`
- [ ] All authentication providers are enabled in Firebase Console
- [ ] Your domain is added to Firebase authorized domains
- [ ] All features tested locally (see `TESTING_CHECKLIST.md`)
- [ ] No console errors in browser DevTools
- [ ] Images load correctly
- [ ] Cart persists across page refreshes

## 📦 Deployment Options

### Option 1: Firebase Hosting (Recommended)

**Pros:** Free tier, automatic SSL, CDN, easy rollbacks, Firebase integration

**Steps:**

1. **Install Firebase CLI**
```bash
npm install -g firebase-tools
```

2. **Login to Firebase**
```bash
firebase login
```

3. **Initialize Firebase Hosting**
```bash
firebase init hosting
```

Select:
- Use existing project (select your project)
- Public directory: `.` (current directory)
- Configure as single-page app: `No`
- Set up automatic builds: `No`
- Don't overwrite existing files

4. **Deploy**
```bash
firebase deploy --only hosting
```

5. **Your site is live!**
```
Hosting URL: https://YOUR_PROJECT_ID.web.app
```

**Custom Domain:**
```bash
firebase hosting:channel:deploy production
```

Then add your domain in Firebase Console → Hosting → Add custom domain

---

### Option 2: Netlify

**Pros:** Free tier, drag-and-drop deployment, automatic SSL, continuous deployment

**Steps:**

1. **Go to [Netlify](https://www.netlify.com/)**

2. **Drag and Drop**
   - Zip your project folder
   - Drag to Netlify drop zone
   - Site deploys instantly

3. **Or Connect Git Repository**
   - Push code to GitHub
   - Connect repository in Netlify
   - Auto-deploys on every push

4. **Configure Build Settings**
   - Build command: (leave empty)
   - Publish directory: `.`

5. **Add Environment Variables** (if needed)
   - Site settings → Environment variables
   - Add Firebase config (optional)

6. **Custom Domain**
   - Site settings → Domain management
   - Add custom domain
   - Update DNS records

**Your site is live!**
```
URL: https://your-site-name.netlify.app
```

---

### Option 3: Vercel

**Pros:** Free tier, excellent performance, automatic SSL, serverless functions

**Steps:**

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
vercel
```

Follow prompts:
- Set up and deploy: `Y`
- Which scope: (select your account)
- Link to existing project: `N`
- Project name: `media-ecommerce`
- Directory: `./`
- Override settings: `N`

3. **Production Deployment**
```bash
vercel --prod
```

4. **Custom Domain**
```bash
vercel domains add yourdomain.com
```

**Your site is live!**
```
URL: https://media-ecommerce.vercel.app
```

---

### Option 4: GitHub Pages

**Pros:** Free, integrated with GitHub, simple setup

**Steps:**

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/media-ecommerce.git
git push -u origin main
```

2. **Enable GitHub Pages**
   - Go to repository settings
   - Scroll to "Pages"
   - Source: Deploy from branch
   - Branch: `main`, folder: `/ (root)`
   - Save

3. **Wait 2-3 minutes**

**Your site is live!**
```
URL: https://yourusername.github.io/media-ecommerce/
```

**Note:** Update all links if deployed to subdirectory:
- Change `href="index.html"` to `href="/media-ecommerce/index.html"`

---

### Option 5: Traditional Web Hosting

**Pros:** Full control, can use existing hosting

**Steps:**

1. **Prepare Files**
   - Ensure all paths are relative
   - Test locally one more time

2. **Upload via FTP**
   - Use FileZilla or similar
   - Upload all files to `public_html` or `www`
   - Maintain folder structure

3. **Configure Domain**
   - Point domain to hosting server
   - Update DNS A records
   - Wait for DNS propagation (24-48 hours)

4. **Enable HTTPS**
   - Install SSL certificate (Let's Encrypt is free)
   - Force HTTPS redirect

**Your site is live!**
```
URL: https://yourdomain.com
```

---

## 🔒 Post-Deployment Security

### 1. Update Firebase Authorized Domains

Firebase Console → Authentication → Settings → Authorized domains

Add your production domain:
```
yourdomain.com
www.yourdomain.com
```

### 2. Set Up Firebase Security Rules

If using Firestore in the future:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /orders/{orderId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

### 3. Enable Firebase App Check

Protects your Firebase resources from abuse:

1. Go to Firebase Console → App Check
2. Register your app
3. Enable reCAPTCHA v3
4. Add enforcement

### 4. Content Security Policy

Add to your HTML `<head>`:

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://www.gstatic.com; 
               style-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com; 
               img-src 'self' https: data:; 
               connect-src 'self' https://*.googleapis.com https://*.firebaseio.com;">
```

---

## 📊 Performance Optimization

### 1. Enable Caching

**Firebase Hosting** (already configured in `firebase.json`):
```json
{
  "headers": [{
    "source": "**/*.@(js|css)",
    "headers": [{
      "key": "Cache-Control",
      "value": "max-age=31536000"
    }]
  }]
}
```

**Netlify** (`netlify.toml`):
```toml
[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000"
```

### 2. Optimize Images

Use image CDN or optimize locally:
```bash
# Install imagemin
npm install -g imagemin-cli

# Optimize images
imagemin images/* --out-dir=images/optimized
```

### 3. Enable Compression

Most hosting providers enable gzip automatically. Verify:
```bash
curl -H "Accept-Encoding: gzip" -I https://yourdomain.com
```

Should see: `Content-Encoding: gzip`

---

## 📈 Monitoring & Analytics

### 1. Google Analytics

Add to all HTML pages before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 2. Firebase Analytics

Already included with Firebase SDK. Enable in Firebase Console.

### 3. Error Tracking

Add Sentry for error monitoring:

```html
<script src="https://browser.sentry-cdn.com/7.x.x/bundle.min.js"></script>
<script>
  Sentry.init({ dsn: 'YOUR_SENTRY_DSN' });
</script>
```

---

## 🔄 Continuous Deployment

### GitHub Actions (for Firebase)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Firebase Hosting

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: your-project-id
```

### Netlify (Automatic)

Just push to GitHub - Netlify auto-deploys!

---

## 🧪 Testing Production

After deployment, test:

1. **All Pages Load**
   - [ ] Home page
   - [ ] Products page
   - [ ] Product details
   - [ ] Cart
   - [ ] Auth
   - [ ] Profile

2. **All Features Work**
   - [ ] Search products
   - [ ] Filter by category
   - [ ] Add to cart
   - [ ] Cart persists
   - [ ] Register account
   - [ ] Login
   - [ ] Social login
   - [ ] View profile
   - [ ] Sign out

3. **Performance**
   - [ ] Page load < 3 seconds
   - [ ] Images load quickly
   - [ ] No console errors
   - [ ] Mobile responsive

4. **Security**
   - [ ] HTTPS enabled
   - [ ] Firebase auth works
   - [ ] No exposed credentials

---

## 🐛 Troubleshooting

### Issue: Firebase Auth Not Working

**Solution:**
1. Check Firebase config in `js/config.js`
2. Verify domain in Firebase authorized domains
3. Check browser console for errors

### Issue: Images Not Loading

**Solution:**
1. Check image URLs are accessible
2. Verify CORS headers
3. Use CDN or relative paths

### Issue: Cart Not Persisting

**Solution:**
1. Check localStorage is enabled
2. Verify no browser extensions blocking
3. Check for console errors

### Issue: Slow Load Times

**Solution:**
1. Enable caching headers
2. Optimize images
3. Use CDN for assets
4. Enable compression

---

## 📞 Support

- **Firebase:** https://firebase.google.com/support
- **Netlify:** https://www.netlify.com/support/
- **Vercel:** https://vercel.com/support

---

## ✅ Deployment Checklist

Before going live:
- [ ] Firebase configured
- [ ] All features tested
- [ ] Domain configured
- [ ] SSL enabled
- [ ] Analytics added
- [ ] Error tracking set up
- [ ] Performance optimized
- [ ] Security headers added
- [ ] Backup created
- [ ] Documentation updated

---

**Congratulations! Your e-commerce platform is now live! 🎉**