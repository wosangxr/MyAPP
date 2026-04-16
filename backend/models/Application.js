const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    // ข้อมูลผู้สมัคร (snapshot ตอนสมัคร)
    applicant_name: { type: String, required: true },
    applicant_email: { type: String, required: true },
    applicant_title: { type: String, default: "" },
    applicant_phone: { type: String, default: "" },
    cover_letter: { type: String, default: "" },
    resume_url: { type: String, default: null },
    // สถานะ
    status: {
      type: String,
      enum: ["pending", "reviewing", "interview", "accepted", "rejected"],
      default: "pending",
    },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

applicationSchema.index({ jobId: 1, status: 1 });
applicationSchema.index({ userId: 1 });
applicationSchema.index({ companyId: 1, createdAt: -1 });

module.exports = mongoose.model("Application", applicationSchema);
