const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,

  email: String,

  password: String,

  city: String,
});

const User = mongoose.model("user", userSchema); //(collection, ten schema)

module.exports = User;
