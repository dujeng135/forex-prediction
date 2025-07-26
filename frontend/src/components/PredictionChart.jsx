import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function PredictionChart({ input, predicted, signal }) {
  const open = parseFloat(input.open) || 0;
  const high = parseFloat(input.high) || 0;
  const low = parseFloat(input.low) || 0;
  const close = parseFloat(input.close) || 0;
  const pred = parseFloat(predicted) || 0;

  const data = [
    { name: "Open", value: open },
    { name: "High", value: high },
    { name: "Low", value: low },
    { name: "Close", value: close },
  ];

  if (pred) {
    data.push({ name: "Predicted", value: pred });
  }

  // Hitung min/max chart supaya fleksibel + tidak motong
  const allValues = data.map((d) => d.value);
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);

  // Tambahkan margin atas & bawah
  const yMin = min - (max - min) * 0.2;
  const yMax = max + (max - min) * 0.2;

  return (
    <div className="w-full h-[220px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2f2f2f" />
          <XAxis dataKey="name" stroke="#aaa" />
          <YAxis
            domain={[yMin, yMax]}
            stroke="#aaa"
            tickFormatter={(v) => v.toLocaleString()}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#111", border: "1px solid #333" }}
            labelStyle={{ color: "#fff" }}
            formatter={(value) => `$${value.toLocaleString()}`}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={signal === "Buy" ? "#22d3ee" : "#f87171"} // biru untuk Buy, merah untuk Sell
            strokeWidth={2}
            dot={{ r: 4, stroke: "#fff", strokeWidth: 1 }}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
