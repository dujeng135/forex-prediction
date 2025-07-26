import { useEffect, useState } from "react";
import MarketOverviewCard from "./MarketOverviewCard";



export default function MarketOverviewSection() {
  const [price, setPrice] = useState(null);
  const [change, setChange] = useState(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch(
          `https://fmpcloud.io/api/v3/quote/XAUUSDT?apikey=wNfkxlX9BURdFchQumsPbLUlPsWluulD`
        );
        const data = await res.json();
        if (data && data.length > 0) {
          const quote = data[0];
          setPrice(quote.price?.toFixed(2));
          setChange(quote.change > 0 ? `▲ ${quote.change.toFixed(2)}` : `▼ ${quote.change.toFixed(2)}`);
        }
      } catch (err) {
        console.error("❌ Gagal ambil harga XAUUSD:", err);
      }
    };

    fetchPrice();

    const interval = setInterval(fetchPrice, 30000); // refresh tiap 30 detik
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MarketOverviewCard title="XAUUSD Price" value={price ? `$${price}` : "Loading..."} change={change} />
      {/* Tambahan kartu bisa diselipkan di sini */}
    </div>
  );
}
