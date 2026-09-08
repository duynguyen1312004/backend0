const express = require("express");
const routerAPI = express.Router();
const {
  getUsersAPI,
  postCreateUserAPI,
  putUpdateUserAPI,
} = require("../controllers/apiController");

//router Method('/route',handler)

routerAPI.get("/users", getUsersAPI);

routerAPI.post("/users", postCreateUserAPI);

routerAPI.put("/users", putUpdateUserAPI);

module.exports = routerAPI;
