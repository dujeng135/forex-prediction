// sendSignalToTelegram.js
const TelegramBot = require("node-telegram-bot-api");

const token = "8147229606:AAHDRQthLrU_idQv6u1Eto0V6THvbymi-II";
const bot = new TelegramBot(token, { polling: false });

function sendSignalToTelegram(data) {
  const { input, result, time } = data;

  // ✅ Gunakan action dari frontend jika tersedia
  const aksi = result.action
    ? result.action.toUpperCase()
    : parseFloat(result.price) > parseFloat(input.close)
    ? "BUY"
    : "SELL";

  const price = parseFloat(result.price).toFixed(2);
  const takeProfit = (parseFloat(price) + 30).toFixed(2);
  const stopLoss = (parseFloat(price) - 30).toFixed(2);
  const confidence = parseFloat(result.confidence).toFixed(1);

  const timeNow = time || new Date().toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
    dateStyle: "short",
    timeStyle: "medium",
  });

  const message = `
📡 *Sinyal Trading XAUUSD*
──────────────
📆 Waktu: ${timeNow}
🔁 Aksi: *${aksi}*
💰 Prediksi Harga: *$${price}*
🎯 Take Profit: *$${takeProfit}*
🛑 Stop Loss: *$${stopLoss}*
✅ Confidence: *${confidence}%*

🤖 Sinyal ini dihasilkan otomatis oleh *LSTM AI Model (D1)*
`.trim();

  const chatId = "@Sarjana_Trad3r";
  bot.sendMessage(chatId, message, { parse_mode: "Markdown" })
    .then(() => console.log("✅ Pesan berhasil dikirim ke Telegram"))
    .catch((err) => console.error("❌ Gagal kirim ke Telegram:", err.message));
}

module.exports = sendSignalToTelegram;
