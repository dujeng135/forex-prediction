const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Nanti bisa di-hash
  role: {
    type: String,
    enum: ["admin", "user", "vvip"],
    default: "user"
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);
