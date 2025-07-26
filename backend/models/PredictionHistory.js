const mongoose = require("mongoose");

const predictionHistorySchema = new mongoose.Schema({
  input: {
    open: Number,
    high: Number,
    low: Number,
    close: Number,
    volume: Number,
  },
  predictedPrice: Number,
  confidence: Number,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
module.exports = { sendSignalToTelegram };
module.exports = mongoose.model("PredictionHistory", predictionHistorySchema);
