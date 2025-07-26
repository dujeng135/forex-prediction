import { FaChartLine, FaSignal, FaChartBar } from "react-icons/fa";

export default function TechnicalSummary() {
  const data = [
    { label: "SMA 50", value: "Bullish", icon: <FaChartLine />, color: "text-green-400" },
    { label: "RSI", value: "63 (Overbought)", icon: <FaSignal />, color: "text-yellow-400" },
    
  ];

  return (
    <div className="bg-gradient-to-br from-black to-[#1a1c2c] p-5 rounded-xl shadow border border-slate-800 h-full h-[30]">
      <h2 className="text-base font-semibold mb-4 text-white flex items-center gap-2">
        📊 Technical Indicators
      </h2>
      <div className="space-y-3 text-sm text-white">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between border-b border-white/10 pb-1">
            <div className="flex items-center gap-3">
              <span className="text-white/70">{item.icon}</span>
              <span>{item.label}</span>
            </div>
            <span className={`font-semibold ${item.color}`}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
