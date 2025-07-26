import { useState } from "react";

export default function ExcelDataInput({ onUse, currentData, csvData = [] }) {
  const [showDataset, setShowDataset] = useState(false);
  const [visibleCount, setVisibleCount] = useState(50);

  const exampleData = {
    date: "13/07/2025 00:00",
    open: 3031.26,
    high: 3051.57,
    low: 3022.31,
    close: 3049.87,
    volume: 325,
  };

  const isEmpty = !currentData || Object.values(currentData).some(v => v === "" || v === null);
  const dataToShow = isEmpty ? exampleData : currentData;

  const handleUseData = () => {
    onUse(dataToShow);
  };

  const parseNum = (val) => parseFloat((val || "0").replace(/\./g, "").replace(",", "."));

  const parseNumber = (val) => {
    if (!val) return 0;
    // Langsung parseFloat aja, karena format CSV udah bener
    return parseFloat(val.toString().replace(",", "."));
  };
  
  
  
  

  const handleCSVClick = (row) => {
    const newData = {
      date: row.Date || "-",
      open: parseNumber(row.Open),
      high: parseNumber(row.High),
      low: parseNumber(row.Low),
      close: parseNumber(row.Close),
      volume: parseFloat(row.Volume || 0),
    };
  
    onUse(newData);
  };
  


  return (
    <div className="bg-gradient-to-b from-[#673ab7] to-[#1a1c2c] border border-slate-600 rounded-xl p-4 min-h-[298px] flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">📥 Data Excel</h2>

        <div className="grid grid-cols-5 gap-4 text-center text-sm font-medium text-white/70 mb-1">
          <div>Open</div>
          <div>High</div>
          <div>Low</div>
          <div>Close</div>
          <div>Volume</div>
        </div>

        <div className="grid grid-cols-5 gap-4 text-center text-xl font-bold text-white mb-3">
          <div>{dataToShow.open}</div>
          <div>{dataToShow.high}</div>
          <div>{dataToShow.low}</div>
          <div>{dataToShow.close}</div>
          <div>{dataToShow.volume}</div>
        </div>

        <label className="text-white text-sm block mb-1">📅 Ubah Tanggal & Jam</label>
        <input
          type="text"
          className="w-full p-2 mb-2 rounded bg-white/80 text-black"
          value={dataToShow.date}
          onChange={(e) => onUse({ ...dataToShow, date: e.target.value })}
        />
      </div>

      {/* 🔁 Gunakan + 📁 Tampilkan */}
      <div className="flex items-center justify-between mt-2">
        <button
          onClick={handleUseData}
          className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-2 py-1 rounded-md transition"
        >
          🔁 Gunakan
        </button>

        {csvData.length > 0 && (
          <button
            onClick={() => setShowDataset(!showDataset)}
            className="bg-slate-700 hover:bg-slate-600 text-white text-sm px-2 py-1 rounded-md"
          >
            {showDataset ? "🔽 Sembunyikan Dataset" : "📁 Tampilkan Dataset"}
          </button>
        )}
      </div>

      {/* 📁 Dataset CSV */}
      {showDataset && (
        <div className="mt-4">
          <p className="text-white text-sm mb-2 font-semibold">📁 Ambil Data dari Dataset</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-[240px] overflow-y-auto pr-1 border border-slate-600 rounded-md bg-[#111827] p-2">
            {csvData.slice(0, visibleCount).map((row, idx) => (
              <button
                key={idx}
                onClick={() => handleCSVClick(row)}
                className="text-left text-sm bg-[#1f2937] hover:bg-[#374151] text-white p-2 rounded-md border border-slate-700"
              >
                <p className="font-bold">#{idx + 1} | Date: {row.Date}</p>
                <p>O: {row.Open} | H: {row.High} | L: {row.Low}</p>
                <p>C: {row.Close} | V: {row.Volume}</p>
              </button>
            ))}
          </div>

          {/* 🔽 Load more */}
          {csvData.length > visibleCount && (
            <div className="text-center mt-2">
              <button
                onClick={() => setVisibleCount(visibleCount + 50)}
                className="text-yellow-400 hover:underline text-sm"
              >
                🔽 Tampilkan 50 Data Lagi
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
