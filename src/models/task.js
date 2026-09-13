const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

//material to embbeded:
//shape data:
const customerSchema = mongoose.Schema({
  name: String,
  phone: String,
  email: String,
});
//shape data:
const userSchema = mongoose.Schema({
  name: String,
  email: String,
});

// const userSchema = new Schema({ name: String }, { timestamps: true });
const taskSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true, //thuộc tính bắt buộc
    },
    description: String,
    status: String,
    startDate: String,
    endDate: String,
    userInfor: userSchema, //reperence: 1 nhân viên có thể có nhiều task
    projectInfor: projectSchema,
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
taskSchema.plugin(mongoose_delete, { overrideMethods: "all" }); //chỉ hiện danh sách có deleted = false;
const Task = mongoose.model("customer", taskSchema); //(collection, ten schema)

module.exports = Task;
