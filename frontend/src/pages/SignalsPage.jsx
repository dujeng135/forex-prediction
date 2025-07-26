import SignalCard from "../components/signals/SignalCard";
import SignalList from "../components/signals/SignalList";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const dummySignals = [
    {
      pair: "XAUUSD",
      signal: "Buy", // Ganti dari "type" ke "signal"
      confidence: 87,
      time: "2025-06-26 13:00",
    },
    {
      pair: "XAUUSD",
      signal: "Sell",
      confidence: 72,
      time: "2025-06-26 10:30",
    },
    {
      pair: "XAUUSD",
      signal: "Buy",
      confidence: 94,
      time: "2025-06-26 08:45",
    },
  ];
  

export default function SignalPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const isVvip = localStorage.getItem("vvip");
    if (isVvip !== "true") {
      navigate("/upgrade"); // ⛔ Arahkan kalau bukan VVIP
    }
  }, []);

  return (
    <div>
      <h2 className="text-white text-xl font-semibold mb-4">📌 Sinyal Harian</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {dummySignals.map((signal, index) => (
    <SignalCard key={index} {...signal} />
  ))}
</div>


    </div>
  );
}  
