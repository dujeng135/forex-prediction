import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from "recharts";
import { useEffect, useState } from "react";

export default function PriceChartSection() {
  const [timeframe, setTimeframe] = useState("15m");
  const [data, setData] = useState([]);
  const [lastPrice, setLastPrice] = useState(null);
  const [priceChange, setPriceChange] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const interval = timeframe === "15m" ? "15min" : "1hour";
        const res = await fetch(
          `https://fmpcloud.io/api/v3/historical-chart/${interval}/XAUUSD?apikey=wNfkxlX9BURdFchQumsPbLUlPsWluulD&limit=300`
        );
        const raw = await res.json();

        const formatted = raw.map((d) => ({
          date: new Date(d.date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          price: d.close,
        })).reverse();

        setData(formatted);

        const last = formatted.at(-1)?.price || null;
        const prev = formatted.at(-2)?.price || null;

        setLastPrice(last);

        if (last && prev) {
          const change = last - prev;
          setPriceChange(
            change >= 0
              ? `▲ ${change.toFixed(2)}`
              : `▼ ${Math.abs(change).toFixed(2)}`
          );
        }
      } catch (err) {
        console.warn("⚠️ Gagal fetch chart. Dummy digunakan.");

        const dummy = [
          { date: "08:00", price: 2080 },
          { date: "08:15", price: 2085 },
          { date: "08:30", price: 2092 },
          { date: "08:45", price: 2087 },
          { date: "09:00", price: 2095 },
          { date: "09:15", price: 2102 },
        ];

        setData(dummy);
        setLastPrice(dummy.at(-1).price);
        setPriceChange("▲ 0.35");
      }
    };

    fetchChartData();
    const interval = setInterval(fetchChartData, 60000);
    return () => clearInterval(interval);
  }, [timeframe]);

  return (
    <div className="bg-gradient-to-br from-black to-[#1a1c2c] rounded-2xl p-5 shadow border border-white/10 text-white w-full h-[507px] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-white">
          XAUUSD Price (Futures)
        </h2>
        <select
          className="bg-[#1f2937] text-white text-sm px-3 py-1 rounded border border-slate-800 focus:outline-none"
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
        >
          <option value="15m">M15</option>
          <option value="1h">H1</option>
        </select>
      </div>

      {/* Price & Change */}
      <div className="mb-4">
        <p className="text-3xl font-bold leading-snug">
          ${lastPrice ?? "2088.10"}{" "}
          <span className="text-sm font-normal text-white/60">per troy ounce</span>
        </p>
        {priceChange && (
          <p className={`text-sm mt-1 ${priceChange.startsWith("▲") ? "text-green-400" : "text-red-400"}`}>
            {priceChange}
          </p>
        )}
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="date" stroke="#999" fontSize={12} />
            <YAxis
              stroke="#999"
              fontSize={12}
              domain={["dataMin", "dataMax"]}
              tickFormatter={(v) => `$${v.toFixed(2)}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "1px solid #374151",
                color: "#fff",
                fontSize: 13,
              }}
              formatter={(value) => [`$${value}`, "Price"]}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#00c3ff"
              fill="url(#gradient)"
              strokeWidth={2}
              dot={{ r: 2, fill: "#fff", stroke: "#00c3ff", strokeWidth: 1 }}
            />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00c3ff" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00c3ff" stopOpacity={0} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
