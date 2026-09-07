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
//update theo id
router.get("/update/:id", getUpdatePage);
//bấm nút save update
router.post("/update-user", postUpdateUser);
//xóa theo id
router.post("/delete-user/:id", postDeleteUser);
//bấm nút xóa
router.post("/delete-user", postHandleRemoveUser);

module.exports = router;
