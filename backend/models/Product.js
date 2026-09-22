const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    priceText: { type: String, default: "Lower than the market" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
