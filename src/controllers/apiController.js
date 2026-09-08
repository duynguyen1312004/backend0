const User = require("../models/user");

const getUsersAPI = async (req, res) => {
  let results = await User.find({});
  return res.status(200).json({
    errorCode: 0,
    data: results,
  });
};

const postCreateUserAPI = async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;
  console.log("check req.body", email, name, city);

  //thêm data động vào database
  let user = await User.create({
    name: name,
    email: email,
    city: city,
  });

  return res.status(200).json({
    errorCode: 0,
    data: user,
  });
};

const putUpdateUserAPI = async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;
  let userId = req.body.userId;

  console.log("check req.body", email, name, city, userId);

  //thêm data động vào database
  // await updateUserById(email, city, name, userId);
  let user = await User.updateOne(
    { _id: userId },
    {
      email: email,
      name: name,
      city: city,
    },
  );
  // res.send("Updated user succeed");
  return res.status(200).json({
    errorCode: 0,
    data: user,
  });
};

const deleteUserAPI = async (req, res) => {
  let userId = req.body.userId;
  let result = await User.deleteOne({ _id: userId });
  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};

module.exports = {
  deleteUserAPI,
  putUpdateUserAPI,
  getUsersAPI,
  postCreateUserAPI,
};
