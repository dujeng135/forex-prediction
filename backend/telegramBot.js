const TelegramBot = require("node-telegram-bot-api");
const token = "8147229606:AAHDRQthLrU_idQv6u1Eto0V6THvbymi-II"; // ganti dengan token asli
const bot = new TelegramBot(token);

// Kirim sinyal otomatis
const sendSignalToTelegram = (prediction, input) => {
  const message = `
🚨 Sinyal Trading Otomatis!
📅 ${new Date().toLocaleString()}
📊 Prediksi Harga: $${prediction.price}
📈 Confidence: ${prediction.confidence}%

📥 Input:
- Open: ${input.open}
- High: ${input.high}
- Low: ${input.low}
- Close: ${input.close}
- Volume: ${input.volume}
  `.trim();

  // Ganti chatId dengan ID grup/channel/user tujuan
  const chatId = "@Sarjana_Trad3r";
  bot.sendMessage(chatId, message);
};
