const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  label: String,
  price: Number,
});

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  image: String,
  variants: [variantSchema],
});

module.exports = mongoose.model("Product", productSchema);
