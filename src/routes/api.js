const express = require("express");
const routerAPI = express.Router();
const {
  getUsersAPI,
  postCreateUserAPI,
  putUpdateUserAPI,
  deleteUserAPI,
  postUploadSingleFileAPI,
  postUploadMultipleFilesAPI,
} = require("../controllers/apiController");
const {
  postCreateCustomer,
  postCreateArrayCustomer,
  getAllCustomers,
  putUpdateCustomers,
  deleteACustomer,
  deleteArrayCustomers,
} = require("../controllers/customerController");

//router Method('/route',handler)

routerAPI.get("/users", getUsersAPI);
routerAPI.post("/users", postCreateUserAPI);
routerAPI.put("/users", putUpdateUserAPI);
routerAPI.delete("/users", deleteUserAPI);

routerAPI.post("/file", postUploadSingleFileAPI);
routerAPI.post("/files", postUploadMultipleFilesAPI);

routerAPI.post("/customers", postCreateCustomer);
routerAPI.post("/customers-many", postCreateArrayCustomer);
routerAPI.get("/customers", getAllCustomers);
routerAPI.put("/customers", putUpdateCustomers);
routerAPI.delete("/customers", deleteACustomer);
routerAPI.delete("/customers-many", deleteArrayCustomers);

//query string => không cần khai báo thêm route, đứng sau dấu ?
routerAPI.get("/info", (req, res) => {
  console.log("check query : ", req.query);
  return res.status(200).json({
    data: req.query,
  });
});
//params string => cần khai báo thêm route, và truyền lên ít data
routerAPI.get("/info/:name/:address", (req, res) => {
  console.log("check params : ", req.params);
  return res.status(200).json({
    data: req.params,
  });
});

module.exports = routerAPI;
