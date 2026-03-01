# 🔥 دليل Firebase Firestore Security Rules

## 📋 نظرة عامة

تم إنشاء قواعد أمان احترافية للـ Firestore تحقق جميع المتطلبات!

---

## ✅ المتطلبات المحققة

### 1️⃣ قراءة المنتجات للجميع
```javascript
match /products/{productId} {
  allow read: if true; // ✅ أي حد يقدر يقرأ
}
```

### 2️⃣ السلة للمستخدمين المسجلين فقط
```javascript
match /users/{userId}/cart/{cartItemId} {
  allow read, write: if isOwner(userId); // ✅ لازم يكون مسجل
}
```

### 3️⃣ تعديل البروفايل للمستخدم نفسه
```javascript
match /users/{userId} {
  allow update: if isOwner(userId); // ✅ المستخدم نفسه فقط
}
```

### 4️⃣ المنتجات للأدمن فقط
```javascript
match /products/{productId} {
  allow create, update, delete: if isAdmin(); // ✅ أدمن فقط
}
```

### 5️⃣ منع الكتابة العشوائية
```javascript
match /{document=**} {
  allow read, write: if false; // ✅ أي حاجة تانية ممنوعة
}
```

---

## 🎯 Collections المحمية

### 1. Products (المنتجات)
| العملية | الصلاحية | الشرط |
|---------|----------|-------|
| Read | ✅ الجميع | بدون شروط |
| Create | ✅ Admin فقط | لازم يكون admin + بيانات صحيحة |
| Update | ✅ Admin فقط | لازم يكون admin + بيانات صحيحة |
| Delete | ✅ Admin فقط | لازم يكون admin |

**Validation:**
- ✅ `name` مطلوب
- ✅ `price` رقم أكبر من 0
- ✅ `category` مطلوب
- ✅ `description` مطلوب
- ✅ `stock` رقم >= 0

---

### 2. Users (المستخدمين)
| العملية | الصلاحية | الشرط |
|---------|----------|-------|
| Read | ✅ المستخدم نفسه أو Admin | `isOwner()` أو `isAdmin()` |
| Create | ✅ المستخدم نفسه | عند التسجيل فقط |
| Update | ✅ المستخدم نفسه | ماعدا `role` و `email` |
| Delete | ✅ Admin فقط | لازم يكون admin |

**Protected Fields:**
- 🔒 `role` - مايتغيرش (للأمان)
- 🔒 `email` - مايتغيرش (للأمان)
- 🔒 `createdAt` - مايتغيرش

---

### 3. Cart (السلة)
| العملية | الصلاحية | الشرط |
|---------|----------|-------|
| Read | ✅ المستخدم نفسه | `isOwner()` |
| Create | ✅ المستخدم نفسه | لازم يكون مسجل |
| Update | ✅ المستخدم نفسه | تعديل الكمية فقط |
| Delete | ✅ المستخدم نفسه | حذف من السلة |

**Validation:**
- ✅ `quantity` من 1 لـ 10
- ✅ `price` أكبر من 0
- ✅ `productId` مطلوب
- ✅ `addedAt` = وقت الإضافة

---

### 4. Orders (الطلبات)
| العملية | الصلاحية | الشرط |
|---------|----------|-------|
| Read | ✅ المستخدم نفسه أو Admin | `isOwner()` أو `isAdmin()` |
| Create | ✅ المستخدم نفسه | إنشاء طلب جديد |
| Update | ✅ Admin فقط | تغيير حالة الطلب |
| Delete | ❌ ممنوع | للسجلات |

**Order Status:**
- `pending` - قيد الانتظار
- `processing` - قيد المعالجة
- `shipped` - تم الشحن
- `delivered` - تم التوصيل
- `cancelled` - ملغي

---

### 5. Categories (الفئات)
| العملية | الصلاحية | الشرط |
|---------|----------|-------|
| Read | ✅ الجميع | بدون شروط |
| Create | ✅ Admin فقط | لازم يكون admin |
| Update | ✅ Admin فقط | لازم يكون admin |
| Delete | ✅ Admin فقط | لازم يكون admin |

---

### 6. Reviews (المراجعات)
| العملية | الصلاحية | الشرط |
|---------|----------|-------|
| Read | ✅ الجميع | بدون شروط |
| Create | ✅ المستخدمين المسجلين | لازم يكون مسجل |
| Update | ✅ المستخدم نفسه | تعديل مراجعته فقط |
| Delete | ✅ المستخدم نفسه أو Admin | حذف مراجعته |

