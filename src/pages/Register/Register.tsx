import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, User, Lock, Phone } from "lucide-react";
import signupImg from "../../assets/Signup.png";

const fadeInput = {
  hidden: { opacity: 0, y: 40 },
  visible: (i:number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.4 + i * 0.2, duration: 0.6 },
  }),
};

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden bg-slate-900">
      {/* LEFT IMAGE (Top in Mobile) */}
      <motion.div
        initial={{ y: -120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full md:w-1/2 h-60 md:h-auto bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${signupImg})`,
        }}
      ></motion.div>

      {/* RIGHT FORM */}
      <motion.div
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full md:w-1/2 flex items-center justify-center py-10 md:py-0"
      >
        <div className="w-full max-w-md">
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl font-bold text-white text-center mb-8"
          >
            Create Account
          </motion.h2>

          <form className="space-y-6 p-3 md:p-0">

            {/* FIRST + LAST NAME */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* FIRST NAME */}
              <motion.div custom={0} variants={fadeInput} initial="hidden" animate="visible">
                <label className="text-gray-300 text-sm">First Name</label>
                <div className="flex items-center gap-2 mt-1 bg-slate-800 rounded-xl px-4 py-3">
                  <User size={20} className="text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter first name"
                    className="bg-transparent w-full outline-none text-white"
                  />
                </div>
              </motion.div>

              {/* LAST NAME */}
              <motion.div custom={1} variants={fadeInput} initial="hidden" animate="visible">
                <label className="text-gray-300 text-sm">Last Name</label>
                <div className="flex items-center gap-2 mt-1 bg-slate-800 rounded-xl px-4 py-3">
                  <User size={20} className="text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter last name"
                    className="bg-transparent w-full outline-none text-white"
                  />
                </div>
              </motion.div>
            </div>

            {/* PHONE */}
            <motion.div custom={2} variants={fadeInput} initial="hidden" animate="visible">
              <label className="text-gray-300 text-sm">Phone Number</label>
              <div className="flex items-center gap-2 mt-1 bg-slate-800 rounded-xl px-4 py-3">
                <Phone size={20} className="text-gray-400" />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="bg-transparent w-full outline-none text-white"
                />
              </div>
            </motion.div>

            {/* EMAIL */}
            <motion.div custom={7} variants={fadeInput} initial="hidden" animate="visible">
              <label className="text-gray-300 text-sm">Email Address</label>
              <div className="flex items-center gap-2 mt-1 bg-slate-800 rounded-xl px-4 py-3">
                <Mail size={20} className="text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter email"
                  className="bg-transparent w-full outline-none text-white"
                />
              </div>
            </motion.div>

            {/* PASSWORD */}
            <motion.div custom={8} variants={fadeInput} initial="hidden" animate="visible">
              <label className="text-gray-300 text-sm">Password</label>
              <div className="flex items-center gap-2 mt-1 bg-slate-800 rounded-xl px-4 py-3">
                <Lock size={20} className="text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Strong password"
                  className="bg-transparent w-full outline-none text-white"
                />
                {showPassword ? (
                  <EyeOff
                    size={20}
                    onClick={() => setShowPassword(false)}
                    className="cursor-pointer text-gray-400"
                  />
                ) : (
                  <Eye
                    size={20}
                    onClick={() => setShowPassword(true)}
                    className="cursor-pointer text-gray-400"
                  />
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
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 py-3 px-3 rounded-xl text-white font-semibold"
            >
              Register
            </motion.button>

            {/* LOGIN */}
            <motion.p
              custom={10}
              variants={fadeInput}
              initial="hidden"
              animate="visible"
              className="text-center text-gray-400 text-sm"
            >
              Already have an account?{" "}
              <a href="/login" className="text-blue-400 hover:underline">
                Login
              </a>
            </motion.p>

          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
