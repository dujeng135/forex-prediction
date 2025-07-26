const mongoose = require("mongoose");

const LSTMHistorySchema = new mongoose.Schema({
  input: {
    open: String,
    high: String,
    low: String,
    close: String,
    volume: String,
  },
  result: {
    price: Number,
    confidence: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("LSTMHistory", LSTMHistorySchema);
