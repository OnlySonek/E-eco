# 🎨 الموقع الديناميكي مع انيميشنز GSAP ودعم اللغات

## 🚀 التحديثات الجديدة

تم تحديث الموقع بالكامل ليصبح ديناميكي وجذاب مع:

### ✨ انيميشنز احترافية باستخدام GSAP
- انيميشن دخول سلس للصفحة
- تأثيرات hover ثلاثية الأبعاد على المنتجات
- انيميشنز scroll-triggered
- تأثيرات stagger للعناصر المتعددة
- انيميشنز floating للشعار
- تأثيرات ripple على الأزرار

### 🌍 دعم اللغتين العربية والإنجليزية
- تبديل سلس بين اللغات
- دعم كامل للـ RTL
- حفظ اللغة المختارة
- ترجمة تلقائية لجميع العناصر

## 📁 الملفات الجديدة

```
js/
├── animations.js          # ملف الانيميشنز الرئيسي
├── i18n.js               # نظام اللغات والترجمة
└── (تحديثات على الملفات الموجودة)

css/
└── style.css             # إضافة دعم RTL وانيميشنز CSS

animation-demo.html        # صفحة تجريبية للانيميشنز
ANIMATIONS_AND_I18N_GUIDE.md  # دليل شامل
```

## 🎯 كيفية الاستخدام

### 1. افتح الموقع
```bash
# افتح index.html في المتصفح
```

### 2. جرب الانيميشنز
- شاهد انيميشن دخول الصفحة
- مرر الماوس على المنتجات
- اسكرول لأسفل لرؤية scroll animations
- اضغط على الأزرار لرؤية ripple effect

### 3. جرب تبديل اللغة
- اضغط على زر اللغة (🌐) في الـ Navbar
- شاهد التحول السلس للعربية
- لاحظ تغيير الاتجاه إلى RTL

### 4. صفحة التجربة
افتح `animation-demo.html` لرؤية جميع الانيميشنز المتاحة

## 🎨 الانيميشنز المتاحة

### 1. Navbar Animations
```javascript
- Slide down من أعلى
- Stagger للروابط
- Scale للأيقونات
```

### 2. Hero Section
```javascript
- Fade in للعناوين
- Slide up للنصوص
- Scale للأزرار
```

### 3. Product Cards
```javascript
- Scroll-triggered animation
- 3D hover effect
- Image zoom on hover
- Stagger on load
```

### 4. Categories
```javascript
- Scale animation
- Hover with shadow
- Float effect
```

### 5. Special Effects
```javascript
- Floating logo
- Gradient shift
- Ripple on click
- Pulse for cart badge
```

## 🌐 نظام اللغات

### الترجمات المتاحة:
- ✅ Navbar (الروابط والأزرار)
- ✅ Hero Section (العناوين والنصوص)
- ✅ Products (المنتجات والأزرار)
- ✅ Categories (الفئات)
- ✅ Cart (السلة والرسائل)
- ✅ Footer (التذييل)

### إضافة ترجمة جديدة:

1. افتح `js/i18n.js`
2. أضف الترجمة:
```javascript
const translations = {
    en: {
        'your.key': 'English Text'
    },
    ar: {
        'your.key': 'النص العربي'
    }
};
```

3. استخدمها في HTML:
```html
<element data-i18n="your.key">Default Text</element>
```

## 🎬 أمثلة على الاستخدام

### استخدام الانيميشنز في كود جديد:

```javascript
import { animateProducts, animateToast } from './animations.js';

// انيميشن المنتجات
animateProducts();

// انيميشن الإشعارات
const toast = document.getElementById('toast');
animateToast(toast);
```

### استخدام الترجمة في كود جديد:

```javascript
import { t } from './i18n.js';

// الحصول على ترجمة
const text = t('products.addtocart');
console.log(text); // "Add to Cart" or "أضف للسلة"
```

## 📱 التوافق

- ✅ Chrome, Firefox, Safari, Edge
- ✅ الأجهزة المحمولة (iOS & Android)
- ✅ الأجهزة اللوحية
- ✅ أجهزة الكمبيوتر

## 🔧 التخصيص

### تعديل سرعة الانيميشنز:
```javascript
// في js/animations.js
gsap.from('.element', {
    duration: 1.5, // غير هذا الرقم (بالثواني)
    ease: 'power3.out'
});
```

### تعديل الترجمات:
```javascript
// في js/i18n.js
const translations = {
    ar: {
        'nav.home': 'الصفحة الرئيسية' // عدل النص هنا
    }
};
```

## 🎯 الميزات الرئيسية

### 1. Performance
- ⚡ انيميشنز محسنة للأداء
- ⚡ Lazy loading للصور
- ⚡ Code splitting

### 2. User Experience
- 🎨 انيميشنز سلسة وجذابة
- 🌍 دعم متعدد اللغات
- 📱 Responsive design

### 3. Developer Experience
- 📝 كود نظيف ومنظم
- 🔧 سهل التخصيص
- 📚 موثق بالكامل

## 🐛 حل المشاكل

### المشكلة: الانيميشنز لا تعمل
```
الحل:
1. تأكد من تحميل GSAP في HTML
2. افتح Console وتحقق من الأخطاء
3. تأكد من استيراد animations.js بشكل صحيح
```

### المشكلة: اللغة لا تتغير
```
الحل:
1. تحقق من وجود data-i18n attributes
2. تأكد من استيراد i18n.js
3. امسح cache المتصفح
```

### المشكلة: RTL لا يعمل
```
الحل:
1. أعد تحميل الصفحة بعد تغيير اللغة
2. تحقق من CSS للـ RTL
3. تأكد من تحديث dir attribute
```

## 📞 الدعم

للمساعدة أو الاستفسارات:
1. راجع `ANIMATIONS_AND_I18N_GUIDE.md`
2. افتح `animation-demo.html` للأمثلة
3. تحقق من Console للأخطاء

## 🎉 الخلاصة

الموقع الآن:
- ✅ ديناميكي بالكامل مع انيميشنز احترافية
- ✅ يدعم اللغتين العربية والإنجليزية
- ✅ تجربة مستخدم ممتازة
- ✅ كود نظيف وقابل للتطوير

---

**استمتع بالموقع الجديد! 🚀**

تم التطوير بواسطة Kiro AI 🤖
