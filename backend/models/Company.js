const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    firebaseUid: { type: String, required: true, index: true },
    name: { type: String, required: true },
    industry: { type: String, default: "" },
    size: { type: String, default: "" },
    description: { type: String, default: "" },
    website: { type: String, default: "" },
    location: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    logo_url: { type: String, default: null },
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);
