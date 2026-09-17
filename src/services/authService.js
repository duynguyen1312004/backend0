const User = require("../models/user");
const bcrypt = require("bcryptjs");

const postRegisterService = async (data) => {
  try {
    let user = await User.findOne({ email: data.email });
    console.log("check data = ", data);
    if (!user) {
      let hashPassword = await bcrypt.hash(data.password, 10);
      const userData = {
        name: data.name,
        email: data.email,
        password: hashPassword,
        city: data.city,
      };
      let result = await User.create(userData);
      return {
        EC: 0,
        data: result,
      };
    } else {
      return {
        EC: 1,
        message: "Email already exists",
      };
    }
  } catch (error) {
    console.log("error : ", error);
    return null;
  }
};

const postLoginService = async (data) => {
  try {
    let user = await User.findOne({
      email: data.email,
    }).select("+password"); //lấy thêm password theo đối tượng có email đúng
    if (!user) {
      return {
        EC: -1,
        message: "account not exist",
      };
    }
    const isMatch = await bcrypt.compare(
      data.password, // password user vừa nhập
      user.password, // password hash trong DB
    );

    if (!isMatch) {
      return {
        EC: 1,
        message: "Password is incorrect",
      };
    }
    return {
      EC: 0,
      message: "Login successfully",
    };
  } catch (error) {
    console.log("error : ", error);
    return null;
  }
};
module.exports = { postRegisterService, postLoginService };
