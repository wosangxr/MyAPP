const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    requirements: { type: String, default: "" },
    location: { type: String, default: "" },
    salary_min: { type: Number, default: null },
    salary_max: { type: Number, default: null },
    job_type: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship"],
      default: "full-time",
    },
    remote_option: {
      type: String,
      enum: ["onsite", "remote", "hybrid"],
      default: "onsite",
    },
    category: { type: String, default: "IT" },
    experience_level: {
      type: String,
      enum: ["entry", "mid", "senior"],
      default: "entry",
    },
    status: {
      type: String,
      enum: ["active", "closed", "draft"],
      default: "active",
    },
    applications_count: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Index สำหรับค้นหา
jobSchema.index({ status: 1, createdAt: -1 });
jobSchema.index({ companyId: 1 });
jobSchema.index({ category: 1 });

module.exports = mongoose.model("Job", jobSchema);
