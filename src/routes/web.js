const express = require("express");
const router = express.Router();
const {
  getHomePage,
  getABC,
  postCreateUser,
  getCreatePage,
  getUpdatePage,
  postUpdateUser,
  postDeleteUser,
  postHandleRemoveUser,
} = require("../controllers/homeController");

//router Method('/route',handler)
router.get("/", getHomePage);
router.get("/abc", getABC);

router.get("/create", getCreatePage);
router.post("/create-user", postCreateUser);

router.get("/update/:id", getUpdatePage);
router.post("/update-user", postUpdateUser);

router.post("/delete-user/:id", postDeleteUser);
router.post("/delete-user", postHandleRemoveUser);

module.exports = router;
