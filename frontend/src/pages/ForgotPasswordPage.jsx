import { useState } from "react";
import axios from "axios";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/forgot-password", {
        email,
      });
      
      console.log("✅ Email sent:", res.data);
      setMessage("📩 Link reset password telah dikirim ke email.");
    } catch (err) {
      console.error("❌ Error:", err);
      setMessage("❌ Gagal mengirim link reset. Email tidak ditemukan.");
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/background-brick.jpg')" }}>
      <div className="bg-white bg-opacity-10 backdrop-blur-md p-10 rounded-xl shadow-2xl w-[350px] text-white">
        <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Masukkan email anda"
            className="w-full py-2 px-4 rounded-full bg-white bg-opacity-20 placeholder-white focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit"
            className="w-full py-2 rounded-full bg-white text-black font-semibold hover:bg-yellow-400 transition">
            Kirim Link Reset
          </button>
          {message && <p className="text-center text-sm mt-2">{message}</p>}
        </form>
      </div>
    </div>
  );
}
