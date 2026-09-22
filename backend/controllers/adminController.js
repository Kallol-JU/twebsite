// controllers/adminController.js
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. Check if the admin user exists
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // 2. Validate the password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3. Generate a JWT token valid for 1 day
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      message: "Login successful",
      token,
      admin: { username: admin.username },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { loginAdmin };
