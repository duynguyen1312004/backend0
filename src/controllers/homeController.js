const connection = require("../config/database");
const {
  getAllUsers,
  getUserById,
  updateUserById,
  createUser,
  deleteUserById,
} = require("../services/CRUDService");
const User = require("../models/user");

const getHomePage = async (req, res) => {
  let results = await User.find({});
  console.log("check row ", results);
  return res.render("home.ejs", { listUsers: results });
};

const getABC = (req, res) => {
  res.send("check ABC");
};

const postCreateUser = async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;
  console.log("check req.body", email, name, city);

  //thêm data động vào database
  await User.create({
    name: name,
    email: email,
    city: city,
  });

  res.send("Created user succeed");
};

const getCreatePage = (req, res) => {
  res.render("create.ejs");
};

const getUpdatePage = async (req, res) => {
  const userId = req.params.id;
  // let user = await getUserById(userId);
  let user = await User.findById(userId);
  res.render("edit.ejs", { userEdit: user }); //x <- y
};

const postUpdateUser = async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;
  let userId = req.body.userId;

  console.log("check req.body", email, name, city, userId);

  //thêm data động vào database
  // await updateUserById(email, city, name, userId);
  await User.updateOne(
    { _id: userId },
    {
      email: email,
      name: name,
      city: city,
    },
  );
  // res.send("Updated user succeed");
  res.redirect("/"); //tro ve trang chu
};

const postDeleteUser = async (req, res) => {
  const userId = req.params.id;
  let user = await User.findById(userId);

  res.render("delete.ejs", { userEdit: user });
};

const postHandleRemoveUser = async (req, res) => {
  let userId = req.body.userId;
  let result = await User.deleteOne({ _id: userId });
  console.log(">> result: ", result);
  res.redirect("/"); //tro ve trang chu
};
module.exports = {
  getUpdatePage,
  getHomePage,
  getABC,
  postCreateUser,
  getCreatePage,
  postUpdateUser,
  postDeleteUser,
  postHandleRemoveUser,
};
