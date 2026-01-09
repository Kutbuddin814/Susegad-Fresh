const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

// GET PROFILE
router.get("/profile", auth, async (req, res) => {
  const user = await User.findById(req.user).select("-password");
  res.json(user);
});

// UPDATE PROFILE + ADDRESS
router.put("/profile", auth, async (req, res) => {
  const { name, address } = req.body;

  const user = await User.findById(req.user);
  user.name = name || user.name;
  user.address = address;

  await user.save();
  res.json({ message: "Profile updated" });
});

module.exports = router;
