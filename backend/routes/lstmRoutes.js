const express = require("express");
const router = express.Router();
const LSTMHistory = require("../models/LSTMHistory");

// POST - Simpan histori
router.post("/save-history", async (req, res) => {
  try {
    const { input, result } = req.body;
    const newEntry = new LSTMHistory({ input, result });
    await newEntry.save();
    res.status(201).json({ message: "Data saved successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save data" });
  }
});

module.exports = router;
