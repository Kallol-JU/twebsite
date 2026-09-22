const express = require("express");
const router = express.Router();
const ProductKnowledge = require("../models/ProductKnowledge");
const protect = require("../middleware/authMiddleware"); // Import the middleware

router.get("/", async (req, res) => {
  try {
    const knowledge = await ProductKnowledge.find().sort({ createdAt: -1 });
    res.json(knowledge);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", protect, async (req, res) => {
  try {
    const newItem = new ProductKnowledge(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", protect, async (req, res) => {
  try {
    const updatedPost = await ProductKnowledge.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    await ProductKnowledge.findByIdAndDelete(req.params.id);
    res.json({ message: "Knowledge post deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
