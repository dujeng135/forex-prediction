import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function RealtimeOHLCV({ onUse }) {
  const [ohlcv, setOhlcv] = useState({
    open: "-",
    high: "-",
    low: "-",
    close: "-",
    volume: "-"
  });

  const fetchData = async () => {
    try {
      const res = await fetch("https://financialmodelingprep.com/api/v3/quote/XAUUSD?apikey=wNfkxlX9BURdFchQumsPbLUlPsWluulD");
      const data = await res.json();
      const price = data[0];
  
      setOhlcv({
        open: price.open,
        high: price.dayHigh,
        low: price.dayLow,
        close: price.price,
        volume: price.volume,
      });
    } catch (err) {
      console.error("❌ Gagal ambil OHLCV FMP:", err);
    }
  };
  

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000); // refresh tiap 15 detik
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-2 bg-gradient-to-b from-[#000000] to-[#1a1c2c] p-4 rounded-xl border border-cyberAccent/30 text-white shadow">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-yellow-300">📡 Realtime XAUUSD (15m)</h2>
        <Button
          onClick={() => onUse(ohlcv)}
          className="text-sm bg-yellow-400 text-black hover:bg-yellow-300"
        >
          Gunakan
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
        <div>Open: <span className="text-cyan-400">${ohlcv.open}</span></div>
        <div>High: <span className="text-green-400">${ohlcv.high}</span></div>
        <div>Low: <span className="text-red-400">${ohlcv.low}</span></div>
        <div>Close: <span className="text-purple-400">${ohlcv.close}</span></div>
        <div>Volume: <span className="text-yellow-300">{ohlcv.volume}</span></div>
      </div>
    </div>
  );
}
