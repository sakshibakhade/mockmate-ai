const express = require("express");
const cors = require("cors");
require("dotenv").config();

const interviewRoutes = require("./routes/interview.routes");

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Main routes
app.use("/api", interviewRoutes);

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});
