const mongoose = require("mongoose");
require("dotenv").config();

const db = async () => {
  try {
    mongoose.set("strictQuery", false); // Optional: Disable deprecation warning for strictQuery
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Db connected successfully");
  } catch (error) {
    console.log("DB Connection Error:", error.message);
  }
};

module.exports = { db };
