import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "netflixclone@gmail.com" && password === "netflix") {
      dispatch(login(email));
      navigate("/");
    } else {
      setError("Invalid email or password. Try again!");
    }
  };

  return (
    <div className="relative h-screen w-screen flex items-center justify-center bg-black overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{
          backgroundImage:
            "url('https://assets.nflxext.com/ffe/siteui/vlv3/25b1c812-09db-44e0-a82b-7dc1848f5936/7ec7aa2b-fdb2-404d-a7e8-0bba399a0970/IN-en-20230911-popsignuptwoweeks-perspective_alpha_website_small.jpg')",
        }}
      ></div>

      <div className="absolute inset-0 bg-black/60"></div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 bg-black/80 p-10 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h1 className="text-white text-4xl font-bold mb-6 text-center">
          Sign In
        </h1>

        {error && (
          <p className="text-red-500 text-center mb-4 animate-pulse">
            {error}
          </p>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-red-600 py-3 rounded-lg text-white font-semibold hover:bg-red-700 transition-all shadow-lg"
          >
            Sign In
          </motion.button>
        </form>

        <p className="text-gray-400 text-sm mt-6 text-center">
          Demo Credentials: <br />
          <span className="text-white">netflixclone@gmail.com</span> /{" "}
          <span className="text-white">netflix</span>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
