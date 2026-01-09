const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items: [],
    totalAmount: Number,

    address: {
      fullName: String,
      phone: String,
      street: String,
      city: String,
      state: String,
      pincode: String,
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "UPI"],
      default: "COD",
    },

    paymentStatus: {
      type: String,
      default: "Pending",
    },

    orderStatus: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