**Validation:**
- ✅ `rating` من 1 لـ 5
- ✅ `comment` حد أقصى 500 حرف
- ✅ `userId` = المستخدم الحالي

---

### 7. Wishlist (المفضلة)
| العملية | الصلاحية | الشرط |
|---------|----------|-------|
| Read | ✅ المستخدم نفسه | `isOwner()` |
| Create/Update | ✅ المستخدم نفسه | حد أقصى 50 منتج |
| Delete | ✅ المستخدم نفسه | حذف المفضلة |

---

### 8. Messages (رسائل التواصل)
| العملية | الصلاحية | الشرط |
|---------|----------|-------|
| Read | ✅ Admin فقط | لازم يكون admin |
| Create | ✅ الجميع | إرسال رسالة |
| Update | ✅ Admin فقط | تحديث الحالة |
| Delete | ✅ Admin فقط | حذف الرسالة |

**Validation:**
- ✅ `email` صحيح
- ✅ `message` من 10 لـ 1000 حرف

---

## 🔧 Helper Functions

### 1. isAuthenticated()
```javascript
function isAuthenticated() {
  return request.auth != null;
}
```
**الاستخدام:** التحقق من تسجيل الدخول

---

### 2. isAdmin()
```javascript
function isAdmin() {
  return isAuthenticated() && 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
}
```
**الاستخدام:** التحقق من صلاحيات الأدمن

---

### 3. isOwner(userId)
```javascript
function isOwner(userId) {
  return isAuthenticated() && request.auth.uid == userId;
}
```
**الاستخدام:** التحقق من ملكية المستند

---

### 4. isValidEmail(email)
```javascript
function isValidEmail(email) {
  return email.matches('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$');
}
```
**الاستخدام:** التحقق من صحة البريد الإلكتروني

---

### 5. hasRequiredFields(fields)
```javascript
function hasRequiredFields(fields) {
  return request.resource.data.keys().hasAll(fields);
}
```
**الاستخدام:** التحقق من وجود الحقول المطلوبة

---

### 6. fieldNotChanged(field)
```javascript
function fieldNotChanged(field) {
  return request.resource.data[field] == resource.data[field];
}
```
**الاستخدام:** منع تعديل حقل معين

---

## 🚀 كيفية التطبيق

### الخطوة 1: افتح Firebase Console
```
https://console.firebase.google.com
```

### الخطوة 2: اختر المشروع
```
e-commerce-store-39665
```

### الخطوة 3: اذهب لـ Firestore Database
```
Firestore Database → Rules
```

### الخطوة 4: انسخ القواعد
```
انسخ محتوى ملف firestore.rules
```

### الخطوة 5: الصق في Firebase
```
الصق القواعد في المحرر
```

### الخطوة 6: انشر (Publish)
```
اضغط Publish
```

---

## 🧪 اختبار القواعد

### Test 1: قراءة المنتجات (بدون تسجيل)
```javascript
// في Console
db.collection('products').get()
// ✅ يجب أن ينجح
```

### Test 2: إضافة للسلة (بدون تسجيل)
```javascript
// في Console
db.collection('users').doc('user123').collection('cart').add({...})
// ❌ يجب أن يفشل (Permission denied)
```

### Test 3: إضافة للسلة (مع تسجيل)
```javascript
// بعد تسجيل الدخول
db.collection('users').doc(currentUser.uid).collection('cart').add({...})
// ✅ يجب أن ينجح
```

### Test 4: تعديل منتج (مستخدم عادي)
```javascript
db.collection('products').doc('product123').update({...})
// ❌ يجب أن يفشل (Permission denied)
```

### Test 5: تعديل منتج (أدمن)
```javascript
// بعد تسجيل دخول أدمن
db.collection('products').doc('product123').update({...})
// ✅ يجب أن ينجح
```

---

## 👤 إنشاء مستخدم Admin

### الطريقة 1: من Firebase Console
```
1. اذهب لـ Firestore Database
2. افتح collection: users
3. اختر المستخدم
4. أضف field: role = "admin"
```

### الطريقة 2: من الكود
```javascript
// في Cloud Functions أو Admin SDK
await db.collection('users').doc(userId).update({
  role: 'admin'
});
```

