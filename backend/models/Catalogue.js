const mongoose = require("mongoose");

const catalogueSchema = new mongoose.Schema(
  {
    month: { type: String, required: true }, // e.g., "September"
    year: { type: Number, required: true }, // e.g., 2026
    catalogueUrl: { type: String, required: true }, // Link to Oriflame's PDF/digital viewer
    coverImageUrl: { type: String },
    isActive: { type: Boolean, default: false }, // Only one should be active at a time
  },
  { timestamps: true },
);

module.exports = mongoose.model("Catalogue", catalogueSchema);
