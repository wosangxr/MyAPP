// ── Firebase Auth Middleware ──
// ตรวจสอบ Firebase ID Token จาก Authorization header
const admin = require("../config/firebase");

const authMiddleware = async (req, res, next) => {
  // ถ้า Firebase ยังไม่ได้ config ให้ข้ามไป (dev mode)
  if (!admin.apps || admin.apps.length === 0) {
    req.user = { uid: "dev-user", email: "dev@helpapp.com" };
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "ไม่ได้เข้าสู่ระบบ (No token)" });
  }

  const token = authHeader.split("Bearer ")[1];
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = {
      uid: decoded.uid,
      email: decoded.email,
      name: decoded.name || decoded.email,
      picture: decoded.picture || null,
      provider: decoded.firebase?.sign_in_provider || "unknown",
    };
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).json({ error: "Token ไม่ถูกต้องหรือหมดอายุ" });
  }
};

// Optional auth — ไม่บังคับ login แต่ถ้ามี token จะ decode
const optionalAuth = async (req, res, next) => {
  if (!admin.apps || admin.apps.length === 0) {
    req.user = null;
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    req.user = null;
    return next();
  }

  try {
    const token = authHeader.split("Bearer ")[1];
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = {
      uid: decoded.uid,
      email: decoded.email,
      name: decoded.name || decoded.email,
      picture: decoded.picture || null,
    };
  } catch {
    req.user = null;
  }
  next();
};

// Admin-only middleware — เช็คว่าเป็น admin
const adminOnly = async (req, res, next) => {
  // ต้องผ่าน authMiddleware ก่อน
  if (!req.user) {
    return res.status(401).json({ error: "ไม่ได้เข้าสู่ระบบ" });
  }

  const adminEmail = process.env.ADMIN_EMAIL || "admin@helpapp.com";

  if (req.user.email !== adminEmail) {
    return res
      .status(403)
      .json({ error: "คุณไม่มีสิทธิ์เข้าถึงส่วนนี้ (Admin only)" });
  }

  next();
};

module.exports = { authMiddleware, optionalAuth, adminOnly };
