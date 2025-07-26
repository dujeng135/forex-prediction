import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Dot } from "lucide-react";

export default function LSTMprediction({ className }) {
  const prediction = {
    signal: "BUY",
    price: 3249.67,
    target: "Next D1 Target",
    confidence: 84,
  };

  return (
    <div className={`text-white p-4  rounded-xl bg-gradient-to-b from-[#000000] to-[#1a1c2c] shadow ${className}`}>
      
      

      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="w-36 h-36">
          <CircularProgressbar
            value={prediction.confidence}
            text={`${prediction.confidence}%`}
            strokeWidth={12}
            styles={buildStyles({
              pathColor: "#6366f1", // ungu/blue
              trailColor: "#2e2e2e",
              textColor: "#ffffff",
              textSize: "20px",
            })}
          />
        </div>

        <p className="text-2xl font-bold">${prediction.price.toLocaleString()}</p>
        <div className="flex items-center gap-2">
          <Dot className="text-green-400" />
          <p className="text-md font-bold">{prediction.signal} Signal</p>
        </div>
        <p className="text-sm text-white/70">{prediction.target}</p>
      </div>
    </div>
  );
}
