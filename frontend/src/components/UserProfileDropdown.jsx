import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import SettingsDrawer from "./SettingsDrawer"; // pastikeun path bener

export default function UserProfileDropdown({ onOpenSettings }) {

  const [showMenu, setShowMenu] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("user@example.com");
  

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUsername(localStorage.getItem("username") || "User");
    setEmail(localStorage.getItem("email") || "user@example.com");

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <div className="relative flex items-center gap-3" ref={dropdownRef}>
        <button
          onClick={() => setShowMenu((prev) => !prev)}
          className="flex items-center gap-3 px-3 py-1 bg-white/5 rounded-full hover:bg-white/10 transition"
        >
          <img
            src="https://i.pravatar.cc/100?u=user"
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
          <div className="text-left hidden sm:block">
            <div className="text-sm font-medium text-white">{username}</div>
            <div className="text-xs text-gray-400">{email}</div>
          </div>
          <ChevronDown className="w-4 h-4 text-white/70" />
        </button>

        {showMenu && (
          <div className="absolute right-0 top-full mt-2 w-56 bg-[#1e1e2f] text-white border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden">
            <button
              onClick={() => {
                navigate("/profile");
                setShowMenu(false);
              }}
              className="flex items-center gap-2 px-4 py-3 hover:bg-white/10 w-full text-sm"
            >
              <User className="w-4 h-4" /> Profil
            </button>
            <button
              onClick={() => {
                onOpenSettings();
                setShowMenu(false);
              }}
              className="flex items-center gap-2 px-4 py-3 hover:bg-white/10 w-full text-sm"
            >
              <Settings className="w-4 h-4" /> Pengaturan
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-3 hover:bg-white/10 w-full text-sm text-red-400"
            >
              <LogOut className="w-4 h-4" /> Keluar
            </button>
          </div>
        )}
      </div>

    </>
  );
}
