import { useEffect, useRef, useState } from "react";
import { Bell, AlertCircle, Info } from "lucide-react";
import { toast, Toaster } from "sonner";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const bellRef = useRef(null);
  const [greeting, setGreeting] = useState("");
  const toastShownRef = useRef(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ⏰ Greeting waktu + Delay toast biar alami
  useEffect(() => {
    const hour = new Date().getHours();
    let greet = "";
    if (hour < 12) greet = "🌅 Selamat pagi";
    else if (hour < 18) greet = "🌞 Selamat siang";
    else greet = "🌙 Selamat malam";
  
    setGreeting(greet);
  
    // ✅ Gunakan timeout hanya saat komponen mounting pertama kali
    let isToastShown = false;
  
    const showToastsOnce = () => {
      if (isToastShown) return;
      isToastShown = true;
  
      toast.success(`${greet}, selamat datang di dashboard!`, {
        description: "Pantau sinyal dan harga XAUUSD di sini.",
        duration: 6000,
      });
  
      setTimeout(() => {
        toast.info("📈 Harga XAUUSD naik +0.71% hari ini", {
          description: "Update sinyal harian telah tersedia",
          duration: 6000,
        });
      }, 6000);
    };
  
    // Delay awal 1 detik agar terlihat alami
    const mainTimeout = setTimeout(() => {
      showToastsOnce();
    }, 1000);
  
    return () => clearTimeout(mainTimeout);
  }, []);
  
  

  return (
    <div className="relative" ref={bellRef}>
      {/* ✅ Toaster aktif */}
     

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="relative p-2 rounded-full hover:bg-white/10 transition"
      >
        <Bell className="w-5 h-5 text-white" />
        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-[#1f2937] text-white border border-white/10 rounded-xl shadow-lg z-50">
          <div className="p-3 text-sm font-semibold border-b border-white/10">
            Notifikasi
          </div>

          <div className="px-4 py-2 text-xs text-gray-300 italic">
            {greeting}, ada 2 update penting:
          </div>

          <ul className="max-h-60 overflow-y-auto text-sm">
            <li className="flex items-start gap-2 px-4 py-3 hover:bg-white/5 transition">
              <AlertCircle className="w-4 h-4 text-yellow-400 mt-1" />
              <div>
                <p>Harga XAUUSD naik signifikan hari ini.</p>
                <span className="text-xs text-gray-400">5 menit lalu</span>
              </div>
            </li>
            <li className="flex items-start gap-2 px-4 py-3 hover:bg-white/5 transition">
              <Info className="w-4 h-4 text-blue-400 mt-1" />
              <div>
                <p>Update sinyal harian telah tersedia.</p>
                <span className="text-xs text-gray-400">10 menit lalu</span>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
