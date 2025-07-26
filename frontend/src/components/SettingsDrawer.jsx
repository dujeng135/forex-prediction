import { X, Moon, Sun, Palette, Lock } from "lucide-react";

export default function SettingsDrawer({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="w-80 h-full bg-gradient-to-br from-[#1f2937] to-[#111827] border-l border-white/10 p-6">
  <h2 className="text-lg font-semibold text-white mb-1">Pengaturan</h2>
  <p className="text-sm text-white/50 mb-6">Atur preferensi aplikasi kamu</p>

  {/* Menu Item */}
  <div className="space-y-3">
    <div className="flex items-center gap-3 hover:bg-white/5 px-4 py-2 rounded-xl cursor-pointer transition">
      <span className="p-2 bg-cyan-900/30 text-cyan-400 rounded-full">
        <Palette className="w-4 h-4" />
      </span>
      <span className="text-sm text-white">Ganti Tema</span>
    </div>
    <div className="flex items-center gap-3 hover:bg-white/5 px-4 py-2 rounded-xl cursor-pointer transition">
      <span className="p-2 bg-yellow-900/30 text-yellow-400 rounded-full">
        <Moon className="w-4 h-4" />
      </span>
      <span className="text-sm text-white">Dark Mode / Light Mode</span>
    </div>
    <div className="flex items-center gap-3 hover:bg-white/5 px-4 py-2 rounded-xl cursor-pointer transition">
      <span className="p-2 bg-pink-900/30 text-pink-400 rounded-full">
        <Lock className="w-4 h-4" />
      </span>
      <span className="text-sm text-white">Ganti Password</span>
    </div>
  </div>

  <hr className="my-6 border-white/10" />
  <p className="text-xs text-white/30 text-center">XAUUSD.AI © 2025</p>
</div>
      </div>
    
  );
}