### الطريقة 3: Script
```javascript
// في js/make-admin.js
import { doc, updateDoc } from 'firebase/firestore';

async function makeAdmin(userId) {
  await updateDoc(doc(db, 'users', userId), {
    role: 'admin'
  });
}
```

---

## 🔒 أمثلة الاستخدام

### إضافة منتج للسلة:
```javascript
import { collection, addDoc } from 'firebase/firestore';

async function addToCart(productId, quantity, price) {
  const userId = auth.currentUser.uid;
  
  await addDoc(collection(db, 'users', userId, 'cart'), {
    productId: productId,
    quantity: quantity,
    price: price,
    addedAt: new Date()
  });
}
```

### إنشاء طلب:
```javascript
async function createOrder(items, total) {
  const userId = auth.currentUser.uid;
  
  await addDoc(collection(db, 'users', userId, 'orders'), {
    items: items,
    total: total,
    status: 'pending',
    createdAt: new Date()
  });
}
```

### إضافة مراجعة:
```javascript
async function addReview(productId, rating, comment) {
  const userId = auth.currentUser.uid;
  
  await addDoc(collection(db, 'reviews'), {
    productId: productId,
    userId: userId,
    rating: rating,
    comment: comment,
    createdAt: new Date()
  });
}
```

---

## ⚠️ ملاحظات مهمة

### 1. Admin Role
- ✅ لازم تضيف `role: 'admin'` يدوياً للمستخدم الأول
- ✅ استخدم Firebase Console أو Admin SDK
- ❌ مينفعش المستخدم يغير role بنفسه

### 2. Email Validation
- ✅ يتم التحقق من صحة البريد الإلكتروني
- ✅ استخدم regex pattern

### 3. Timestamps
- ✅ استخدم `request.time` للـ server timestamp
- ✅ مينفعش المستخدم يحط timestamp من عنده

### 4. Rate Limiting
- ⚠️ القواعد دي مش بتعمل rate limiting
- ✅ استخدم Cloud Functions للـ rate limiting

### 5. Data Validation
- ✅ يتم التحقق من نوع البيانات
- ✅ يتم التحقق من الحدود (min/max)
- ✅ يتم التحقق من الحقول المطلوبة

---

## 🐛 Troubleshooting

### المشكلة: Permission Denied
**الحل:**
```
1. تأكد من تسجيل الدخول
2. تحقق من الـ role (للأدمن)
3. تحقق من الـ userId
4. راجع القواعد في Firebase Console
```

### المشكلة: Missing Required Fields
**الحل:**
```
تأكد من إرسال جميع الحقول المطلوبة:
- productId
- quantity
- price
- addedAt
```

### المشكلة: Invalid Data Type
**الحل:**
```
تأكد من نوع البيانات:
- price: number
- quantity: number
- email: string
- createdAt: timestamp
```

---

## 📊 ملخص الصلاحيات

| Collection | Read | Create | Update | Delete |
|-----------|------|--------|--------|--------|
| products | 🌍 All | 👑 Admin | 👑 Admin | 👑 Admin |
| users | 👤 Owner | 👤 Owner | 👤 Owner | 👑 Admin |
| cart | 👤 Owner | 👤 Owner | 👤 Owner | 👤 Owner |
| orders | 👤 Owner | 👤 Owner | 👑 Admin | ❌ None |
| categories | 🌍 All | 👑 Admin | 👑 Admin | 👑 Admin |
| reviews | 🌍 All | 🔐 Auth | 👤 Owner | 👤 Owner |
| wishlist | 👤 Owner | 👤 Owner | 👤 Owner | 👤 Owner |
| messages | 👑 Admin | 🌍 All | 👑 Admin | 👑 Admin |

**Legend:**
- 🌍 All = الجميع
- 🔐 Auth = المستخدمين المسجلين
- 👤 Owner = المالك فقط
- 👑 Admin = الأدمن فقط
- ❌ None = ممنوع

---

## ✅ Checklist

- [ ] نسخت القواعد من `firestore.rules`
- [ ] لصقت في Firebase Console
- [ ] نشرت القواعد (Publish)
- [ ] أنشأت مستخدم admin
- [ ] اختبرت قراءة المنتجات
- [ ] اختبرت إضافة للسلة
- [ ] اختبرت تعديل البروفايل
- [ ] اختبرت صلاحيات الأدمن

---

**🔥 القواعد جاهزة للاستخدام!**

**مستوى الأمان: Enterprise Grade 🛡️**
