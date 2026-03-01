# 📧 دليل إعداد EmailJS - Email Setup Guide

## 🎯 الهدف
إرسال رسائل الـ Contact Form مباشرة لإيميلك: **abdelrhmansherif140@gmail.com**

---

## ✅ ما تم عمله

تم تطبيق نظام إرسال الرسائل باستخدام **EmailJS** (خدمة مجانية):
- ✅ تكامل EmailJS في contact.html
- ✅ تعديل js/contact.js لإرسال الإيميلات
- ✅ حفظ نسخة احتياطية في Firestore
- ✅ رسائل نجاح وخطأ واضحة

---

## 🚀 خطوات الإعداد (5 دقائق)

### الخطوة 1: إنشاء حساب EmailJS

1. اذهب إلى: https://www.emailjs.com/
2. اضغط **Sign Up** (مجاني 200 إيميل/شهر)
3. سجل بإيميلك أو Google
4. تأكد من الإيميل

---

### الخطوة 2: إضافة Email Service

1. بعد تسجيل الدخول، اذهب لـ **Email Services**
2. اضغط **Add New Service**
3. اختر **Gmail** (أو أي خدمة تستخدمها)
4. اضغط **Connect Account**
5. سجل دخول بحساب Gmail: **abdelrhmansherif140@gmail.com**
6. اسمح بالصلاحيات
7. احفظ الـ **Service ID** (مثل: `service_abc123`)

---

### الخطوة 3: إنشاء Email Template

1. اذهب لـ **Email Templates**
2. اضغط **Create New Template**
3. استخدم هذا Template:

```
Subject: New Contact Form Message: {{subject}}

From: {{from_name}}
Email: {{from_email}}

Subject: {{subject}}

Message:
{{message}}

---
This message was sent from Media Store Contact Form
Reply to: {{from_email}}
```

4. في الـ **Settings**:
   - **To Email**: `abdelrhmansherif140@gmail.com`
   - **From Name**: `Media Store`
   - **Reply To**: `{{reply_to}}`

5. اضغط **Save**
6. احفظ الـ **Template ID** (مثل: `template_xyz789`)

---

### الخطوة 4: الحصول على Public Key

1. اذهب لـ **Account** → **General**
2. انسخ الـ **Public Key** (مثل: `user_AbCdEfGhIjKlMnOp`)

---

### الخطوة 5: تحديث الكود

#### في `contact.html`:
```html
<script>
    // Initialize EmailJS
    (function(){
        emailjs.init("YOUR_PUBLIC_KEY"); // استبدل بالـ Public Key بتاعك
    })();
</script>
```

استبدل `YOUR_PUBLIC_KEY` بالمفتاح الحقيقي.

#### في `js/contact.js`:
```javascript
const response = await emailjs.send(
    'YOUR_SERVICE_ID',      // استبدل بالـ Service ID
    'YOUR_TEMPLATE_ID',     // استبدل بالـ Template ID
    templateParams
);
```

استبدل:
- `YOUR_SERVICE_ID` بالـ Service ID
- `YOUR_TEMPLATE_ID` بالـ Template ID

---

## 📝 مثال كامل

### contact.html:
```html
<script>
    (function(){
        emailjs.init("user_AbCdEfGhIjKlMnOp"); // مثال
    })();
</script>
```

### js/contact.js:
```javascript
const response = await emailjs.send(
    'service_abc123',      // Service ID
    'template_xyz789',     // Template ID
    templateParams
);
```

---

## 🧪 الاختبار

### 1. اختبار من الموقع:
```
1. افتح contact.html
2. املأ الفورم:
   - Name: Test User
   - Email: test@example.com
   - Subject: Test Message
   - Message: This is a test
3. اضغط Send Message
4. انتظر رسالة النجاح
```

### 2. تحقق من الإيميل:
```
1. افتح Gmail: abdelrhmansherif140@gmail.com
2. ابحث عن رسالة جديدة
3. يجب أن تجد الرسالة من Media Store
```

### 3. اختبار من EmailJS Dashboard:
```
1. اذهب لـ Email Templates
2. افتح الـ template بتاعك
3. اضغط Test It
4. املأ البيانات
5. اضغط Send Test Email
```

---

## 🎨 كيف يعمل

### 1. المستخدم يملأ الفورم:
```
Name: John Doe
Email: john@example.com
Subject: Product Inquiry
Message: I want to know about...
```

### 2. JavaScript يرسل لـ EmailJS:
```javascript
emailjs.send('service_id', 'template_id', {
    from_name: 'John Doe',
    from_email: 'john@example.com',
    subject: 'Product Inquiry',
    message: 'I want to know about...',
    to_email: 'abdelrhmansherif140@gmail.com'
});
```

