// ── Stats Routes ──
const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const Application = require("../models/Application");
const Company = require("../models/Company");
const User = require("../models/User");
const { authMiddleware, adminOnly } = require("../middleware/auth");

// GET /api/stats — สถิติของบริษัท
router.get("/", authMiddleware, async (req, res) => {
  try {
    const company = await Company.findOne({ firebaseUid: req.user.uid });
    if (!company) {
      return res.json({
        total_jobs: 0,
        total_applications: 0,
        pending: 0,
        accepted: 0,
      });
    }

    const [total_jobs, total_applications, pending, accepted] =
      await Promise.all([
        Job.countDocuments({ companyId: company._id, status: "active" }),
        Application.countDocuments({ companyId: company._id }),
        Application.countDocuments({
          companyId: company._id,
          status: "pending",
        }),
        Application.countDocuments({
          companyId: company._id,
          status: "accepted",
        }),
      ]);

    res.json({ total_jobs, total_applications, pending, accepted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/stats/admin — สถิติรวม (admin only)
router.get("/admin", authMiddleware, adminOnly, async (req, res) => {
  try {
    const [totalUsers, totalCompanies, totalJobs, totalApplications] =
      await Promise.all([
        User.countDocuments(),
        Company.countDocuments(),
        Job.countDocuments(),
        Application.countDocuments(),
      ]);

    // Recent activity
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email role createdAt");

    const recentApplications = await Application.find()
      .populate("jobId", "title")
      .sort({ createdAt: -1 })
      .limit(10);

    // Top Jobs (popular jobs)
    const topJobsRaw = await Application.aggregate([
      { $group: { _id: "$jobId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      { $lookup: { from: "jobs", localField: "_id", foreignField: "_id", as: "job" } },
      { $unwind: "$job" },
      { $project: { title: "$job.title", count: 1 } }
    ]);

    res.json({
      totalUsers,
      totalCompanies,
      totalJobs,
      totalApplications,
      recentUsers,
      recentApplications,
      topJobs: topJobsRaw
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/stats/admin/users — รายชื่อ users ทั้งหมด (admin only)
router.get("/admin/users", authMiddleware, adminOnly, async (req, res) => {
  try {
    const users = await User.find()
      .sort({ createdAt: -1 })
      .select("-__v");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/stats/admin/users — สร้าง user ใหม่ (admin only)
router.post("/admin/users", authMiddleware, adminOnly, async (req, res) => {
  try {
    const { email, password, name, role, phone } = req.body;
    
    // 1. สร้างใน Firebase
    const adminAuth = require("../config/firebase").auth();
    const fbUser = await adminAuth.createUser({
      email,
      password: password || "123456",
      displayName: name,
    });

    // 2. สร้างใน MongoDB
    const user = await User.create({
      firebaseUid: fbUser.uid,
      email: email,
      name: name,
      role: role || "user",
      phone: phone || "",
      provider: "email",
    });

    res.json({ success: true, data: user });
  } catch (err) {
    console.error("Admin create user error:", err);
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/stats/admin/users/:id — อัปเดต user (admin)
router.put("/admin/users/:id", authMiddleware, adminOnly, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: "ไม่พบผู้ใช้" });
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/stats/admin/users/:id — ลบ user (admin)
router.delete("/admin/users/:id", authMiddleware, adminOnly, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/stats/admin/jobs — งานทั้งหมด (admin)
router.get("/admin/jobs", authMiddleware, adminOnly, async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("companyId", "name")
      .sort({ createdAt: -1 })
      .select("-__v");
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/stats/admin/jobs/:id — ลบงาน (admin)
router.delete("/admin/jobs/:id", authMiddleware, adminOnly, async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/stats/admin/companies — สร้างบริษัทใหม่ (admin)
router.post("/admin/companies", authMiddleware, adminOnly, async (req, res) => {
  try {
    const company = await Company.create({
      ...req.body,
    });
    res.json({ success: true, data: company });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/stats/admin/companies/:id — อัปเดตบริษัท (admin)
router.put("/admin/companies/:id", authMiddleware, adminOnly, async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!company) return res.status(404).json({ error: "ไม่พบ" });
    res.json({ success: true, data: company });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/stats/admin/companies — บริษัททั้งหมด (admin)
router.get("/admin/companies", authMiddleware, adminOnly, async (req, res) => {
  try {
    const companies = await Company.find()
      .sort({ createdAt: -1 })
      .select("-__v");
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/stats/admin/companies/:id — ลบบริษัท (admin)
router.delete("/admin/companies/:id", authMiddleware, adminOnly, async (req, res) => {
  try {
    await Company.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/stats/admin/applications — ใบสมัครทั้งหมด (admin)
router.get("/admin/applications", authMiddleware, adminOnly, async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("jobId", "title")
      .populate("userId", "name email")
      .populate("companyId", "name")
      .sort({ createdAt: -1 })
      .select("-__v");
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/stats/admin/applications/:id — อัปเดตสถานะ (admin)
router.put("/admin/applications/:id", authMiddleware, adminOnly, async (req, res) => {
  try {
    const app = await Application.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!app) return res.status(404).json({ error: "ไม่พบ" });
    res.json({ success: true, data: app });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/stats/admin/applications/:id — ลบใบสมัคร (admin)
router.delete("/admin/applications/:id", authMiddleware, adminOnly, async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

