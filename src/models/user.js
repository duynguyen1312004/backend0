const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,

  email: String,

  password: {
    type: String,
    select: false,
  },

  city: String,

  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
});

const User = mongoose.model("user", userSchema); //(collection, ten schema)

module.exports = User;
