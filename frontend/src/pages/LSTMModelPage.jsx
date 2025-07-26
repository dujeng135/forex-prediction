import { useState } from "react";
import ManualLSTMTest from "../components/ManualLSTMTest";


export default function LSTMModelPage() {
  const [ohlcv, setOhlcv] = useState({ open: "", high: "", low: "", close: "", volume: "" });

  const handleUse = (newData) => {
    setOhlcv(newData);
  };

  return (
    <div className="px-1 py-0">
      <h1 className="text-3xl font-bold text-white mb-9 text-center">
      ⚙️ Manual LSTM Model Test
    </h1>
    
      <ManualLSTMTest defaultInput={ohlcv} />
      
    </div>
  );
}
