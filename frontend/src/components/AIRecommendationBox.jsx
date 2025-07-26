import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function SignalInsightBox({ prediction }) {
  const hasPrediction = prediction && prediction.signal;
  const signalText = hasPrediction ? prediction.signal.toUpperCase() : "";
  const isBuy = signalText === "BUY";
  const confidence = hasPrediction ? prediction.confidence : null;
  const predictedPrice = hasPrediction ? prediction.price : null;

  return (
    <Card className="bg-gradient-to-br from-[#1a1c2c] to-black border border-white/20 shadow-xl rounded-2xl text-white px-6 py-8 min-h-[260px]">
     <CardHeader>
        <CardTitle className="text-[20px] font-semibold">📦 Signal Insight</CardTitle><br></br><br></br>
      </CardHeader>


      <CardContent className="space-y-5 text-[15px] leading-relaxed">
        {hasPrediction ? (
          <>
            <div className="space-y-1">
              <p className={`text-lg font-bold ${isBuy ? "text-green-400" : "text-red-400"}`}>
                Sinyal: {signalText}
              </p>
              <p>
                Perkiraan harga akan{" "}
                <strong>{isBuy ? "naik" : "turun"}</strong> dalam jangka pendek (D1)
              </p>
            </div>

           

            <div className="flex items-center gap-3">
              <span className="text-white/80">Predicted Price:</span>
              <span className="text-blue-400 font-semibold text-lg">
                ${Number(predictedPrice).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white/80">Confidence:</span>
              <span className="text-yellow-300 font-semibold text-lg">{confidence}%</span>
            </div>

            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
              <div
                className="bg-yellow-400 h-2"
                style={{ width: `${confidence}%` }}
              />
            </div>

            <div className="text-white/80 text-[14px] border-t border-white/10 pt-4">
              <strong>🧠 AI Insight:</strong>{" "}
              Model LSTM mendeteksi pola{" "}
              <span className="italic">{isBuy ? "bullish" : "bearish"}</span>{" "}
              berdasarkan data OHLCV 5 hari terakhir. Insight ini cocok untuk strategi intraday dan analisis arah pasar harian.
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-white/70 min-h-[120px]">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-400 mb-4" />
            <p>
              Belum ada prediksi. Silakan input data lalu klik{" "}
              <strong>Test Prediction</strong>.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
