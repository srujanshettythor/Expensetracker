const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
const { readdirSync } = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Dynamically load routes
readdirSync(path.join(__dirname, "routes")).map((file) => {
  const route = require(`./routes/${file}`);
  app.use("/api/v1", route);
});

// Simple route
app.get("/", (req, res) => {
  res.send("Hello, this is your Node.js backend!");
});

// Get the PORT from environment variables
const PORT = process.env.PORT || 3000;

// Start the server
const startServer = async () => {
  await db(); // Connect to the database before starting the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

// Call the function to start the server
startServer();
