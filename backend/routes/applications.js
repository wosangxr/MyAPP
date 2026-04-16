// ── Applications Routes ──
const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const Job = require("../models/Job");
const Company = require("../models/Company");
const User = require("../models/User");
const { authMiddleware } = require("../middleware/auth");

// GET /api/applications — ดึงใบสมัครของบริษัท
router.get("/", authMiddleware, async (req, res) => {
  try {
    const { company_id, job_id, status } = req.query;

    let filter = {};
    if (company_id) filter.companyId = company_id;
    if (job_id) filter.jobId = job_id;
    if (status) filter.status = status;

    // ถ้าไม่ได้ส่ง company_id → ดึงจาก user
    if (!company_id) {
      const company = await Company.findOne({ firebaseUid: req.user.uid });
      if (company) {
        filter.companyId = company._id;
      }
    }

    const applications = await Application.find(filter)
      .populate("jobId", "title")
      .populate("userId", "name email avatar")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/applications/my — ดึงใบสมัครของฉัน (ผู้หางาน)
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) return res.json([]);

    const applications = await Application.find({ userId: user._id })
      .populate("jobId", "title salary_min salary_max location job_type")
      .populate("companyId", "name logo_url")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/applications — สมัครงาน
router.post("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) return res.status(404).json({ error: "ไม่พบผู้ใช้" });

    const job = await Job.findById(req.body.jobId);
    if (!job) return res.status(404).json({ error: "ไม่พบงาน" });

    // เช็คว่าเคยสมัครแล้วหรือยัง
    const existing = await Application.findOne({
      jobId: job._id,
      userId: user._id,
    });
    if (existing) {
      return res
        .status(400)
        .json({ error: "คุณเคยสมัครงานนี้แล้ว" });
    }

    const application = await Application.create({
      jobId: job._id,
      userId: user._id,
      companyId: job.companyId,
      applicant_name: req.body.applicant_name || user.name || user.email,
      applicant_email: req.body.applicant_email || user.email,
      applicant_title: req.body.applicant_title || user.profile?.title || "",
      applicant_phone: req.body.applicant_phone || user.phone || "",
      cover_letter: req.body.cover_letter || "",
      resume_url: req.body.resume_url || user.profile?.resume_url || null,
    });

    // อัปเดต applications_count
    await Job.findByIdAndUpdate(job._id, {
      $inc: { applications_count: 1 },
    });

    res.json({ success: true, data: application });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/applications/:id — อัปเดตสถานะใบสมัคร (บริษัท)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { $set: { status: req.body.status, notes: req.body.notes } },
      { new: true }
    );
    if (!application) return res.status(404).json({ error: "ไม่พบ" });
    res.json({ success: true, data: application });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
