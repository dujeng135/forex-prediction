import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import PriceChartSection from "../components/PriceChartSection";
import TradingSignals from "../components/TradingSignals";
import LSTMprediction from "../components/LSTMprediction";
import MarketSessionClock from "../components/MarketSessionClock";
import MarketOverviewCard from "../components/MarketOverviewCard";
import BotSignalLogCard from "../components/BotSignalLogCard";
import PredictionAndRecentCard from "../components/RecentSignals";
import UserProfileDropdown from "../components/UserProfileDropdown"; // komponen dropdown profil
import SettingsDrawer from "../components/SettingsDrawer";
import NotificationBell from "../components/NotificationBell";
import HeaderEnhancer from "../components/HeaderEnhancer";
import VolumeAnalysis from "../components/VolumeAnalysis";




export default function DashboardPage() {
  const isAdmin = localStorage.getItem("role") === "admin";
  const adminVerified = localStorage.getItem("adminVerified") === "true";
  const [username, setUsername] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [overview, setOverview] = useState({
    price: "$2,088.10",
    high: "$2,095.50",
    low: "$2,081.20",
    change: "▲ 0.35%"
  });

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
  }, []);

  if (isAdmin && !adminVerified) {
    return <Navigate to="/admin-verify" />;
  }
  useEffect(() => {
    const fetchGoldPrice = async () => {
      try {
        const res = await fetch(
          `https://fmpcloud.io/api/v3/quote/XAUUSDT?apikey=wNfkxlX9BURdFchQumsPbLUlPsWluulD`
        );
        
        const data = await res.json();

        if (!data || !data[0]) throw new Error("No data");

        const gold = data[0];
        setOverview({
          price: `$${gold.price.toFixed(2)}`,
          high: `$${gold.dayHigh.toFixed(2)}`,
          low: `$${gold.dayLow.toFixed(2)}`,
          change:
            gold.change > 0
              ? `▲ ${gold.change.toFixed(2)}`
              : `▼ ${Math.abs(gold.change).toFixed(2)}`
        });
      } catch (err) {
        console.warn("⚠️ Gagal fetch API, pake fallback:", err.message);
        const fallback = await fetch("/mock/gold-price.json");
        const data = await fallback.json();
        const gold = data[0];

        setOverview({
          price: `$${gold.price.toFixed(2)}`,
          high: `$${gold.dayHigh.toFixed(2)}`,
          low: `$${gold.dayLow.toFixed(2)}`,
          change:
            gold.change > 0
              ? `▲ ${gold.change.toFixed(2)}`
              : `▼ ${Math.abs(gold.change).toFixed(2)}`
        });
      }
    };

    fetchGoldPrice();
    const interval = setInterval(fetchGoldPrice, 5000);
    return () => clearInterval(interval);
  }, []);
  

  return (
    <div className="min-h-screen bg-black text-white font-futuristic">
      {/* Header Sticky */}
      <div className="sticky top-0 z-30 bg-black/90 backdrop-blur px-2 py-2 border-b border-slate-800 flex justify-between items-center">
        <h1 className="text-xl font-semibold tracking-wide">Dashboard</h1>

          {/* Tambahan Fitur Tengah */}
         <HeaderEnhancer />

        {/* Dropdown Profil User */}
        <div className="flex items-center gap-4">
  <NotificationBell />
  <UserProfileDropdown onOpenSettings={() => setIsSettingsOpen(true)} />
   </div>
      </div>
      {/* Main Content */}
      <main className="w-full px-1 py-6">
        {/* Market Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <MarketOverviewCard
  title="Current Price"
  value={overview.price}
  change={overview.change}
/>
<MarketOverviewCard
  title="High Today"
  value={overview.high}
/>
<MarketOverviewCard
  title="Low Today"
  value={overview.low}
/>

  <MarketOverviewCard title="Spread" value="1.2 pips" />
</div>


        
        {/* Chart + Sinyal Hari Ini */}
        {/* Chart + Market Session + LSTM Prediction */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

  {/* Chart (besar) dan di tutup sementara*/}
  <div  className="lg:col-span-2 bg-box">
    <PriceChartSection /><br></br>
    <div className="md:col-span-4">
  <VolumeAnalysis />
</div>
  </div>

  {/* Market Session + LSTM Prediction */}
  <div className="flex flex-col gap-6">
    {/* Market Session */}
    <div className="bg-gradient-to-b from-[#000000] to-[#1a1c2c] p-7 rounded-xl shadow border border-slate-800 py-5">
      <MarketSessionClock />
    </div>

    {/* Prediksi LSTM Model */}
    <div className="bg-gradient-to-b from-[#000000] to-[#1a1c2c] p-4 rounded-xl shadow border border-slate-800">
      <h2 className="text-base font-semibold mb-3">🤖 Prediksi LSTM Model</h2>
      <LSTMprediction />
    </div>
  </div>
</div>



        {/* LSTM + Recent + Bot Log */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-4 bg-gradient-to-br from-black to-[#1a1c2c] p-6 rounded-xl shadow border border-slate-800 max-h-[320px]">
  <h2 className="text-base font-semibold mb-3">📌 Sinyal Hari Ini</h2><br></br>
  <TradingSignals />
</div>

          <div className="md:col-span-4 bg-gradient-to-br from-black to-[#1a1c2c] p-6 rounded-xl shadow border border-slate-800 max-h-[320px]">
            <h2 className="text-base font-semibold mb-3">📋 Recent Signals</h2>
            <PredictionAndRecentCard />
          </div>
          <div className="md:col-span-4 bg-gradient-to-br from-black to-[#1a1c2c] p-6 rounded-xl shadow border border-slate-800 min-h-[320px] overflow-y-auto">
            <h2 className="text-base font-semibold mb-3">📡 Log Pengiriman Bot</h2>
            <BotSignalLogCard />
          </div>
         
        </div>
      </main>
      <SettingsDrawer isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}
