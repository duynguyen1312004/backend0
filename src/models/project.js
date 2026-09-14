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
const projectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true, //thuộc tính bắt buộc
    },
    startDate: String,
    endDate: String,
    description: String,
    customerInfor: customerSchema, //embedded 1 : 1
    usersInfor: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }], //reperence: 1 nhân viên có thể có nhiều task
    leader: userSchema,
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "task" }],
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
projectSchema.plugin(mongoose_delete, { overrideMethods: "all" }); //chỉ hiện danh sách có deleted = false;
const Project = mongoose.model("project", projectSchema); //(collection, ten schema)

module.exports = Project;
