const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firebaseUid: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, index: true },
    name: { type: String, default: "" },
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    phone: { type: String, default: "" },
    avatar: { type: String, default: null },
    provider: { type: String, default: "email" }, // google, github, facebook, email
    role: {
      type: String,
      enum: ["user", "company", "admin"],
      default: "user",
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      default: null,
    },
    // Profile data สำหรับผู้หางาน
    profile: {
      title: { type: String, default: "" },
      bio: { type: String, default: "" },
      skills: [String],
      experience: { type: String, default: "" },
      education: { type: String, default: "" },
      location: { type: String, default: "" },
      resume_url: { type: String, default: null },
    },
    settings: {
      language: { type: String, default: "th" },
      theme: { type: String, default: "dark" },
      notifications: { type: Boolean, default: true },
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
