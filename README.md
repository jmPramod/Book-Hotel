# Finance Tracker Web – Frontend (React + TypeScript)

This is the **frontend web application** for the Finance Tracker system.  
It is built using **React + TypeScript**, **Zustand**, **React Query**, **Material UI / Tailwind**, and integrates with a fully documented backend (Swagger).

The app includes:
- Authentication  
- Dashboard (Income + Expense Overview)  
- Expense Management (CRUD + Pagination + Search)  
- Income Management  
- Profile Page (Image Upload)  
- Charts (Pie, Bar, Line)  
- Dark/Light Theme  
- Global State Management (Zustand)  

---

## 🚀 Features

### **Dashboard**
- Total Income / Expense Cards  
- Pie Chart (30 Days Overview)  
- Bar Graphs  
- Recent Transactions  

### **Expenses**
- Add / Edit / Delete Expenses  
- Pagination + Search  
- Excel Download  
- Category Icons  

### **Income**
- Add / Edit / Delete Income  
- Monthly Chart  
- Excel Download  

### **Profile**
- Update user details  
- Upload profile picture  
- Dark mode toggle  

### **Authentication**
- Login / Register  
- JWT-based authentication  
- Persistent session using Zustand (localStorage)  

---

## 📁 Folder Structure

```
frontend/
│── public/
│── src/
│   ├── components/
│   ├── pages/
│   ├── store/
│   ├── utils/
│   ├── hooks/
│   ├── assets/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
│── .env
│── package.json
│── tsconfig.json
│── vite.config.ts
└── README.md
```

---

## 🛠️ Tech Stack

- **React + TypeScript**
- **Vite**
- **Zustand (Global State)**
- **React Query (API caching)**
- **Axios**
- **Material UI / Tailwind CSS**
- **React Icons / Lucide React**
- **Recharts / Chart.js**

---

## 🔧 Installation & Setup

### **1️⃣ Clone the repository**
```bash
git clone https://github.com/your-username/finance-tracker-frontend.git
cd finance-tracker-frontend
```

### **2️⃣ Install dependencies**
```bash
npm install
```

### **3️⃣ Create `.env` file**
Inside the root folder, create:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

Or if deployed:

```
VITE_API_BASE_URL=https://your-backend-url.com/api
```

### **4️⃣ Start the development server**
```bash
npm run dev
```

The app will be live at:

👉 **http://localhost:5173**

---

## 🧪 Running Tests (Optional)

```bash
npm run test
```

---

## 📦 Build for Production

```bash
npm run build
```

To preview local production build:

```bash
npm run preview
```

---

## 🌐 Deployment Guide

### **Deploy on Vercel**
1. Push frontend project to GitHub  
2. Go to https://vercel.com  
3. Import project  
4. Add environment variable:

```
VITE_API_BASE_URL=https://your-backend-url.com/api
```

5. Deploy  

---

## 🔗 API Documentation (Backend Swagger)

Your backend API docs:

👉 **https://book-hotel-delta-two.vercel.app/api-docs**

The frontend fully consumes these APIs.

---

## 👨‍💻 Developer Notes

- Zustand store handles authentication and dark mode  
- All API calls are inside `/src/utils/Api.services.ts`  
- Charts are modular & reusable  
- UI is component-driven  
- Most pages have separate table + modal components  

---

## 🤝 Contribution

1. Fork the project  
2. Create feature branch  
3. Commit your changes  
4. Push & create Pull Request  

---

## 📄 License

This project is licensed under the **MIT License**.

---

## ✨ Author

**Pramod JM**  
Full-stack MERN + TypeScript Developer  
