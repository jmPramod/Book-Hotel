import { lazy, Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import Loading from "./components/Loading/Loading.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";
import Expense from "./pages/Expense/Expense.tsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // <- Import styles
// import Home from "./pages/Home/Home.tsx";
// import Profile from "./pages/Profile/Profile.tsx";
const Home = lazy(() => import("./pages/Home/Home"));

const Profile = lazy(() => import( "./pages/Profile/Profile"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Login = lazy(() => import("./pages/Login/Login.tsx"));
const Income = lazy(() => import("./pages/Income/Income.tsx"));
const Register = lazy(() => import("./pages/Register/Register.tsx"));

function App() { 


  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Navbar />}>
          
            <Route path="/" element={<Home />} />
          
          
            <Route path="/login" element={<Login />} />
            <Route path="/income" element={<Income />} />
            <Route path="/sign-up" element={<Register />} />
            <Route path="/expense" element={<Expense />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Suspense>

      {/* Toast Container at top-level */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
