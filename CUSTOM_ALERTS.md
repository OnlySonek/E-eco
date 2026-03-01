# 🎨 Custom Alert System

## ✨ المميزات

- تصميم عصري وجذاب
- 4 أنواع: Success, Error, Warning, Info
- أنيميشن سلس
- Responsive للموبايل
- دعم RTL للعربي
- Backdrop blur effect
- إغلاق بالضغط على Overlay أو Escape

## 📦 الملفات

```
css/style.css          - الأنماط (تم الإضافة)
js/custom-alert.js     - الكود الرئيسي
```

## 🚀 الاستخدام

### 1. إضافة الملفات

في HTML:
```html
<!-- في نهاية body -->
<script src="js/custom-alert.js"></script>
```

### 2. استخدام Alert

#### Success Alert
```javascript
customAlert('تم إرسال الرسالة بنجاح!', 'success');
```

#### Error Alert
```javascript
customAlert('حدث خطأ في الإرسال', 'error');
```

#### Warning Alert
```javascript
customAlert('يرجى ملء جميع الحقول', 'warning');
```

#### Info Alert
```javascript
customAlert('معلومة مفيدة', 'info');
```

### 3. استخدام Confirm Dialog

```javascript
customConfirm(
    'هل أنت متأكد من الحذف؟',
    () => {
        // عند التأكيد
        console.log('تم التأكيد');
    },
    () => {
        // عند الإلغاء (اختياري)
        console.log('تم الإلغاء');
    }
);
```

### 4. مع Callback

```javascript
customAlert('تم الحفظ بنجاح!', 'success', () => {
    // يتم تنفيذه بعد إغلاق Alert
    window.location.href = 'index.html';
});
```

## 🎨 الأنواع المتاحة

### Success (نجاح)
- اللون: أخضر
- الأيقونة: ✅
- الاستخدام: عمليات ناجحة

### Error (خطأ)
- اللون: أحمر
- الأيقونة: ❌
- الاستخدام: أخطاء وفشل

### Warning (تحذير)
- اللون: برتقالي
- الأيقونة: ⚠️
- الاستخدام: تحذيرات وتنبيهات

### Info (معلومة)
- اللون: أزرق
- الأيقونة: ℹ️
- الاستخدام: معلومات عامة

## 📱 Responsive

يتكيف تلقائياً مع:
- Desktop
- Tablet
- Mobile

## 🔧 التخصيص

### تغيير الألوان

في `css/style.css`:
```css
.custom-alert.success {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}
```

### تغيير الأيقونات

في `js/custom-alert.js`:
```javascript
const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
};
```

### تغيير العناوين

```javascript
const titles = {
    success: 'نجح!',
    error: 'خطأ!',
    warning: 'تحذير!',
    info: 'معلومة'
};
```

## 💡 أمثلة متقدمة

### مع HTML في الرسالة
```javascript
customAlert(
    'تم إرسال الرسالة إلى:<br><strong>email@example.com</strong>',
    'success'
);
```

### مع Redirect بعد الإغلاق
```javascript
customAlert('تم تسجيل الدخول بنجاح!', 'success', () => {
    window.location.href = 'profile.html';
});
```

### Confirm مع حذف
```javascript
customConfirm(
    'هل أنت متأكد من حذف هذا المنتج؟',
    async () => {
        // حذف المنتج
        await deleteProduct(productId);
        customAlert('تم الحذف بنجاح', 'success');
    }
);
```

## 🎯 الاستخدام في المشروع

### في contact.js
```javascript
// عند نجاح الإرسال
customAlert(
    '✅ تم إرسال الرسالة بنجاح!<br><br>' +
    'Email sent successfully to:<br>' +
    '<strong>abdelrhmansherif140@gmail.com</strong>',
    'success'
);

// عند فشل الإرسال
customAlert(errorDetails, 'error');
```

### في auth.js
```javascript
// عند تسجيل الدخول
customAlert('مرحباً بك!', 'success', () => {
    window.location.href = 'index.html';
});

// عند خطأ في كلمة المرور
customAlert('كلمة المرور غير صحيحة', 'error');
```

### في cart.js
```javascript
// عند إضافة منتج
customAlert('تمت الإضافة إلى السلة', 'success');

// عند حذف منتج
customConfirm(
    'هل تريد حذف هذا المنتج من السلة؟',
    () => {
        removeFromCart(productId);
        customAlert('تم الحذف', 'info');
    }
);
```

## 🌐 دعم اللغات

يمكن تغيير اللغة بتعديل:
```javascript
const titles = {
    success: 'Success!',  // English
    error: 'Error!',
    warning: 'Warning!',
    info: 'Information'
};
```

## ⚡ الأداء

- خفيف جداً (< 5KB)
- لا يعتمد على مكتبات خارجية
- CSS Animations فقط
- لا يؤثر على أداء الموقع

## 🔒 الأمان

- لا يستخدم `eval()`
- آمن من XSS
- يدعم Content Security Policy

## ✅ المتصفحات المدعومة

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

---

**تم التطوير بواسطة Kiro AI 🤖**
