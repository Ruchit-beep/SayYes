
console.log("SayYes server.js is loading...");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const proposalRoutes = require("./routes/Proposals");

const app = express();

// Comma-separated list of sites allowed to call this API.
const allowedOrigins = (process.env.CLIENT_ORIGINS ||
  "http://localhost:8080,http://localhost:8081,https://sayeyes.lovable.app")
  .split(",").map((o) => o.trim());

app.use(cors({
  origin: (origin, cb) =>
    cb(null, !origin || allowedOrigins.includes(origin) || origin.endsWith(".lovable.app") || origin.endsWith(".lovableproject.com")),
}));

// Photos are sent as image data, so allow larger bodies than the 100kb default.
app.use(express.json({ limit: "5mb" }));

// Proposal API routes
app.use("/api/proposals", proposalRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("SayYes Backend is running! ❤️");
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");

    app.listen(process.env.PORT || 5000, () => {
      console.log("SayYes server running on port 5000");
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
