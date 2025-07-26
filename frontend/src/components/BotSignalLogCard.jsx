// components/BotSignalLogCard.jsx
import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";

// components/BotSignalLogCard.jsx

const dummyLogs = [
  {
    time: "15:04",
    status: "success",
    icon: "✅",
    color: "🟢",
    message: "BUY signal sent",
  },
  {
    time: "12:30",
    status: "failed",
    icon: "❌",
    color: "🔴",
    message: "Failed to send SELL",
  },
  {
    time: "09:20",
    status: "pending",
    icon: "⏳",
    color: "🟡",
    message: "Waiting for validation",
  },
];

export default function BotSignalLogCard() {
  return (
    <div className="text-sm font-mono text-white space-y-8">
      <h3 className="text-base font-bold text-white mb-9"></h3>
      <hr className="border-white/20 mb-2" />
      {dummyLogs.map((log, idx) => (
        <div key={idx} className="flex items-start">
          <span className="w-8">{log.color}</span>
          <span className="w-[60px]">[{log.time}]</span>
          <span className="mr-2">{log.icon}</span>
          <span>{log.message}</span>
        </div>
      ))}
    </div>
  );
}

