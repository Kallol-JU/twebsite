// models/ProductKnowledge.js
const mongoose = require("mongoose");

const productKnowledgeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    description: { type: String, required: false },

    sourceUrl: { type: String, required: true },
    platform: {
      type: String,
      enum: ["YouTube", "Facebook", "Instagram", "Other"],
      required: true,
    },
    thumbnailUrl: { type: String, required: true },
    category: {
      type: String,
      enum: ["Skincare", "Healthcare", "Haircare", "Other"],
      default: "Other",
    },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("ProductKnowledge", productKnowledgeSchema);
