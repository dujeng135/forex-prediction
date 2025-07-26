import { Link } from "react-router-dom"; // ✅ Tambahkan di paling atas file LoginPage.jsx
import axios from "axios"; // ← ⬅️ Tambahkan ini
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import React, { useEffect } from 'react';



export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/"); // ⬅️ redirect ke dashboard jika sudah login
    }
  }, []);

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });
  
      // ✅ Cek kalau berhasil
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
  localStorage.setItem("role", res.data.role);
  localStorage.setItem("username", res.data.username);
  localStorage.setItem("email", res.data.email); // ✅ ini aman
  localStorage.setItem("vvip", res.data.vvip || "false");
  navigate("/"); // redirect ke dashboard
      } else {
        alert("❌ Login gagal. Coba lagi.");
      }
    } catch (err) {
      console.error("❌ Error saat login:", err);
      alert("❌ Login gagal. Periksa username/password.");
    }
  };
  
  

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/background-brick.jpg')" }}
    >
      <div className="bg-white bg-opacity-10 backdrop-blur-md p-10 rounded-xl shadow-2xl w-[350px] text-white">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-4">

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

          <div className="flex justify-between text-sm text-gray-200">
            <label>
              <input type="checkbox" className="mr-1" /> Remember me
            </label>
            <a href="/forgot-password" className="hover:underline">Forgot password?</a>

          </div>

          {error && (
            <div className="text-red-300 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            className="w-full py-2 rounded-full bg-white text-black font-semibold hover:bg-yellow-400 transition"
          >
            Login
          </button>

          <p className="text-center text-sm mt-4">
  Don’t have an account? <Link to="/register" className="font-bold underline">Register</Link>
</p>

        </form>
      </div>
    </div>
  );
}
