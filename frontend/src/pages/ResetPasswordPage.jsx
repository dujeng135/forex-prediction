import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPasswordPage() {
  const { userId } = useParams(); // Ambil userId dari URL
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("❌ Password tidak cocok.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/reset-password", {
        userId,
        newPassword,
      });
      console.log("✅ Password reset:", res.data);
      setMessage("✅ Password berhasil direset!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("❌ Reset error:", err);
      setMessage("❌ Gagal mereset password.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/background-brick.jpg')" }}>
      <div className="bg-white bg-opacity-10 backdrop-blur-md p-10 rounded-xl shadow-2xl w-[350px] text-white">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="password"
            placeholder="Password baru"
            className="w-full py-2 px-4 rounded-full bg-white bg-opacity-20 placeholder-white focus:outline-none"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Konfirmasi password"
            className="w-full py-2 px-4 rounded-full bg-white bg-opacity-20 placeholder-white focus:outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit"
            className="w-full py-2 rounded-full bg-white text-black font-semibold hover:bg-yellow-400 transition">
            Simpan Password Baru
          </button>
          {message && <p className="text-center text-sm mt-2">{message}</p>}
        </form>
      </div>
    </div>
  );
}
