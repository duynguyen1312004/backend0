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
  getProjectPage,
  getProjectDetailPage,

  getCreateTaskPage,
} = require("../controllers/homeController");

const {
  getLoginPage,
  getRegisterPage,
} = require("../controllers/authController");

const { postCreateTask } = require("../controllers/taskController");

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
//login
router.get("/login", getLoginPage);
router.get("/register", getRegisterPage);
//project
router.get("/projects", getProjectPage);
router.get("/projects/:id", getProjectDetailPage);
router.get("/projects/:id/tasks/create", getCreateTaskPage);

router.post("/projects/:id/tasks/create", postCreateTask);

module.exports = router;
