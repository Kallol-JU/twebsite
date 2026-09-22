const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/product-knowledge", require("./routes/productKnowledgeRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/catalogue", require("./routes/catalogueRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/recent-videos", require("./routes/recentVideoRoutes"));
app.use("/api/offer-hero", require("./routes/offerHeroRoutes"));
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected successfully!"))
  .catch((err) => console.error("MongoDB connection failed:", err.message));

app.get("/", (req, res) => {
  res.send("Oriflame Portfolio API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
