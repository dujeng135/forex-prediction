const mongoose = require("mongoose");
const User = require("./User");

mongoose.connect("mongodb://127.0.0.1:27017/forex-lstm-dujeng")
  .then(async () => {
    console.log("✅ MongoDB connected");

    const users = [
      {
        username: "admin",
        password: "admin123",
        role: "admin",
      },
      {
        username: "user1",
        password: "user123",
        role: "user",
      },
      {
        username: "vvipuser",
        password: "vvip123",
        role: "vvip",
      }
    ];

    for (const u of users) {
      const existing = await User.findOne({ username: u.username });
      if (!existing) {
        await new User(u).save();
        console.log(`✅ User ${u.username} ditambahkan`);
      } else {
        console.log(`⚠️ User ${u.username} sudah ada`);
      }
    }

    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("❌ Error:", err);
  });
