const express = require("express");
const router = express.Router();
const OfferHero = require("../models/OfferHero");
const protect = require("../middleware/authMiddleware");

router.get("/", async (req, res) => {
  try {
    const offers = await OfferHero.find().sort({ order: 1, createdAt: -1 });
    res.json(offers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", protect, async (req, res) => {
  try {
    const newOffer = new OfferHero(req.body);
    res.status(201).json(await newOffer.save());
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/reorder", protect, async (req, res) => {
  try {
    const { orderedIds } = req.body;
    await Promise.all(
      orderedIds.map((id, index) => {
        return OfferHero.findByIdAndUpdate(id, { order: index });
      }),
    );
    res.json({ message: "Order updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update offer (Protected)
router.put("/:id", protect, async (req, res) => {
  try {
    res.json(
      await OfferHero.findByIdAndUpdate(req.params.id, req.body, { new: true }),
    );
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE offer (Protected)
router.delete("/:id", protect, async (req, res) => {
  try {
    await OfferHero.findByIdAndDelete(req.params.id);
    res.json({ message: "Offer deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
