import { Clock3 } from "lucide-react";

export default function RecentSignals({ className }) {
  const signals = [
    { type: "BUY", confidence: 89, time: "10:35 AM" },
    { type: "SELL", confidence: 76, time: "09:50 AM" },
    { type: "BUY", confidence: 92, time: "09:15 AM" },
    
  ];

  return (
    <div className={`space-y-3 ${className}`}>
      {signals.map((signal, index) => (
        <div
          key={index}
          className={`flex justify-between items-center px-4 py-3 rounded-xl ${
            signal.type === "BUY"
              ? "bg-green-100 text-green-900"
              : "bg-red-100 text-red-900"
          }`}
        >
          <div>
            <p className="font-semibold">{signal.type}</p>
            <p className="text-sm">Confidence: {signal.confidence}%</p>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Clock3 className="w-4 h-4" />
            {signal.time}
          </div>
        </div>
      ))}
    </div>
  );
}
