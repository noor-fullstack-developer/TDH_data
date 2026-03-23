const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const productRoutes = require("./routes/product.routes");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Health Check Route (IMPORTANT for Render)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use("/api/products", productRoutes);

// Start Server ONLY after DB connects
const startServer = async () => {
  try {
    await connectDB(); // must return a promise

    const PORT = process.env.PORT || 10000;

    const server = app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });

    // Prevent timeout issues on Render
    server.keepAliveTimeout = 120000;
    server.headersTimeout = 120000;

  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();