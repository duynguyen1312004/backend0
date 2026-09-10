const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
// const userSchema = new Schema({ name: String }, { timestamps: true });
const customerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true, //thuộc tính bắt buộc
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
//override all methods
customerSchema.plugin(mongoose_delete, { overrideMethods: "all" }); //chỉ hiện danh sách có deleted = false;
const Customer = mongoose.model("customer", customerSchema); //(collection, ten schema)

module.exports = Customer;
