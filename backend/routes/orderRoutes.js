const express = require("express");
const Order = require("../models/Order");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

/* =========================
   CREATE ORDER
========================= */
router.post("/", auth, async (req, res) => {
  try {
    const {
      items,
      totalAmount,
      address,
      saveAddress,
      paymentMethod,
    } = req.body;

    // Create order
    const order = await Order.create({
      user: req.userId,
      items,
      totalAmount,
      address,
      paymentMethod,
      paymentStatus: paymentMethod === "UPI" ? "Paid" : "Pending",
      orderStatus: "Pending",
    });

    // Save address to user profile if checkbox checked
    if (saveAddress) {
      await User.findByIdAndUpdate(req.userId, { address });
    }

    res.status(201).json(order);
  } catch (error) {
    console.error("Order creation failed:", error);
    res.status(500).json({ message: "Order failed" });
  }
});

/* =========================
   GET USER ORDERS
========================= */
router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId })
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("Fetching orders failed:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

module.exports = router;
