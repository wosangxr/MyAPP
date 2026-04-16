// ── MongoDB Atlas Connection ──
const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes("YOUR_USERNAME")) {
    console.log("⚠️  MongoDB not configured — running without database");
    return false;
  }

  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB Atlas connected");
    return true;
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    return false;
  }
};

module.exports = connectDB;
