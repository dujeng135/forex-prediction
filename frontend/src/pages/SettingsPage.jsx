import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    role: "",
    isVVIP: false,
  });
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username") || "Unknown";
    const role = localStorage.getItem("role") || "user";
    const isVVIP = localStorage.getItem("vvip") === "true";
    const theme = localStorage.getItem("theme") || "light";

    setUser({ username, role, isVVIP });
    setDarkMode(theme === "dark");
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const toggleTheme = () => {
    const newTheme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto mt-10 
  bg-white/10 dark:bg-white/10 
  backdrop-blur-md text-white 
  border border-white/20 
  rounded-2xl shadow-2xl transition-all duration-300"
>

      <h2 className="text-3xl font-bold mb-6 text-center">⚙️ Pengaturan Akun</h2>

      <div className="space-y-4">
        {/* Info akun */}
        <div className="border-b pb-4">
          <p><span className="font-semibold">👤 Username:</span> {user.username}</p>
          <p><span className="font-semibold">🔑 Role:</span> {user.role}</p>
          <p>
            <span className="font-semibold">💎 Status:</span>{" "}
            {user.isVVIP ? (
              <span className="text-green-400 font-bold">VVIP ✅</span>
            ) : (
              <span className="text-red-400 font-bold">Regular ❌</span>
            )}
          </p>
        </div>

        {/* Toggle Dark Mode */}
        <div className="flex justify-between items-center">
          <span className="font-semibold">🌗 Mode Gelap</span>
          <input type="checkbox" checked={darkMode} onChange={toggleTheme} className="toggle toggle-md" />
        </div>

        {/* Ganti Password */}
        <div>
          <button
            onClick={() => setShowModal(true)}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-xl transition"
          >
            🔐 Ganti Password
          </button>
        </div>

        {/* Upgrade ke VVIP */}
        {!user.isVVIP && (
          <button
            onClick={() => navigate("/upgrade")}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-4 rounded-xl transition"
          >
            💎 Upgrade ke VVIP
          </button>
        )}

        {/* Bantuan */}
        <div>
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-xl text-center transition"
          >
            🛟 Hubungi Bantuan / Admin
          </a>
        </div>

        {/* Versi Aplikasi */}
        <div className="text-sm text-gray-500 dark:text-gray-400 text-center mt-6">
          📦 Versi Aplikasi: <span className="font-medium">v1.0.0</span> | Model: <span className="font-medium">LSTM</span>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-xl transition"
        >
          🔓 Logout
        </button>
      </div>

      {/* Modal Ganti Password (dummy) */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">🔐 Ganti Password</h3>
            <input
              type="password"
              placeholder="Password Baru"
              className="w-full mb-3 p-2 rounded border"
            />
            <input
              type="password"
              placeholder="Konfirmasi Password"
              className="w-full mb-4 p-2 rounded border"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  alert("Password berhasil diganti! (Dummy)");
                  setShowModal(false);
                }}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
