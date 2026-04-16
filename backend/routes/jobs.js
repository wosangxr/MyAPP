// ── Jobs Routes ──
const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const Company = require("../models/Company");
const { authMiddleware, optionalAuth } = require("../middleware/auth");

// GET /api/jobs — ดึงรายการงานทั้งหมด (public)
router.get("/", optionalAuth, async (req, res) => {
  try {
    const { company_id, status, category, search, limit = 50 } = req.query;

    let filter = {};
    if (company_id) filter.companyId = company_id;
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    // ถ้าไม่ filter status → แสดงเฉพาะ active (public)
    if (!company_id && !status) {
      filter.status = "active";
    }

    const jobs = await Job.find(filter)
      .populate("companyId", "name logo_url location")
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/jobs/my — ดึงงานของบริษัทฉัน
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const company = await Company.findOne({ firebaseUid: req.user.uid });
    if (!company) return res.json([]);

    const jobs = await Job.find({ companyId: company._id }).sort({
      createdAt: -1,
    });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/jobs/:id — ดึงข้อมูลงานเดี่ยว
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "companyId",
      "name logo_url location industry"
    );
    if (!job) return res.status(404).json({ error: "ไม่พบงาน" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/jobs — สร้างประกาศงาน
router.post("/", authMiddleware, async (req, res) => {
  try {
    const company = await Company.findOne({ firebaseUid: req.user.uid });
    if (!company)
      return res.status(403).json({ error: "ต้องสร้างบริษัทก่อน" });

    const job = await Job.create({
      ...req.body,
      companyId: company._id,
    });

    res.json({ success: true, data: job });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/jobs/:id — อัปเดตงาน
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const company = await Company.findOne({ firebaseUid: req.user.uid });
    if (!company) return res.status(403).json({ error: "ไม่มีสิทธิ์" });

    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, companyId: company._id },
      { $set: req.body },
      { new: true }
    );
    if (!job) return res.status(404).json({ error: "ไม่พบหรือไม่มีสิทธิ์" });
    res.json({ success: true, data: job });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/jobs/:id/status — เปลี่ยนสถานะงาน
router.put("/:id/status", authMiddleware, async (req, res) => {
  try {
    const company = await Company.findOne({ firebaseUid: req.user.uid });
    if (!company) return res.status(403).json({ error: "ไม่มีสิทธิ์" });

    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, companyId: company._id },
      { status: req.body.status },
      { new: true }
    );
    if (!job) return res.status(404).json({ error: "ไม่พบ" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/jobs/:id — ลบงาน
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const company = await Company.findOne({ firebaseUid: req.user.uid });
    if (!company) return res.status(403).json({ error: "ไม่มีสิทธิ์" });

    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      companyId: company._id,
    });
    if (!job) return res.status(404).json({ error: "ไม่พบ" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
