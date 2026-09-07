require("dotenv").config();
const mongoose = require("mongoose");
//create the connection to data

const connection = async () => {
  try {
    const options = {
      user: process.env.DB_USER,
      pass: process.env.DB_PASSWORD,
      dbname: process.env.DB_NAME,
    };
    await mongoose.connect(process.env.DB_HOST, options);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("Error connection Db: ", error);
  }
};

module.exports = connection;
