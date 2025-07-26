import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function generatePredictionPDF({ tradeLogs = [] }) {
  const doc = new jsPDF();

  const pad = (n) => String(n).padStart(2, "0");
  const now = new Date();
  const formattedNow = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}`;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Laporan Riwayat Prediksi Manual", 14, 20);

  doc.setFontSize(12);
  doc.setTextColor(100);
  doc.text(`Tanggal dibuat: ${formattedNow}`, 14, 30);

  if (tradeLogs.length > 0) {
    autoTable(doc, {
      startY: 40,
      head: [["#", "Tanggal", "Aksi", "Harga Prediksi", "Confidence"]],
      body: tradeLogs.map((t, i) => {
        const tDate = new Date(t.time);
        const formattedDate = `${pad(tDate.getDate())}/${pad(tDate.getMonth() + 1)}/${tDate.getFullYear()} ${pad(tDate.getHours())}:${pad(tDate.getMinutes())}`;
        return [
          i + 1,
          formattedDate,
          t.action,
          isNaN(Number(t.price)) ? "-" : `$${Number(t.price).toFixed(2)}`,
          `${t.confidence}%`,
        ];
      }),
    });

    doc.setFontSize(11);
    doc.setTextColor(80);
    doc.text("Data ini diambil dari pengujian manual model LSTM berbasis OHLCV", 12, doc.lastAutoTable.finalY + 10);
  } else {
    doc.setFontSize(12);
    doc.setTextColor(150);
    doc.text("Tidak ada data untuk ditampilkan.", 14, 40);
  }

  doc.setFontSize(12);
  doc.setTextColor(50);
  doc.text("Hormat kami,", 14, doc.lastAutoTable.finalY + 35);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Sarjana Trader", 14, doc.lastAutoTable.finalY + 50);

  doc.save("LSTM_Trade_History.pdf");
}
