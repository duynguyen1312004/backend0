const Joi = require("joi");
const User = require("../models/user");
const {
  postRegisterService,
  postLoginService,
} = require("../services/authService");

const getLoginPage = (req, res) => {
  return res.render("login.ejs");
};

const getRegisterPage = (req, res) => {
  return res.render("register.ejs");
};

const postLogin = async (req, res) => {
  const result = await postLoginService(req.body);
  return res.status(200).json(result);
};

const postRegister = async (req, res) => {
  console.log("check data : ", req.body);

  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),

    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().min(3).max(30).required(),

    confirmPassword: Joi.string()
      .min(3)
      .max(30)
      .required()
      .valid(Joi.ref("password")), //phải giống với password

    city: Joi.string().min(2).max(50).required(),

    terms: Joi.string().valid("on").required(),
  });
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: "Validation failed",
      errors: error.details,
    });
  }
  const { name, email, password, city } = req.body;
  const data = {
    name,
    email,
    password,
    city,
  };
  let result = await postRegisterService(data);
  res.status(200).json(result);
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        EC: 1,
        message: "User not found",
      });
    }

    return res.status(200).json({
      EC: 0,
      data: user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      EC: -1,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getProfile,
  postLogin,
  getLoginPage,
  getRegisterPage,
  postRegister,
};
