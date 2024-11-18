const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// Register a new seller (Only Owner)
router.post("/register", async (req, res) => {
  const { username, password, role } = req.body;

  if (role !== "seller" && role !== "owner") {
    return res.status(400).json({ message: "Invalid role." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ username, password: hashedPassword, role });

  try {
    await user.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error creating user." });
  }
});

module.exports = router;
