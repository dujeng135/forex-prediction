import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";
import React, { useEffect } from 'react';

  export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState(""); // ✅ Ini di sini saja!
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        navigate("/"); // ⬅️ redirect ke dashboard jika sudah login
      }
    }, []);

const handleRegister = async (e) => {
  e.preventDefault();
  setError("");      // ❌ Reset error dulu
  setMessage("");    // ✅ Reset message juga!

  try {
    const res = await axios.post("http://localhost:5000/api/register", {
      username,
      email,
      password,
      role: "user",
      vvip: false,
    });

    console.log("✅ Register success:", res.data);
    setMessage("Registrasi berhasil! Silakan login.");
    // opsional: redirect ke login setelah beberapa detik
    setTimeout(() => navigate("/login"), 1500);
  } catch (err) {
    console.error("❌ Register error:", err);
    setError(err.response?.data?.message || "Register gagal.");
  }
};



  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/background-brick.jpg')" }}>
      <div className="bg-white bg-opacity-10 backdrop-blur-md p-10 rounded-xl shadow-2xl w-[350px] text-white">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-400"><FaUser /></span>
            <input
              type="text"
              placeholder="Username"
              className="pl-10 pr-4 py-2 w-full rounded-full bg-white bg-opacity-20 placeholder-white focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-400"><FaUser /></span>
            <input
              type="email"
              placeholder="Email"
              className="pl-10 pr-4 py-2 w-full rounded-full bg-white bg-opacity-20 placeholder-white focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-400"><FaLock /></span>
            <input
              type="password"
              placeholder="Password"
              className="pl-10 pr-4 py-2 w-full rounded-full bg-white bg-opacity-20 placeholder-white focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-300 text-sm text-center">{error}</p>}
          {message && <p className="text-green-300 text-sm text-center">{message}</p>}

          <button type="submit"
            className="w-full py-2 rounded-full bg-white text-black font-semibold hover:bg-yellow-400 transition">
            Register
          </button>

          <p className="text-center text-sm mt-4">
            Sudah punya akun? <a href="/login" className="font-bold underline">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}
