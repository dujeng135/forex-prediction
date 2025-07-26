import { useEffect, useState } from "react";
import { Bot, Send, Signal, Wifi } from "lucide-react";
import QRCode from "react-qr-code";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // ⬅️ Panggil badge di paling atas


export default function TelegramBotPage() {
  const [lastSignal, setLastSignal] = useState(null);

  useEffect(() => {
    const logs = JSON.parse(localStorage.getItem("tradeLogs") || "[]");
    if (logs.length > 0) {
      setLastSignal(logs[logs.length - 1]);
    }
  }, []);

  const handleSendTestSignal = async () => {
    if (!lastSignal) {
      toast.error("Belum ada sinyal untuk dikirim."); return;
    }
  
    try {
      // Kirim persis data lastSignal ke backend
      const response = await fetch(
        "http://localhost:5000/api/lstm/save-history",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            input: {},
            result: {
              price: lastSignal.price,
              confidence: lastSignal.confidence,
              action: lastSignal.action, // ⬅️ ACTION disatukan di dalam result
              time: lastSignal.time      // ⬅️ Waktu juga ikut dimasukin ke result
            },
          }),
          
        }
      );
  
      const result = await response.json();
      if (response.ok) {
        toast.success("✅ Sinyal berhasil dikirim ke Telegram!");
        // ❌ TIDAK perlu menambah lagi ke tradeLogs — sudah ada.
      } else {
        toast.error("❌ Gagal kirim sinyal.");
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Error kirim sinyal.");
    }
  };
  
  
  return (
    <div className="max-w-6xl mx-auto px-6 py-2 text-white space-y-10">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <Bot className="text-blue-400" size={32} /> Telegram Bot Integration
      </h1>

      {/* Status Badge */}
      <div className="flex items-center gap-4">
      <Badge className="px-3 py-1 text-sm rounded-full font-semibold bg-gradient-to-r from-green-400 to-blue-500 text-black shadow">
          ✅ Bot Status: Aktif & Tersambung
          </Badge>
        <span className="text-sm text-white/70">Nama Channel: @Sarjana_Trader</span>
      </div>

      {/* QR Code Join */}
      <div className="flex items-center gap-8 flex-col sm:flex-row">
        <div className="bg-white p-2 rounded-xl shadow">
          <QRCode value="https://t.me/Sarjana_Trad3r" size={140} />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">📲 Join Channel Telegram</h2>
          <p className="text-white/80 text-sm max-w-md">
            Scan QR Code atau klik link untuk bergabung ke channel sinyal XAUUSD. 
            Anda akan menerima notifikasi otomatis saat sinyal LSTM tersedia.
          </p>
          <a
            href="https://t.me/Sarjana_Trad3r"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-blue-300 hover:underline text-sm"
          >
            🌐 https://t.me/Sarjana_Trad3r
          </a>
        </div>
      </div>

      {/* Riwayat Sinyal */}
      <div className="max-w-md bg-gradient-to-r from-[#1C1C1C] to-[#1C1C1C] p-5 rounded-xl border border-white/5">
  <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
    <Signal size={20} /> Riwayat Sinyal Terakhir
  </h3>
  {lastSignal ? (
    <ul className="text-sm space-y-1 text-white/90">
      <li>📆 Waktu: {lastSignal.time}</li>
      <li>🔁 Aksi: {lastSignal.action}</li>
      <li>💰 Harga Prediksi: ${Number(lastSignal.price).toFixed(2)}</li>
      <li>🎯 Take Profit: ${Number(lastSignal.price + 30).toFixed(2)}</li>
      <li>🛑 Stop Loss: ${Number(lastSignal.price - 30).toFixed(2)}</li>
      <li>✅ Confidence: {lastSignal.confidence}%</li>
    </ul>
  ) : (
    <p className="text-white/60 text-sm">Belum ada riwayat sinyal.</p>
  )}
</div>
      {/* Tombol Test Kirim */}
      <div className="pt-2">
        <Button
          onClick={handleSendTestSignal}
          className="bg-gradient-to-r from-blue-500 to-cyan-400 text-black text-sm hover:scale-105 transition"
        >
          <Send size={18} className="mr-2" />
          Kirim Sinyal Test Telegram
        </Button>
      </div>
    </div>
  );
}
