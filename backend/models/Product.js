const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    category: {
      type: String,
      required: true,
      default: "Skincare",
    },
    isOnSale: {
      type: Boolean,
      default: false,
    },
    saleText: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
