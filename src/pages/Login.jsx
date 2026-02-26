import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "testuser" && password === "Test123") {
      localStorage.setItem("auth", true);
      toast.success("Login Successful 🚀");
      navigate("/list");
    } else {
      toast.error("Invalid Credentials ❌");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-700">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-lg bg-white/20 p-8 rounded-2xl shadow-xl w-96 text-white"
      >
        <h2 className="text-3xl font-bold text-center mb-6">
        Employee Hub
        </h2>

        <input
          className="w-full p-3 mb-4 rounded bg-white/30 placeholder-white focus:outline-none"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-3 mb-4 rounded bg-white/30 placeholder-white focus:outline-none"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-black/40 hover:bg-black/60 p-3 rounded-lg transition"
        >
          Login
        </button>
       <p className="mt-6 text-center text-sm text-green-500 font-semibold">
  Developed by Asmit Aditya Singh
</p>
      </motion.div>
    </div>
  );
}    