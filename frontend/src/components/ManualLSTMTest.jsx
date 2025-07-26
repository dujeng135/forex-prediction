import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ExcelDataInput from "./lstm/ExcelDataInput";
import { loadCSVData } from "@/utils/loadCSVData";
import { toast } from "sonner";
import AIRecommendationBox from "./AIRecommendationBox";
import { generatePredictionPDF } from "@/utils/generatePredictionPDF";




export default function ManualLSTMTest({ defaultInput }) {
  const [input, setInput] = useState({ date: "", open: "", high: "", low: "", close: "", volume: "" });
  const [prediction, setPrediction] = useState({ signal: null, price: null, confidence: null });
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    if (defaultInput) setInput(defaultInput);
  }, [defaultInput]);

  useEffect(() => {
    loadCSVData("/data/XAUUSD_D1_2025.csv").then(data => {
      console.log("✅ CSV Loaded:", data);
      setCsvData(data);
    });
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (["open", "high", "low", "close", "volume"].includes(name)) {
      value = value.replace(",", ".");
    }

    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/lstm/predict", {
      method: "POST",
      headers:{
        "Content-Type":"application/json",
        "X-Manual-Test":"true"       // << sinyal manual, jangan kirim ke TG
      },
      body: JSON.stringify(input),
    })
      .then((res) => res.json())
      .then((data) => {
        // ‼️ 1) Tampilkan di UI
        setPrediction(data);
  
        // ✅ Ganti notifikasi biasa (tanpa Telegram)
        toast.success(`Prediksi berhasil disimpan ke Trade History.`);
  
        // ✅ 2) Simpan otomatis ke Trade History (localStorage)
        const existingLogs = JSON.parse(localStorage.getItem("tradeLogs") || "[]");
        const newLog = {
          id: Date.now(),
          time: new Date().toLocaleString(),
          action: data.signal,
          price: data.price,
          confidence: data.confidence,
        };
  
        localStorage.setItem("tradeLogs", JSON.stringify([...existingLogs, newLog]));
      })
      .catch((err) => {
        console.error("❌ Gagal fetch:", err);
        toast.error("❌ Gagal ambil prediksi dari backend.");
      });
  };
  
  const handleReset = () => {
    setInput({ date: "", open: "", high: "", low: "", close: "", volume: "" });
    setPrediction({ signal: null, price: null, confidence: null });
  };
  

  return (
    <div className="max-w-7xl mx-auto px-0 py-0 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* KIRI */}
      <div className="space-y-6">
        <ExcelDataInput onUse={(data) => setInput(data)} currentData={input} csvData={csvData} />

        <Card className="bg-gradient-to-br from-black to-[#1a1c2c] border border-white/20 shadow rounded-xl py-1">
          <CardHeader className="pb-1">
            <CardTitle>⚙️ LSTM Model</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input name="open" value={input.open} onChange={handleChange} placeholder="Open" type="number" className="p-2 rounded bg-blue-100 text-black" />
                <input name="high" value={input.high} onChange={handleChange} placeholder="High" type="number" className="p-2 rounded bg-blue-100 text-black" />
                <input name="low" value={input.low} onChange={handleChange} placeholder="Low" type="number" className="p-2 rounded bg-blue-100 text-black" />
                <input name="close" value={input.close} onChange={handleChange} placeholder="Close" type="number" className="p-2 rounded bg-blue-100 text-black" />
              </div>
              <input name="volume" value={input.volume} onChange={handleChange} placeholder="Volume" type="number" className="w-full p-2 rounded bg-blue-100 text-black" />
              <div className="flex gap-4 pt-2">
                <Button type="submit" className="bg-yellow-400 text-black hover:bg-yellow-300 text-sm">🔍 Test Prediction</Button>
                <Button type="button" variant="outline" onClick={handleReset} className="text-sm">❌ Reset</Button>
                {prediction.signal && (
    <div className="ml-auto">
      
    </div>
  )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* KANAN */}
      <div className="space-y-5">
        <Card className="bg-gradient-to-b from-black to-[#1a1c2c] border border-white/5 shadow rounded-xl">
          <CardContent className="text-sm text-white/80 leading-relaxed border-l-4 border-purple-500 rounded-xl pl-4 py-3">
            🧠 <span className="font-semibold">Tentang Manual LSTM Model Test:</span>
            Fitur ini memungkinkan pengguna menguji prediksi sinyal Buy/Sell secara manual berdasarkan
             input data OHLCV
             (Open, High, Low, Close, Volume) dengan model LSTM berbasis time-frame D1 (Daily). Cocok untuk analisis 
             dan validasi akurasi prediksi secara langsung.
          </CardContent>
        </Card>

        
        <AIRecommendationBox prediction={prediction} />
      </div>
    </div>
  );
}
