const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  email: String, // ✅ tambahkan kalau belum
  password: String,
  role: String,
  vvip: Boolean,
});

module.exports = mongoose.model("User", UserSchema);
