// components/MarketOverviewCard.jsx
export default function MarketOverviewCard({ title, value, change }) {
  return (
    <div  className="bg-gradient-to-b from-[#000000] to-[#1a1c2c]
 p-7 rounded-xl shadow-md border border-[#1a1c2c] cursor-pointer">
      <h3 className="text-sm text-white/60">{title}</h3>

{/* Baris horizontal antara harga dan perubahan */}
<div className="flex items-center justify-between">
  <p className="text-2xl font-bold text-white">{value}</p>
  {change && (
    <p className={`text-sm ml-2 ${change.startsWith("▲") ? "text-green-400" : "text-red-400"}`}>
      {change}
    </p>
  )}
</div>  
</div>
  );
}
