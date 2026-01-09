const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    address: {
      phone: String,
      street: String,
      city: String,
      pincode: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
