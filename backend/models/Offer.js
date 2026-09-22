const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // e.g., "Luggero Trolley Discount"
    description: { type: String }, // e.g., "Place accumulated order of 250BP..."
    originalPrice: { type: Number },
    discountPrice: { type: Number },
    imageUrl: { type: String },
    validUntil: { type: Date },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Offer", offerSchema);
