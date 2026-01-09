const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const products = require("./data/products");
const connectDB = require("./config/db");

dotenv.config();

const seedProducts = async () => {
  try {
    await connectDB();

    await Product.deleteMany();
    await Product.insertMany(products);

    console.log("✅ Products seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding products:", error);
    process.exit(1);
  }
};

seedProducts();
