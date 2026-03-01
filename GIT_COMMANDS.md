# 🚀 Git Commands - Push to GitHub

## 📋 خطوات رفع المشروع على GitHub

### 1️⃣ تهيئة Git (إذا لم يكن مهيأ)
```bash
git init
```

### 2️⃣ إضافة جميع الملفات
```bash
git add .
```

### 3️⃣ عمل Commit
```bash
git commit -m "Initial commit: Clean e-commerce project with Firebase"
```

### 4️⃣ إضافة Remote Repository
```bash
# استبدل USERNAME باسم المستخدم و REPO-NAME باسم المشروع
git remote add origin https://github.com/USERNAME/REPO-NAME.git
```

### 5️⃣ رفع الملفات على GitHub
```bash
git push -u origin main
```

---

## 🔄 إذا كان الـ Branch اسمه master بدلاً من main

```bash
git branch -M main
git push -u origin main
```

---

## 📝 Commits مقترحة للتحديثات

### بعد إضافة ميزة جديدة:
```bash
git add .
git commit -m "feat: Add new feature name"
git push
```

### بعد إصلاح bug:
```bash
git add .
git commit -m "fix: Fix bug description"
git push
```

### بعد تحديث التصميم:
```bash
git add .
git commit -m "style: Update UI/UX design"
git push
```

### بعد تحديث التوثيق:
```bash
git add .
git commit -m "docs: Update documentation"
git push
```

---

## 🎯 الأوامر الكاملة من البداية

```bash
# 1. تهيئة Git
git init

# 2. إضافة جميع الملفات
git add .

# 3. أول Commit
git commit -m "🎉 Initial commit: Media E-Commerce Store

Features:
- Product catalog with search
- Shopping cart functionality
- User authentication (Firebase)
- Contact form with EmailJS
- Dark/Light mode toggle
- Arabic/English support
- Lazy loading images
- Responsive design
- Security features
- CSS animations"

# 4. إضافة Remote (استبدل USERNAME و REPO-NAME)
git remote add origin https://github.com/USERNAME/REPO-NAME.git

# 5. تغيير اسم Branch إلى main
git branch -M main

# 6. رفع الملفات
git push -u origin main
```

---

## 🔍 التحقق من الحالة

```bash
# معرفة حالة الملفات
git status

# معرفة الـ Remote المضاف
git remote -v

# معرفة الـ Commits
git log --oneline
```

---

## ⚠️ ملاحظات مهمة

### 1. ملف .gitignore
تأكد من وجود `.gitignore` يحتوي على:
```
node_modules/
.env
js/config.js
.DS_Store
*.log
```

### 2. حماية المفاتيح
❌ لا ترفع `js/config.js` مع المفاتيح الحقيقية!

✅ بدلاً من ذلك، أنشئ `js/config.example.js`:
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

---

## 📦 إنشاء Repository على GitHub

### الخطوات:
1. اذهب إلى: https://github.com/new
2. اسم المشروع: `media-ecommerce` (أو أي اسم)
3. الوصف: `Modern e-commerce store with Firebase`
4. اختر: Public أو Private
5. ❌ لا تضف README (موجود بالفعل)
6. اضغط "Create repository"
7. انسخ الـ URL واستخدمه في الأمر:
   ```bash
   git remote add origin [URL]
   ```

---

## 🎨 مثال كامل

```bash
# في مجلد المشروع
cd D:\E-eco

# تهيئة Git
git init

# إضافة الملفات
git add .

# Commit
git commit -m "🎉 Initial commit: Media E-Commerce Store"

# إضافة GitHub Remote
git remote add origin https://github.com/YourUsername/media-ecommerce.git

# تغيير Branch
git branch -M main

# رفع الملفات
git push -u origin main
```

---

## ✅ بعد الرفع الناجح

سيكون المشروع متاح على:
```
https://github.com/YourUsername/media-ecommerce
```

---

## 🔄 التحديثات المستقبلية

```bash
# بعد أي تعديل:
git add .
git commit -m "وصف التعديل"
git push
```

---

**تم التوثيق بواسطة Kiro AI 🤖**
