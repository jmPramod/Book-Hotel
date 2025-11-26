import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, User, Lock, Phone,  } from "lucide-react";
import signupImg from "../../assets/login.png"; 
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

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
   const { darkMode, loading } = useUserStore();
 // ✅ Dark mode state
  const navigate = useNavigate();
   const register = useUserStore((state) => state.register);
  // const loading = useUserStore((state) => state.loading);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
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
      const res = await register(formData);
      if (res.token) {
        localStorage.setItem("token", res.token.accessToken);
      }
      if (res.status === 201 || res.status === 200) {
        toast.success("Registration successful!");
        navigate("/dashboard");
      } else if (res.status >= 400) {
        toast.error(res.message || "Something went wrong!");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong!");
    }
  };
  // if(loading){
  //   return <Loading/>
  // }

  return (
    <div className={`${darkMode ? "bg-slate-900 text-white" : "bg-gray-100 text-gray-900"} min-h-[90vh] flex flex-col-reverse md:flex-row overflow-hidden`}>
   

   
      {/* RIGHT FORM */}
      <motion.div
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full md:w-1/2 flex items-center justify-center py-10 md:py-0"
      >
        <div className="w-full max-w-md">
          <motion.h2
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl font-bold text-center mb-8"
          >
            Create New Account
          </motion.h2>

          <form className="space-y-6 p-3 md:p-0" onSubmit={handleSubmit}>
            {/* FIRST + LAST NAME */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div custom={0} variants={fadeInput} initial="hidden" animate="visible">
                <label className="text-sm">First Name</label>
                <div className={`${darkMode ? "bg-slate-800" : "bg-white"} flex items-center gap-2 mt-1 rounded-xl px-4 py-3`}>
                  <User size={20} className={`${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    className="bg-transparent w-full outline-none text-inherit"
                  />
                </div>
              </motion.div>

              <motion.div custom={1} variants={fadeInput} initial="hidden" animate="visible">
                <label className="text-sm">Last Name</label>
                <div className={`${darkMode ? "bg-slate-800" : "bg-white"} flex items-center gap-2 mt-1 rounded-xl px-4 py-3`}>
                  <User size={20} className={`${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    className="bg-transparent w-full outline-none text-inherit"
                  />
                </div>
              </motion.div>
            </div>

            {/* PHONE */}
            <motion.div custom={2} variants={fadeInput} initial="hidden" animate="visible">
              <label className="text-sm">Phone Number</label>
              <div className={`${darkMode ? "bg-slate-800" : "bg-white"} flex items-center gap-2 mt-1 rounded-xl px-4 py-3`}>
                <Phone size={20} className={`${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="bg-transparent w-full outline-none text-inherit"
                />
              </div>
            </motion.div>

            {/* EMAIL */}
            <motion.div custom={7} variants={fadeInput} initial="hidden" animate="visible">
              <label className="text-sm">Email Address</label>
              <div className={`${darkMode ? "bg-slate-800" : "bg-white"} flex items-center gap-2 mt-1 rounded-xl px-4 py-3`}>
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
              <div className={`${darkMode ? "bg-slate-800" : "bg-white"} flex items-center gap-2 mt-1 rounded-xl px-4 py-3`}>
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
            >
         {loading?"Loading...":"Register"     }
            </motion.button>

            {/* LOGIN */}
            <motion.p
              custom={10}
              variants={fadeInput}
              initial="hidden"
              animate="visible"
              className={`${darkMode ? "text-gray-400" : "text-gray-600"} text-center text-sm`}
            >
              Already have an account?{" "}
              <a href="/login" className="text-blue-400 hover:underline">
                Login
              </a>
            </motion.p>
          </form>
        </div>
      </motion.div>

         {/* LEFT IMAGE */}
      <motion.div
        initial={{ y: -120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full md:w-1/2 h-60 md:h-auto bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${signupImg})` }}
      ></motion.div>

      <ToastContainer position="top-right" />
    </div>
  );
};

export default Register;
