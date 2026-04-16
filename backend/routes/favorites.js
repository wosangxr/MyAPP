// ── Favorites Routes ──
const express = require("express");
const router = express.Router();
const Favorite = require("../models/Favorite");
const User = require("../models/User");
const { authMiddleware } = require("../middleware/auth");

// GET /api/favorites — ดึงรายการโปรดของฉัน
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) return res.json([]);

    const favorites = await Favorite.find({ userId: user._id })
      .populate({
        path: "jobId",
        select: "title salary_min salary_max location job_type remote_option status companyId",
        populate: { path: "companyId", select: "name logo_url" },
      })
      .sort({ createdAt: -1 });

    res.json(favorites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/favorites — บันทึกงานโปรด
router.post("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) return res.status(404).json({ error: "ไม่พบผู้ใช้" });

    const favorite = await Favorite.create({
      userId: user._id,
      jobId: req.body.jobId,
    });

    res.json({ success: true, data: favorite });
  } catch (err) {
    // Duplicate
    if (err.code === 11000) {
      return res.status(400).json({ error: "บันทึกไว้แล้ว" });
    }
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/favorites/:jobId — ลบงานโปรด
router.delete("/:jobId", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) return res.status(404).json({ error: "ไม่พบผู้ใช้" });

    await Favorite.findOneAndDelete({
      userId: user._id,
      jobId: req.params.jobId,
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
