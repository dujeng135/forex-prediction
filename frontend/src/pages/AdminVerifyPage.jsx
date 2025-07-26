import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminVerifyPage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleVerify = () => {
    if (code === "admin123") {
      localStorage.setItem("adminVerified", "true");
      navigate("/");
    } else {
      setError("Kode verifikasi salah!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="bg-[#0d0d2b] p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-center mb-4">Admin Verification</h2>
        <input
          type="text"
          placeholder="Masukkan kode verifikasi"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full p-2 rounded mb-4 text-black"
        />
        {error && <p className="text-red-400 text-sm text-center mb-2">{error}</p>}
        <button
          onClick={handleVerify}
          className="w-full bg-yellow-400 text-black py-2 rounded hover:bg-yellow-300"
        >
          Verifikasi
        </button>
      </div>
    </div>
  );
}
