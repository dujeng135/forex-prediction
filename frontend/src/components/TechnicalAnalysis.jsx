import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ShieldCheck, TrendingUp, TrendingDown } from 'lucide-react';

const analysisData = [
  { indicator: 'RSI', value: 70 },
  { indicator: 'MACD', value: 65 },
  { indicator: 'Stochastic', value: 80 },
  { indicator: 'ADX', value: 60 },
];

export default function TechnicalAnalysis() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-[600px]">
      <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
        <ShieldCheck className="text-blue-500 w-5 h-5" /> Technical Analysis
      </h2>
      <p className="text-sm text-gray-600 mb-4">Indicative strength of various technical indicators.</p>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={analysisData}>
          <XAxis dataKey="indicator" />
          <YAxis domain={[0, 100]} />
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
          <Bar dataKey="value" fill="#3b82f6" name="Strength (%)" />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 grid grid-cols-3 gap-4 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <TrendingUp className="text-green-500 w-4 h-4" />
          Strong Bullish
        </div>
        <div className="flex items-center gap-2">
          <TrendingDown className="text-red-500 w-4 h-4" />
          Bearish Signal
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="text-blue-400 w-4 h-4" />
          Moderate Trend
        </div>
      </div>
    </div>
  );
}
