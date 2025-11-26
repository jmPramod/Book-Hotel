import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock,  } from "lucide-react";
import signupImg from "../../assets/Signup.png"; 
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserStore } from "../../store/useUserStore";

const fadeInput = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.4 + i * 0.2, duration: 0.6 },
  }),
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  // const [darkMode, setDarkMode] = useState(true);
    const { darkMode, loading } = useUserStore();
  const login = useUserStore((state) => state.login);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await login(formData);
      console.log("res",res);
      
      if (res.token) {
        localStorage.setItem("token", res.token.accessToken);
      }
      if (res.status === 200 || res.status === 200) {
       console.log("1");
       
       navigate("/dashboard");
        toast.success("Registration successful!");
      } else if (res.status >= 400) {
           console.log("2");
        toast.error(res.message || "Something went wrong!");
      }
         console.log("3");
    } catch (err: any) {
         console.log("4");
      toast.error(err.message || "Something went wrong!");
    }
  };

  return (
    <div
      className={`${
        darkMode ? "bg-slate-900 text-white" : "bg-gray-100 text-gray-900"
      } flex flex-col md:flex-row overflow-hidden`}
      style={{ height: "calc(100vh - 68px)" }} // ⭐ Fix for no scroll under navbar
    >
      {/* THEME TOGGLE BUTTON */}
      {/* <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-5 right-5 p-2 rounded-full bg-gray-700 text-white hover:scale-105 transition"
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button> */}

      {/* LEFT IMAGE */}
      <motion.div
        initial={{ y: -120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full md:w-1/2 h-60 md:h-full bg-contain bg-center bg-no-repeat object-contain"
        style={{ backgroundImage: `url(${signupImg})` }}
      ></motion.div>

      {/* RIGHT FORM */}
      <motion.div
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full md:w-1/2 flex items-center justify-center py-6 md:py-0"
      >
        <div className="w-full max-w-md">
          <motion.h2
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-3xl font-bold text-center mb-8"
          >
         Welcome back! , Login Here 
          </motion.h2>

          <form className="space-y-6 p-3 md:p-0" onSubmit={handleSubmit}>
            {/* EMAIL */}
            <motion.div custom={7} variants={fadeInput} initial="hidden" animate="visible">
              <label className="text-sm">Email Address</label>
              <div
                className={`${
                  darkMode ? "bg-slate-800" : "bg-white"
                } flex items-center gap-2 mt-1 rounded-xl px-4 py-3`}
              >
                <Mail size={20} className={`${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="bg-transparent w-full outline-none text-inherit"
                />
              </div>
            </motion.div>

            {/* PASSWORD */}
            <motion.div custom={8} variants={fadeInput} initial="hidden" animate="visible">
              <label className="text-sm">Password</label>
              <div
                className={`${
                  darkMode ? "bg-slate-800" : "bg-white"
                } flex items-center gap-2 mt-1 rounded-xl px-4 py-3`}
              >
                <Lock size={20} className={`${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Strong password"
                  className="bg-transparent w-full outline-none text-inherit"
                />
                {showPassword ? (
                  <EyeOff size={20} onClick={() => setShowPassword(false)} className="cursor-pointer" />
                ) : (
                  <Eye size={20} onClick={() => setShowPassword(true)} className="cursor-pointer" />
                )}
              </div>
            </motion.div>

            {/* BUTTON */}
            <motion.button
              custom={9}
              variants={fadeInput}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 py-3 px-3 rounded-xl text-white font-semibold"
            >{
              loading?"Loading...":"Login"
           } </motion.button>

            {/* LOGIN LINK */}
            <motion.p
              custom={10}
              variants={fadeInput}
              initial="hidden"
              animate="visible"
              className={`${darkMode ? "text-gray-400" : "text-gray-600"} text-center text-sm`}
            >
             Don't have an account?{" "}
              <a href="/sign-up" className="text-blue-400 hover:underline">
                Register
              </a>
            </motion.p>
          </form>
        </div>
      </motion.div>

      <ToastContainer position="top-right" />
    </div>
  );
};

export default Login;
