import { useEffect, useState } from "react";
import { BsGraphUp } from "react-icons/bs";

export default function HeaderEnhancer() {
  const [infoList, setInfoList] = useState([
    "FOMC Statement malam ini",
    "Dolar AS melemah setelah data inflasi dirilis - sentimen positif untuk XAUUSD",
    "XAUUSD menguat 0.71%",
    "AI mengirim 3 sinyal hari ini",
    "BUY Signal: $3342.65",
    "Spread: 1.2 pips",
    
  ]);

  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % infoList.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [infoList.length]);

  return (
    <div className="px-10 py-2 bg-black text-sm text-cyan-300 flex items-center gap-3 overflow-hidden whitespace-nowrap">
      <BsGraphUp className="text-yellow-400 animate-pulse" />
      <span className="inline-block animate-fade-loop">
        {infoList[index]}
      </span>
    </div>
  );
}
