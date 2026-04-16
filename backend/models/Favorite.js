const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
  },
  { timestamps: true }
);

// ป้องกัน save ซ้ำ
favoriteSchema.index({ userId: 1, jobId: 1 }, { unique: true });

module.exports = mongoose.model("Favorite", favoriteSchema);
