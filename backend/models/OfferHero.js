const mongoose = require("mongoose");

const offerHeroSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    offerPeriod: { type: String, required: true },
    imageUrl: { type: String, required: true },
    details: { type: String },
    linkUrl: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("OfferHero", offerHeroSchema);
