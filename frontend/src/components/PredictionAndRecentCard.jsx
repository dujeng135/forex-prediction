import LSTMprediction from "./LSTMprediction";
import RecentSignals from "./RecentSignals";

export default function PredictionAndRecentCard() {
  return (
    <div className="bg-[#1f2937] p-5 rounded-xl shadow-md border border-slate-700 text-white">
      <h2 className="text-lg font-semibold mb-4">🤖 Prediksi LSTM & 📡 Sinyal Terbaru</h2>

      {/* Bagian Prediksi */}
      <div className="mb-6">
        <LSTMprediction />
      </div>

      {/* Divider */}
      <div className="border-t border-white/10 my-4" />

      {/* Bagian Sinyal Terbaru */}
      <div>
        <h3 className="text-md font-semibold mb-2 text-white/80">📡 Sinyal Terbaru</h3>
        <RecentSignals />
      </div>
    </div>
  );
}
