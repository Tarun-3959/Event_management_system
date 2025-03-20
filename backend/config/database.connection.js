const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;
async function connectDB() {
  try {
    console.log("DB is connecting....");
    await mongoose.connect(MONGO_URI);
    console.log("DB is Connected");
  } catch (err) {
    console.log("error occure while connecting the DB");
    console.log(err);
  }
}

module.exports = connectDB;
