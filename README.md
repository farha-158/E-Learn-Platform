# 📚 E-LEARN Platform

منصة تعليمية تفاعلية لتقديم الكورسات، إدارة المستخدمين، إدارة المدربين، وإجراء شات مباشر بين الطلاب والمدرسين.  
المشروع مبني باستخدام **Node.js + Express + TypeScript + MongoDB + Socket.io**.

---

## 🚀 المميزات الأساسية

### 🔐 1. نظام التسجيل وتسجيل الدخول
- تسجيل مستخدمين (طلاب + مدربين).  
- تسجيل الدخول باستخدام **JWT**.  
- إعادة تعيين كلمة المرور (Forget Password).

### 👨‍🏫 2. إدارة المدربين
- إضافة مدرب جديد.  
- عرض بيانات المدرب.  
- رفع صورة خاصة بالمدرب.  
- ربط المدرب بالكورسات.

### 📘 3. إدارة الكورسات
- إضافة كورس جديد.  
- تعديل وحذف الكورسات.  
- رفع صورة للكورس (Thumbnail).  
- عرض الكورسات حسب المستوى واللغة.

### 💬 4. نظام شات فوري Real-Time Chat
باستخدام **Socket.io**  
يشمل:  
- شات مباشر بين الطالب والمدرب.  
- حفظ الرسائل في MongoDB.  
- إنشاء محادثة جديدة عند أول رسالة.

### 📤 5. رفع الملفات
باستخدام **Multer** لرفع صور:  
- الكورسات.  
- المدربين.

### 📨 6. إرسال الإيميلات
باستخدام **Nodemailer**:  
- إرسال أكواد التحقق.  
- إعادة تعيين كلمة المرور.

---

## 🏗️ بنية المشروع (Folder Structure)

E-LEARN PLATFORM  
│  
├── config  
│   ├── connectDB.ts  
│   └── passport.ts  
│  
├── controller  
│   ├── auth.controller.ts  
│   ├── chat.controller.ts  
│   ├── course.controller.ts  
│   └── instructor.controller.ts  
│  
├── dto  
│   ├── course.dto.ts  
│   ├── forgetPassword.dto.ts  
│   ├── instructor.dto.ts  
│   ├── login.dto.ts  
│   ├── register.dto.ts  
│   ├── user.dto.ts  
│   └── verifyCode.dto.ts  
│  
├── models  
│   ├── chat.model.ts  
│   ├── course.model.ts  
│   ├── instructor.model.ts  
│   ├── message.model.ts  
│   └── user.model.ts  
│  
├── routers  
│   ├── chat.route.ts  
│   ├── course.route.ts  
│   ├── instructor.route.ts  
│   └── user.route.ts  
│  
├── services  
│   ├── auth.service.ts  
│   ├── chat.service.ts  
│   ├── course.service.ts  
│   ├── instructor.service.ts  
│   ├── mailService.ts  
│   ├── message.service.ts  
│   ├── multer.ts  
│   └── user.service.ts  
│  
├── shared  
│   ├── enums  
│   │   ├── languageCourse.enum.ts  
│   │   ├── levelCourse.enum.ts  
│   │   └── statusCode.enum.ts  
│   ├── errors  
│   │   └── app.error.ts  
│   └── middlewares  
│       ├── errorHandler.middleware.ts  
│       └── validate.ts  
│  
├── utils  
│   ├── constant.util.ts  
│   └── sendResponse.util.ts  
│  
├── uploads  
│   ├── courses  
│   └── instructors  
│  
├── views (EJS)  
│   ├── addCourse.ejs  
│   ├── addInstructor.ejs  
│   ├── chat.ejs  
│   ├── course(home).ejs  
│   ├── courseid.ejs  
│   ├── forgot-password.ejs  
│   ├── instrId.ejs  
│   ├── login.ejs  
│   ├── signup.ejs  
│   └── verify-code.ejs  
│  
├── .env  
├── .gitignore  
├── app.ts  
├── package.json  
└── tsconfig.json  

---

## 🛠️ التقنيات المستخدمة (Tech Stack)

- **Node.js**  
- **Express.js**  
- **TypeScript**  
- **MongoDB + Mongoose**  
- **Socket.io**  
- **EJS**  
- **Multer**  
- **Nodemailer**  
- **Passport.js**

---

## ▶️ طريقة التشغيل (How to Run)

### 1️⃣ تثبيت الحزم
```bash```
npm install

### 2️⃣ إعداد ملف البيئة .env
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_password
### 3️⃣ تشغيل المشروع
وضع التطوير:

npm run dev

وضع الإنتاج:

npm run build
npm start

## 👩‍💻 المطورة

Farha Ashraf
Back-End Developer (Node.js – TypeScript – MongoDB)
