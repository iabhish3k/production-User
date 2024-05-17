const mongoose = require("mongoose");

async function connectDB() {
  try {
    const DB_URL= process.env.DB_URL
    const res = await mongoose.connect(DB_URL);
    console.log("MongoDB connected successfully".bgMagenta.white);
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB; 
