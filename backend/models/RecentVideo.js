const mongoose = require("mongoose");

const recentVideoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    sourceUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    order: { type: Number, default: 0 }, // Add this line
  },
  { timestamps: true },
);

module.exports = mongoose.model("RecentVideo", recentVideoSchema);
