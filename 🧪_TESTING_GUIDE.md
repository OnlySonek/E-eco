# 🧪 دليل الاختبار - Testing Guide

## 🎯 المشكلة الحالية

الـ Navbar مش ظاهر في `index.html` - بس الـ carousel ظاهر.

---

## 📋 خطوات الاختبار

### 1️⃣ اختبار الـ Navbar البسيط
```bash
# افتح هذا الملف أولاً
index-simple-test.html
```

**ما المتوقع:**
- ✅ Navbar ظاهر في أعلى الصفحة
- ✅ 3 checkmarks خضراء
- ✅ Links واضحة

**لو مش شغال:**
- المشكلة في الـ CSS أو Tailwind
- تحقق من Console (F12)

---

### 2️⃣ اختبار الـ Navbar المتقدم
```bash
# افتح هذا الملف ثانياً
test-navbar.html
```

**ما المتوقع:**
- ✅ Navbar ظاهر وثابت
- ✅ يمكن الـ scroll
- ✅ Hover effects شغالة

**لو مش شغال:**
- المشكلة في الـ fixed positioning
- تحقق من z-index

---

### 3️⃣ اختبار نظام اللغات
```bash
# افتح هذا الملف ثالثاً
test-i18n.html
```

**ما المتوقع:**
- ✅ زر تبديل اللغة شغال
- ✅ النصوص بتتترجم
- ✅ RTL/LTR بيتغير

**لو مش شغال:**
- المشكلة في js/i18n.js
- تحقق من Console

---

### 4️⃣ اختبار الصفحة الرئيسية
```bash
# افتح هذا الملف أخيراً
index.html
```

**ما المتوقع:**
- ✅ Navbar ظاهر
- ✅ Hero carousel شغال
- ✅ Products بتظهر
- ✅ Animations شغالة

**لو مش شغال:**
- راجع الخطوات السابقة
- تحقق من Console للـ errors

---

## 🔍 Debugging Steps

### الخطوة 1: افتح Console (F12)
```javascript
// اكتب هذه الأوامر في Console:

// 1. تحقق من وجود الـ Navbar
console.log('Navbar:', document.querySelector('.navbar-glass'));

// 2. تحقق من الـ styles
const nav = document.querySelector('.navbar-glass');
console.log('Display:', window.getComputedStyle(nav).display);
console.log('Position:', window.getComputedStyle(nav).position);
console.log('Z-index:', window.getComputedStyle(nav).zIndex);

// 3. تحقق من GSAP
console.log('GSAP:', window.gsap);

// 4. تحقق من i18n
console.log('i18n:', window.initI18n);
```

### الخطوة 2: تحقق من الملفات
```bash
# تأكد من وجود هذه الملفات:
css/style.css
js/animations.js
js/i18n.js
js/main.js
js/home.js
```

### الخطوة 3: تحقق من الـ Network
- افتح Network tab في DevTools
- أعد تحميل الصفحة
- تأكد من تحميل جميع الملفات (200 OK)

---

## 🐛 المشاكل الشائعة والحلول

### المشكلة 1: Navbar مش ظاهر
**الأسباب المحتملة:**
- CSS مش محمل
- z-index منخفض
- display: none
- opacity: 0

**الحل:**
```css
/* في css/style.css */
.navbar-glass {
    display: block !important;
    visibility: visible !important;
    z-index: 9999 !important;
    opacity: 1 !important;
}
```

### المشكلة 2: Animations بتخبي الـ Navbar
**الأسباب المحتملة:**
- GSAP animation بتبدأ من opacity: 0
- Animation مش بتكمل

**الحل:**
```javascript
// عطل الـ animations مؤقتاً
// في index.html، علق على:
// <script src="js/animations.js"></script>
```

### المشكلة 3: اللغة مش بتتغير
**الأسباب المحتملة:**
- i18n.js مش محمل
- data-i18n attributes مش موجودة

**الحل:**
```html
<!-- تأكد من وجود data-i18n -->
<span data-i18n="nav.home">Home</span>
```

---

## ✅ Quick Fixes

### Fix 1: عطل الـ Animations
```html
<!-- في index.html، علق على السطر ده: -->
<!-- <script src="js/animations.js"></script> -->
```

### Fix 2: عطل الـ i18n
```html
<!-- في index.html، علق على السطر ده: -->
<!-- <script src="js/i18n.js"></script> -->
```

### Fix 3: استخدم CSS مباشر
```html
<nav class="navbar-glass" style="
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    z-index: 9999 !important;
    background: rgba(15, 23, 42, 0.95) !important;
    display: block !important;
">
```

---

## 📊 Checklist النهائي

### قبل ما تفتح index.html:
- [ ] جربت index-simple-test.html
- [ ] جربت test-navbar.html
- [ ] جربت test-i18n.html
- [ ] فتحت Console وشفت الـ errors
- [ ] تأكدت من تحميل جميع الملفات

### لو كل حاجة شغالة في الـ test files:
- [ ] امسح cache المتصفح
- [ ] اعمل Hard Refresh (Ctrl+Shift+R)
- [ ] جرب متصفح تاني
- [ ] تأكد من آخر نسخة من الملفات

---

## 🚨 Emergency Fix

لو لسه مفيش حاجة شغالة، استخدم هذا الـ inline CSS:

```html
<!-- ضع هذا في <head> في index.html -->
<style>
    .navbar-glass {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        width: 100% !important;
        z-index: 99999 !important;
        background: rgba(15, 23, 42, 0.95) !important;
        backdrop-filter: blur(12px) !important;
        border-bottom: 1px solid rgba(148, 163, 184, 0.1) !important;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
    }
    
    .nav-link {
        color: #e2e8f0 !important;
        display: inline-block !important;
    }
    
    body {
        padding-top: 0 !important;
    }
    
    section:first-of-type {
        margin-top: 80px !important;
    }
</style>
```

---

## 📞 الدعم

### لو لسه في مشكلة:
1. افتح Console (F12)
2. اعمل screenshot للـ errors
3. اعمل screenshot للـ Network tab
4. اعمل screenshot للـ Elements tab (الـ navbar)

### معلومات مفيدة للـ debugging:
```javascript
// اكتب في Console:
console.log({
    navbar: document.querySelector('.navbar-glass'),
    gsap: window.gsap,
    i18n: window.initI18n,
    styles: window.getComputedStyle(document.querySelector('.navbar-glass'))
});
```

---

**Good Luck! 🍀**
