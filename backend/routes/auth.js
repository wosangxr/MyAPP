// ── Auth Routes ──
// POST /api/auth/me — สร้าง/ดึง user หลัง Firebase login
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { authMiddleware } = require("../middleware/auth");

// POST /api/auth/me — Login สำเร็จแล้ว → สร้าง/อัปเดต user ใน MongoDB
router.post("/me", authMiddleware, async (req, res) => {
  try {
    const { uid, email, name, picture, provider } = req.user;
    const {
      firstName,
      lastName,
      phone,
      role: requestedRole,
    } = req.body || {};

    // ค้นหา user ที่มีอยู่แล้ว
    let user = await User.findOne({ firebaseUid: uid });

    if (user) {
      // อัปเดตข้อมูลจาก Firebase (avatar, name)
      if (picture && !user.avatar) user.avatar = picture;
      if (name && !user.name) user.name = name;
      user.provider = provider || user.provider;
      await user.save();
    } else {
      // สร้าง user ใหม่
      const adminEmail = process.env.ADMIN_EMAIL || "admin@helpapp.com";
      const isAdmin = email === adminEmail;

      user = await User.create({
        firebaseUid: uid,
        email: email,
        name: name || `${firstName || ""} ${lastName || ""}`.trim() || email,
        firstName: firstName || "",
        lastName: lastName || "",
        phone: phone || "",
        avatar: picture || null,
        provider: provider || "email",
        role: isAdmin ? "admin" : requestedRole || "user",
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        firebaseUid: user.firebaseUid,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        role: user.role,
        provider: user.provider,
        companyId: user.companyId,
        profile: user.profile,
        settings: user.settings,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    console.error("Auth /me error:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/auth/profile — ดึงข้อมูล profile ตัวเอง
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid }).populate(
      "companyId"
    );
    if (!user) return res.status(404).json({ error: "ไม่พบผู้ใช้" });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/auth/profile — อัปเดต profile
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { firebaseUid: req.user.uid },
      { $set: req.body },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: "ไม่พบผู้ใช้" });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
