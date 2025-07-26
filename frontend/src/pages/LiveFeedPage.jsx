import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

const LiveFeedPage = () => {
  const [price, setPrice] = useState(null);
  const [lastSignal, setLastSignal] = useState("Loading...");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const priceRes = await fetch(
          "https://financialmodelingprep.com/api/v3/quote/XAUUSD?apikey=wNfkxlX9BURdFchQumsPbLUlPsWluulD"
        );
        const priceData = await priceRes.json();
        setPrice(priceData[0]?.price ?? 0);

        const signalRes = await fetch("http://localhost:5000/api/signals/last");
        const signalData = await signalRes.json();
        setLastSignal(signalData?.signal ?? "Tidak ada");
      } catch (err) {
        console.error("Gagal fetch data:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const isBuy = lastSignal === "BUY";
  const signalColor = isBuy ? "text-green-400" : "text-red-400";
  const signalBg = isBuy ? "bg-green-900/20" : "bg-red-900/20";
  const SignalIcon = isBuy ? TrendingUp : TrendingDown;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8 text-white">
      <h2 className="text-3xl font-bold text-center">📡 Live Feed XAUUSD</h2>

      {/* Harga emas realtime */}
      <div className="backdrop-blur bg-white/5 border border-white/10 rounded-xl p-6 space-y-2 shadow-lg">
        <h3 className="text-lg font-semibold text-white/80">Harga Emas Saat Ini</h3>
        <p className="text-5xl font-bold text-yellow-400">${price?.toFixed(2)}</p>
        <p className="text-sm text-white/50">Auto-refresh setiap 5 detik</p>
      </div>

      {/* Sinyal terakhir */}
      <div
        className={`p-6 rounded-xl border border-white/10 shadow-md flex items-center gap-4 ${signalBg}`}
      >
        <SignalIcon size={40} className={`${signalColor}`} />
        <div>
          <h3 className="text-xl font-semibold text-white/90">Sinyal Terakhir</h3>
          <p className={`text-3xl font-bold ${signalColor}`}>{lastSignal}</p>
        </div>
      </div>

      {/* Alert sinyal */}
      <div className="bg-gradient-to-r from-yellow-600/30 to-transparent border-l-4 border-yellow-400 px-4 py-3 rounded-md flex items-center gap-3">
        <AlertTriangle className="text-yellow-400" />
        <p className="text-sm text-white/90">
          Sinyal ini adalah hasil prediksi AI. Gunakan dengan bijak dan sesuaikan dengan strategi Anda.
        </p>
      </div>
    </div>
  );
};

export default LiveFeedPage;
