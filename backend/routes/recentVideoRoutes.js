const express = require("express");
const router = express.Router();
const RecentVideo = require("../models/RecentVideo");
const protect = require("../middleware/authMiddleware");

// GET (Public) - Fetch all recent videos
router.get("/", async (req, res) => {
  try {
    const videos = await RecentVideo.find()
      .sort({ order: 1, createdAt: -1 })
      .limit(4);
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/reorder", protect, async (req, res) => {
  try {
    const { orderedIds } = req.body;
    // Update the order number for every ID in the array simultaneously
    await Promise.all(
      orderedIds.map((id, index) => {
        return RecentVideo.findByIdAndUpdate(id, { order: index });
      }),
    );
    res.json({ message: "Order updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST (Protected)
router.post("/", protect, async (req, res) => {
  try {
    const newVideo = new RecentVideo(req.body);
    res.status(201).json(await newVideo.save());
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (Protected)
router.put("/:id", protect, async (req, res) => {
  try {
    res.json(
      await RecentVideo.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      }),
    );
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE (Protected)
router.delete("/:id", protect, async (req, res) => {
  try {
    await RecentVideo.findByIdAndDelete(req.params.id);
    res.json({ message: "Video deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
