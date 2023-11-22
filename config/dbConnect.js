const { default: mongoose } = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    console.log("Database connected successfully");
  } catch (error) {
    console.log("🚀 ~ file: dbConnect.js:7 ~ dbConnect ~ error:", error);
  }
};

module.exports = dbConnect;
