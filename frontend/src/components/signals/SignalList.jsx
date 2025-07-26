// components/signals/SignalCard.jsx
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function SignalCard({ symbol, signal, confidence, time }) {
  const isBuy = signal?.toLowerCase() === "buy";
  const color = isBuy ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100";
  const Icon = isBuy ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition w-full max-w-xs">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{symbol || "XAUUSD"}</h3>
          <p className={`inline-flex items-center gap-2 mt-1 px-3 py-1 text-sm rounded-full ${color}`}>
            <Icon className="w-4 h-4" />
            {signal || "Sell"}
          </p>
        </div>
        <div className="text-right text-sm text-gray-600">
          <p>{time || "2025-06-26 13:00"}</p>
          <p>Confidence: <span className="font-semibold text-black">{confidence || 0}%</span></p>
        </div>
      </div>
    </div>
  );
}