### 3. EmailJS يرسل الإيميل:
```
To: abdelrhmansherif140@gmail.com
From: Media Store
Subject: New Contact Form Message: Product Inquiry

From: John Doe
Email: john@example.com

Message:
I want to know about...
```

### 4. تحصل على الإيميل في Gmail! ✅

---

## 🔒 الأمان

### EmailJS آمن لأنه:
- ✅ لا يكشف بيانات حساسة
- ✅ Public Key فقط في الكود
- ✅ Rate limiting (200 إيميل/شهر مجاناً)
- ✅ CAPTCHA اختياري لمنع الـ spam

### نصائح أمان:
```javascript
// 1. استخدم CAPTCHA في الفورم
// 2. Validate البيانات قبل الإرسال
// 3. Rate limit من الـ frontend
// 4. راقب الـ EmailJS dashboard
```

---

## 💰 الأسعار

### Free Plan (مجاني):
- ✅ 200 إيميل/شهر
- ✅ 2 Email Services
- ✅ 2 Email Templates
- ✅ EmailJS branding

### Personal Plan ($9/شهر):
- ✅ 1,000 إيميل/شهر
- ✅ Unlimited Services
- ✅ Unlimited Templates
- ✅ No branding
- ✅ Priority support

**للبداية، الـ Free Plan كافي جداً!**

---

## 🐛 Troubleshooting

### المشكلة: EmailJS not defined
**الحل:**
```html
<!-- تأكد إن الـ script موجود قبل contact.js -->
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
```

### المشكلة: Failed to send email
**الحل:**
```javascript
// تحقق من:
1. Public Key صحيح
2. Service ID صحيح
3. Template ID صحيح
4. Gmail متصل في EmailJS Dashboard
```

### المشكلة: الإيميل لا يصل
**الحل:**
```
1. تحقق من Spam folder
2. تحقق من EmailJS Dashboard → History
3. تأكد إن الـ To Email صحيح في Template
4. جرب Test Email من Dashboard
```

### المشكلة: Rate limit exceeded
**الحل:**
```
- انتظر حتى الشهر القادم
- أو upgrade للـ Personal Plan
- أو استخدم حساب EmailJS آخر
```

---

## 📊 مراقبة الإيميلات

### في EmailJS Dashboard:
```
1. اذهب لـ History
2. شوف جميع الإيميلات المرسلة
3. Status: Success / Failed
4. Error messages لو في مشاكل
```

### في Gmail:
```
1. إنشاء Label: "Media Store Messages"
2. إنشاء Filter:
   - From: noreply@emailjs.com
   - Subject: New Contact Form Message
   - Apply label: Media Store Messages
3. كل الرسائل هتتجمع في مكان واحد
```

---

## 🎯 Template Variables

يمكنك استخدام هذه المتغيرات في الـ Template:

```
{{from_name}}       - اسم المرسل
{{from_email}}      - إيميل المرسل
{{subject}}         - الموضوع
{{message}}         - الرسالة
{{to_email}}        - إيميلك
{{reply_to}}        - للرد المباشر
```

---

## 🔄 بدائل EmailJS

إذا أردت بدائل:

### 1. Formspree (https://formspree.io/)
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
    <!-- form fields -->
</form>
```

### 2. Netlify Forms (إذا كنت تستخدم Netlify)
```html
<form netlify>
    <!-- form fields -->
</form>
```

### 3. SendGrid API
```javascript
// يحتاج backend
fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer YOUR_API_KEY'
    }
});
```

**لكن EmailJS هو الأسهل والأفضل للـ frontend فقط!**

---

## ✅ Checklist

- [ ] أنشأت حساب EmailJS
- [ ] أضفت Gmail Service
- [ ] أنشأت Email Template
- [ ] نسخت Public Key
- [ ] نسخت Service ID
- [ ] نسخت Template ID
- [ ] حدثت contact.html
- [ ] حدثت js/contact.js
- [ ] اختبرت من الموقع
- [ ] استلمت الإيميل في Gmail
- [ ] أنشأت Filter في Gmail (اختياري)

---

## 📞 الدعم

### EmailJS Support:
- Documentation: https://www.emailjs.com/docs/
- Support: support@emailjs.com

### إذا واجهت مشكلة:
1. تحقق من Console (F12)
2. تحقق من EmailJS Dashboard → History
3. اقرأ الـ error message
4. ابحث في EmailJS Docs

---

## 🎉 النتيجة

بعد الإعداد:
- ✅ أي رسالة من الفورم تصل لإيميلك مباشرة
- ✅ نسخة احتياطية في Firestore
- ✅ رسائل نجاح وخطأ واضحة
- ✅ تجربة مستخدم احترافية
- ✅ مجاني 100%

**استمتع بالرسائل! 📧**

---

**تم التطوير بواسطة Kiro AI 🤖**
**Email System: Professional ✉️**
