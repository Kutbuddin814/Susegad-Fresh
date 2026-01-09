const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// 1. CORS Configuration
// This allows both your local machine and your live Vercel site to talk to this API
const allowedOrigins = [
  "https://susegad-fresh-frontend.vercel.app",
  "http://localhost:3000",
  "http://localhost:5173" // Common for Vite users
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

// 2. Health Check Route (Useful for Render to monitor your app)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 3. Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

// 4. Database Connection
// Ensure 'MONGO_URI' is the exact name of the key in your Render Environment Variables
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Stop the server if DB connection fails
  });

// 5. Port Configuration
// Render automatically assigns a PORT; process.env.PORT is mandatory
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));