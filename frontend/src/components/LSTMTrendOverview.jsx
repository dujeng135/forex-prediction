import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

const trends = [
  {
    icon: <TrendingUp className="text-green-500 w-6 h-6" />,
    title: "Bullish Momentum",
    description: "Pasar menunjukkan kecenderungan naik dalam 4 jam terakhir.",
  },
  {
    icon: <TrendingDown className="text-red-500 w-6 h-6" />,
    title: "Volatile Candle",
    description: "Volatilitas meningkat tajam, pergerakan harga tidak stabil.",
  },
  {
    icon: <Activity className="text-blue-500 w-6 h-6" />,
    title: "Trend Konsolidasi",
    description: "Harga bergerak mendatar, kemungkinan pembentukan breakout.",
  },
];

export default function LSTMTrendOverview() {
  return (
    <Card className="rounded-2xl shadow-md p-4">
      <CardContent>
        <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
          <span>📈</span> Trend Overview (LSTM)
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {trends.map((trend, idx) => (
            <div
              key={idx}
              className="bg-gray-50 p-4 rounded-xl shadow-sm border flex items-start gap-3 hover:shadow-lg transition"
            >
              <div>{trend.icon}</div>
              <div>
                <p className="font-semibold text-gray-700">{trend.title}</p>
                <p className="text-sm text-gray-500">{trend.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
