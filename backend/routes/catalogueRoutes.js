// routes/catalogueRoutes.js
const express = require("express");
const router = express.Router();
const Catalogue = require("../models/Catalogue");
const protect = require("../middleware/authMiddleware");

// GET /api/catalogue/active
// Fetch the current active catalogue for the frontend
router.get("/active", async (req, res) => {
  try {
    const activeCatalogue = await Catalogue.findOne({ isActive: true });
    if (!activeCatalogue) {
      return res.status(404).json({ message: "No active catalogue found" });
    }
    res.json(activeCatalogue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/catalogue
// Add a new catalogue (Protected Admin Route)
router.post("/", protect, async (req, res) => {
  try {
    // First, set all other catalogues to inactive
    await Catalogue.updateMany({}, { isActive: false });

    // Create and save the new active catalogue
    const newCatalogue = new Catalogue({
      ...req.body,
      isActive: true,
    });

    const savedCatalogue = await newCatalogue.save();
    res.status(201).json(savedCatalogue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
