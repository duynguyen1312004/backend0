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
    timestamps: true, //khi thêm cái trường timestamps tự động nó có createdAt và updatedAt
    // statics: {
    //   findByName(name) {
    //     return this.findByName({ name: new RegExp(name, "i") });//dùng để tạo hàm tái sử dụng, vscode có thể gợi ý
    //   },
    // },
  },
);
//override all methods
customerSchema.plugin(mongoose_delete, { overrideMethods: "all" }); //chỉ hiện danh sách có deleted = false;
const Customer = mongoose.model("customer", customerSchema); //(collection, ten schema)

module.exports = Customer;
