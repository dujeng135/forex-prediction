import { useEffect, useState } from "react";

export default function TradingSignals() {
  const [signals, setSignals] = useState([]);

  useEffect(() => {
    // Dummy data
    const dummySignals = [
      {
        type: "BUY",
        confidence: 87.5,
        price: 2085.40,
      },
      {
        type: "SELL",
        confidence: 62.3,
        price: 2082.70,
      },
    ];
    setSignals(dummySignals);
  }, []);

  return (
    <div className="space-y-5">
      {signals.map((signal, index) => {
        const isBuy = signal.type === "BUY";
        const barColor = isBuy ? "bg-green-500" : "bg-red-500";
        const labelColor = isBuy ? "text-green-400" : "text-red-400";

        return (
          <div key={index}>
            {/* Header Row */}
            <div className="flex justify-between items-center mb-1">
              <h3 className={`text-sm font-semibold ${labelColor}`}>
                {signal.type} Signal
              </h3>
              <span className="text-sm font-semibold text-white">
                {signal.confidence}%
              </span>
            </div>

            {/* Harga */}
            <div className="text-xs text-white/60 mb-2">
              Price: ${signal.price?.toFixed(2) || "-"}
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full ${barColor} transition-all duration-500`}
                style={{ width: `${signal.confidence}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
