const mongoose = require("mongoose");
// const userSchema = new Schema({ name: String }, { timestamps: true });
const customerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true, //thuộc tính bắt buộc
    },
    address: String,
    phone: Number,
    email: String,
    image: String,
    description: String,
  },
  {
    timestamps: true, //khi thêm cái trường này tự động nó có createdAt và updatedAt
  },
);
const Customer = mongoose.model("user", customerSchema); //(collection, ten schema)

module.exports = Customer;
