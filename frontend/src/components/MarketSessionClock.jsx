import { useEffect, useState } from "react";

const sessions = [
  {
    name: "Asia",
    start: 6,
    end: 15,
    color: "text-green-400",
    emoji: "🟢",
  },
  {
    name: "London",
    start: 14,
    end: 23,
    color: "text-yellow-400",
    emoji: "🟡",
  },
  {
    name: "New York",
    start: 20,
    end: 5,
    color: "text-red-400",
    emoji: "🔴",
  },
];

export default function MarketSessionClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hour = time.getHours();
  const formattedTime = time.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const isActive = (start, end) => {
    if (start < end) return hour >= start && hour < end;
    return hour >= start || hour < end;
  };

  return (
    <div className="text-white text-sm space-y-7">
      <h3 className="text-base font-semibold mb-3 font-medium mb-4 tracking-wide text-white/90">
         Market Sessions WIB:{" "}
        <span className="font-mono text-cyan-300 ml-2">{formattedTime}</span>
      </h3>

      <div className="space-y-3">
        {sessions.map((session) => {
          const active = isActive(session.start, session.end);
          return (
            <div
              key={session.name}
              className={`flex justify-between items-center px-11 py-3 rounded-lg
                bg-white/150 transition border border-white/10 
                ${active ? "shadow-[0_0_5px_#0000FF]" : ""}
              `}
            >
              <span
                className={`font-semibold tracking-wide ${
                  active ? "text-yellow-300" : session.color
                }`}
              >
                {session.emoji} {session.name}
              </span>
              <span className="text-sm text-white/70">
                {session.start}:00 - {session.end}:00
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
