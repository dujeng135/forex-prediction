import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { generatePredictionPDF } from "@/utils/generatePredictionPDF";


/**
 * TradeHistory.jsx – menampilkan riwayat sinyal manual
 * Data di‑ambil otomatis dari localStorage key: "tradeLogs"
 * (tradeLogs ditambah setiap kali user menekan 🔍 Test Prediction di ManualLSTMTest)
 */
export default function TradeHistory() {
  // 🔸 Helper format DD/MM/YYYY HH:mm
const pad = (n) => String(n).padStart(2, "0");
const formatDate = (date) => {
  const d = typeof date === "string" ? new Date(date) : date;
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const [trades, setTrades] = useState([]);
  const [dateFilter, setDateFilter] = useState("");

  // ⏬ Load once saat mount
  useEffect(() => {
    const saved = localStorage.getItem("tradeLogs");
    if (saved) setTrades(JSON.parse(saved));

    // Listener supaya halaman auto‑refresh kalau tab lain menambah data
    const handleStorage = (e) => {
      if (e.key === "tradeLogs") {
        setTrades(JSON.parse(e.newValue || "[]"));
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // ➗ Filter berdasarkan tanggal (YYYY‑MM‑DD)
 // ✅ Fix: Filter tanggal berdasar YYYY-MM-DD
const filteredTrades = trades.filter((t) => {
  if (!dateFilter) return true;

  const tDate = new Date(t.time);
  const yyyy = tDate.getFullYear();
  const mm = String(tDate.getMonth() + 1).padStart(2, "0");
  const dd = String(tDate.getDate()).padStart(2, "0");
  const formatted = `${yyyy}-${mm}-${dd}`;

  return formatted === dateFilter;
});


  // 📊 Ringkasan
  const totalProfit = trades.reduce((acc, t) => acc + (t.profit || 0), 0);
  const totalBuy = trades.filter((t) => t.action === "BUY").length;
  const totalSell = trades.filter((t) => t.action === "SELL").length;

  // ⬇️ Export CSV helper
  const handleExportCSV = () => {
    if (trades.length === 0) return;
    const header = "ID,Time,Action,Price,Confidence\n";
    const rows = trades
    .map((t) => `${t.id},${formatDate(t.time)},${t.action},${Number(t.price).toFixed(2)},${t.confidence}%`)
    .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "trade_history.csv";
    a.click();
  };

  return (
    <div className="px-2 py-1">
      <h1 className="text-3xl font-bold mb-10 text-white text-center">📊 Histori Sinyal Manual</h1>

      <div className="max-w-6xl mx-auto rounded-2xl bg-zinc-900 text-white shadow-xl">
        <Card className="bg-gradient-to-b from-black to-[#0e172a] border border-white/20 shadow-md rounded-xl">
          {/* 👉 Filter & Export */}
          <CardHeader className="px-6 pt-6" />
          <div className="px-7 pb-4 flex flex-col md:flex-row md:justify-between gap-4">
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-zinc-800 p-2 rounded-md text-white"
            />
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportCSV}
                disabled={trades.length === 0}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  trades.length === 0
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-yellow-400 text-black hover:bg-yellow-500"
                }`}
              >
                ⬇️ Export CSV
              </button>
              <button
    onClick={() => {
      if (trades.length === 0) return;
      // PDF berisi seluruh riwayat
      generatePredictionPDF({
        input: {},            // kosong (tidak perlu)
        prediction: {},       // kosong (tidak perlu)
        tradeLogs: trades,    // 👉 kirim semua logs
      });
    }}
    disabled={trades.length === 0}
    className={`px-4 py-2 rounded-lg font-semibold transition ${
      trades.length === 0
        ? "bg-gray-600 cursor-not-allowed"
        : "bg-yellow-400 text-black hover:bg-yellow-500"
    }`}
  >
    ⬇️ Download PDF
  </button>
              {/* Tombol hapus riwayat */}
              <button
                onClick={() => {
                  if (window.confirm("Hapus semua riwayat?")) {
                    localStorage.removeItem("tradeLogs");
                    setTrades([]);
                  }
                }}
                disabled={trades.length === 0}
                className={`px-3 py-2 rounded-lg font-semibold transition text-red-400 hover:text-red-300 ${
                  trades.length === 0 ? "opacity-40 cursor-not-allowed" : ""
                }`}
              >
                🗑 Clear
              </button>
              
            </div>
          </div>

          {/* Summary */}
          <div className="px-6 pb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-zinc-800 p-4 rounded-xl">
              <p className="text-sm text-gray-300">Total Profit/Loss</p>
              <p className={`text-xl font-bold ${
                totalProfit >= 0 ? "text-green-300" : "text-red-300"
              }`}>${totalProfit.toFixed(2)}</p>
            </div>
            <div className="bg-zinc-800 p-4 rounded-xl">
              <p className="text-sm text-left text-white">Total BUY</p>
              <p className="text-xl font-bold text-green-400">{totalBuy}</p>
            </div>
            <div className="bg-zinc-800 p-4 rounded-xl">
              <p className="text-sm text-left text-white">Total SELL</p>
              <p className="text-xl font-bold text-red-400">{totalSell}</p>
            </div>
          </div>

          {/* Table riwayat */}
          <CardContent className="p-0">
            {trades.length === 0 ? (
              <div className="p-6 text-center text-white/70">Belum ada riwayat sinyal manual.</div>
            ) : (
              <div className="mt-3 overflow-x-auto max-h-[45vh] overflow-y-auto rounded-lg">
                <table className="min-w-full text-sm text-left text-white">
                  <thead className="sticky top-0 bg-[#1a1c2c] z-10">
                    <tr>
                      <th className="px-6 py-3">#</th>
                      <th className="px-6 py-3">Time</th>
                      <th className="px-6 py-3">Action</th>
                      <th className="px-6 py-3">Predicted Price</th>
                      <th className="px-6 py-3">Confidence</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTrades.map((t, i) => (
                      <tr key={t.id} className="border-b border-white/10 hover:bg-zinc-800 transition">
                        <td className="px-6 py-3 font-medium">{i + 1}</td>
                        <td className="px-6 py-3 whitespace-nowrap">{formatDate(t.time)}</td>
                        <td className="px-6 py-3">
                          <span
                            className={`px-2 py-1 rounded-full font-semibold text-xs ${
                              t.action === "BUY"
                                ? "bg-green-500/20 text-green-300"
                                : "bg-red-500/20 text-red-300"
                            }`}
                          >
                            {t.action}
                          </span>
                        </td>
                        <td className="px-6 py-3">${Number(t.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        <td className="px-6 py-3">{t.confidence}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
