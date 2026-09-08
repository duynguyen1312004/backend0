const express = require("express");
const routerAPI = express.Router();
const {
  getUsersAPI,
  postCreateUserAPI,
} = require("../controllers/apiController");

//router Method('/route',handler)

routerAPI.get("/users", getUsersAPI);
routerAPI.post("/users", postCreateUserAPI);

module.exports = routerAPI;
