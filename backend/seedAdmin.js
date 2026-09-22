// seedAdmin.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const Admin = require("./models/Admin");

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Check if an admin already exists
    const adminExists = await Admin.findOne({ username: "tanusree" });
    if (adminExists) {
      console.log("Admin already exists!");
      process.exit();
    }

    const admin = new Admin({
      username: "tanusree",
      password: "kallol123", // CHANGE THIS to whatever you want
    });

    await admin.save();
    console.log("Admin user created successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedAdmin();
