const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

/*
  GET ALL PRODUCTS
  OPTIONAL FILTER BY CATEGORY
*/
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;

    let filter = {};

    if (category && category !== "All") {
      filter.category = {
        $regex: new RegExp(category, "i"), // case-insensitive
      };
    }

    const products = await Product.find(filter);

    res.json(products);
  } catch (error) {
    console.error("❌ Product fetch error:", error);
    res.status(500).json({
      message: "Server error while fetching products",
    });
  }
});

module.exports = router;
