import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  BrainCircuit,
  SignalHigh,
  History,
  Newspaper,
  Zap,
  SendHorizonal,
} from "lucide-react";


export default function Sidebar() {
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const [isVvip, setIsVvip] = useState(false);

  useEffect(() => {
    setIsVvip(localStorage.getItem("vvip") === "true");
  }, []);

  const menuItems = [
    { to: "/", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/lstm-model", label: "LSTM Model", icon: <BrainCircuit size={18} /> },
    { to: "/history", label: "Trade History", icon: <History size={18} /> },
    { to: "/news", label: "News Xauusd", icon: <Newspaper size={18} /> },
    { to: "/live-feed", label: "Overview", icon: <Zap size={18} /> },
    { to: "/signals", label: "Signals", icon: <SignalHigh size={18} /> },
    { to: "/telegram-bot", label: "Telegram Bot", icon: <SendHorizonal size={18} /> },
  ];
  

  return (
    <>
      {/* Tombol Toggle Mobile */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-cyberAccent/10 text-cyberAccent border border-cyberAccent px-3 py-2 rounded-md shadow-sm backdrop-blur"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      <div
        className={`fixed top-0 left-0 h-screen z-40 transition-all duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        w-64 p-5 bg-gradient-to-b from-[#000000] to-[#1a1c2c] text-white
        border-r border-slate-800 rounded-tr-3xl rounded-br-2xl
        shadow-[0_0_20px_#000000] font-futuristic`}
      >
        {/* Header */}
        <h1 className="text-2xl font-bold mb-8 text-cyberAccent tracking-widest text-center drop-shadow-md">
          XAUUSD AI
        </h1>

        {/* Menu */}
        <ul className="space-y-3">
  {menuItems.map((item) => {
    const isActive = location.pathname === item.to;
    return (
      <li key={item.to}>
        <Link
          to={item.to}
          className={`flex items-center gap-3 px-4 py-2 rounded-xl transition duration-150 ease-in-out
            ${
              isActive
                ? "bg-cyberAccent/90 text-[#FFFAFA] font-semibold shadow-[0_0_5px_#3f9fff80]"
                : "hover:bg-cyberAccent/10 hover:text-cyberAccent text-white/60"
            }`}
        >
          <span className={`text-cyberAccent ${isActive ? "drop-shadow-md" : ""}`}>
            {item.icon}
          </span>
          <span className="text-sm tracking-wide">{item.label}</span>
        </Link>
      </li>
    );
  })}
</ul>


        {/* VVIP Status */}
       
        {/* Copyright */}
        <div className="absolute bottom-4 right-4 text-[11px] text-gray-500 italic text-right leading-snug font-light">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold text-white-300">XAUUSD.AI</span>
        </div>
      </div>
    </>
  );
}
