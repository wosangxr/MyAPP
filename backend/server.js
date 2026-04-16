// ═══════════════════════════════════════
//  HelpAPP — Central API Server
//  Firebase Auth + MongoDB Atlas
// ═══════════════════════════════════════
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// ── Middlewares ──
app.use(
  cors({
    origin: [
      "http://localhost:3000", // admin-web
      "http://localhost:3002", // company-app
      "http://localhost:8081", // expo dev
      "http://localhost:19006", // expo web
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Health Check ──
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    app: "HelpAPP Backend",
    timestamp: new Date().toISOString(),
  });
});

// ── API Routes ──
app.use("/api/auth", require("./routes/auth"));
app.use("/api/companies", require("./routes/companies"));
app.use("/api/jobs", require("./routes/jobs"));
app.use("/api/applications", require("./routes/applications"));
app.use("/api/favorites", require("./routes/favorites"));
app.use("/api/stats", require("./routes/stats"));

// ── Start Server ──
const port = process.env.PORT || 3001;

const start = async () => {
  // Connect to MongoDB
  const dbConnected = await connectDB();

  app.listen(port, () => {
    console.log(`\n🚀 HelpAPP Backend running on http://localhost:${port}`);
    console.log(`📦 MongoDB: ${dbConnected ? "Connected" : "Not configured"}`);
    console.log(`🔐 Admin: ${process.env.ADMIN_EMAIL || "admin@helpapp.com"}`);
    console.log(`───────────────────────────────────────\n`);
  });
};

start();
