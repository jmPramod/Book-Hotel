# Finance Tracker – Backend (Node.js + TypeScript + MongoDB)

This is the **backend API** for the Finance Tracker application.  
It is built with **Node.js**, **Express**, **TypeScript**, **MongoDB**, **Mongoose**, **JWT**, and includes full **Swagger API documentation**.

This backend powers:
- Authentication (Register/Login)
- Income Management (CRUD)
- Expense Management (CRUD)
- Dashboard Summary API
- User Profile (Image Upload)
- Secure Routes (JWT + Middleware)

Swagger documentation is available online for easy testing.

---

## 🚀 Features

### **Authentication**
- Register  
- Login  
- JWT-based auth  
- Password hashing using bcrypt  

### **Expense APIs**
- Create expense  
- Update expense  
- Delete expense  
- Get all expenses  
- Pagination + Search  

### **Income APIs**
- Create income  
- Update income  
- Delete income  
- Get all incomes  
- Pagination  

### **Dashboard API**
- Total income  
- Total expense  
- Last 30 days expense chart  
- Category-wise expense  
- Wallet balance  

### **User Profile**
- Update user  
- Upload profile image  
- Get user details  

---

## 📁 Folder Structure

```
backend/
│── src/
│   ├── Controllers/
│   ├── Models/
│   ├── Middlewares/
│   ├── Routes/
│   ├── utils/
│   ├── config/
│   ├── app.ts
│   ├── server.ts
│── uploads/ (for profile images)
│── .env
│── package.json
│── tsconfig.json
│── README.md
```

---

## 🛠️ Tech Stack

- **Node.js**
- **Express**
- **TypeScript**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **Swagger Documentation**
- **Multer (Image Upload)**
- **bcrypt**
- **Cloud deployment ready (Render/Vercel/EC2)**

---

## 🔧 Installation & Setup

### **1️⃣ Clone the repository**
```bash
git clone https://github.com/your-username/finance-tracker-backend.git
cd finance-tracker-backend
```

### **2️⃣ Install dependencies**
```bash
npm install
```

### **3️⃣ Create `.env` file**
Create a `.env` file in the backend root:

```
PORT=5000
MONGO_URI=mongodb+srv://your-mongo-url
JWT_SECRET=your-secret-key
CLOUDINARY_NAME=YOUR_VALUE
CLOUDINARY_API_KEY=YOUR_VALUE
CLOUDINARY_SECRET_KEY=YOUR_VALUE
```

If you use local uploads instead of Cloudinary, simply remove Cloudinary keys.

---

## ▶️ **Start Development Server**

### **4️⃣ Start with TypeScript (TS-node-dev)**
```bash
npm start
```

Server runs on:

👉 http://localhost:4500

---

## 📘 Swagger API Documentation

Swagger UI available at:

👉 **https://book-hotel-delta-two.vercel.app/api-docs**

OR locally:

👉 http://localhost:5000/api-docs

---

## 📦 Production Build

To build & run production version:

```bash
npm run build
npm start
```

Compiled JS files are stored in `/dist`.

---

## 🔐 Authentication Flow

- User registers → password hashed  
- User logs in → JWT token generated  
- Token must be sent in headers:

```
Authorization: Bearer <token>
```

Middleware verifies token and attaches user to `req.user_info`.

---

## 🧪 API Testing (Postman / Swagger)

You can use:
- **Swagger** (best choice)
- **Postman collection**
- **Thunder Client (VSCode)**

---

## 🔗 Core Routes Overview

| Route | Method | Description |
|-------|--------|-------------|
| `/api/auth/register` | POST | Register user |
| `/api/auth/login` | POST | Login |
| `/api/expense` | GET/POST | Expense list & create |
| `/api/expense/:id` | PUT/DELETE | Update/Delete expense |
| `/api/income` | GET/POST | Income list & create |
| `/api/income/:id` | PUT/DELETE | Update/Delete income |
| `/api/dashboard` | GET | Full dashboard summary |
| `/api/user/update` | PUT | Update profile |
| `/api/user/upload` | POST | Upload image |

---

## 🗃️ Scripts

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Run production
```bash
npm start
```

---

## 🌐 Deployment Guide

### **Deploy on Render / Railway / EC2**

1. Push backend to GitHub  
2. Create new service on Render/Railway  
3. Add environment variables  
4. Enable auto-deploy  
5. Deploy  

Backend will automatically generate Swagger at:

```
https://YOUR_RENDER_URL/api-docs
```

---

## ⚙️ Notes

- Uses middlewares for error handling  
- Uses `multer` for image upload  
- Database models are fully validated  
- Dashboard query is optimized  
- Clean controller-route-service architecture  

---

## 🤝 Contribution

1. Fork repository  
2. Create feature branch  
3. Commit changes  
4. Push  
5. Open Pull Request  

---

## 📄 License

MIT License  

---

## ✨ Author

**Pramod JM**  
Backend + Full Stack MERN Developer  
