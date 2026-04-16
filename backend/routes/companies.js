// ── Company Routes ──
const express = require("express");
const router = express.Router();
const Company = require("../models/Company");
const User = require("../models/User");
const { authMiddleware } = require("../middleware/auth");

// GET /api/companies/me — ดึงข้อมูลบริษัทของฉัน
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const company = await Company.findOne({ firebaseUid: req.user.uid });
    res.json({ data: company || null });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/companies — สร้างบริษัท
router.post("/", authMiddleware, async (req, res) => {
  try {
    // ค้นหา user
    let user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) {
      return res.status(404).json({ error: "ไม่พบผู้ใช้" });
    }

    const company = await Company.create({
      ...req.body,
      ownerId: user._id,
      firebaseUid: req.user.uid,
    });

    // อัปเดต user role เป็น company
    user.role = "company";
    user.companyId = company._id;
    await user.save();

    res.json({ success: true, data: company });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/companies/:id — อัปเดตข้อมูลบริษัท
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const company = await Company.findOneAndUpdate(
      { _id: req.params.id, firebaseUid: req.user.uid },
      { $set: req.body },
      { new: true }
    );
    if (!company)
      return res.status(404).json({ error: "ไม่พบหรือไม่มีสิทธิ์" });
    res.json({ success: true, data: company });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/companies — ดึงรายชื่อบริษัททั้งหมด (admin)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const companies = await Company.find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(100);
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
