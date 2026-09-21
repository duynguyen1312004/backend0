const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

// Controllers
const {
  getHomePage,
  getABC,

  // User
  postCreateUser,
  getCreatePage,
  getUpdatePage,
  postUpdateUser,
  getDeleteUserPage,
  postRemoveUser,

  // Project
  getProjectPage,
  getProjectDetailPage,

  // Task
  getCreateTaskPage,
} = require("../controllers/homeController");

const {
  postLogin,
  getLoginPage,
  getRegisterPage,
} = require("../controllers/authController");

const { postCreateTask } = require("../controllers/taskController");

// ==================== HOME ====================

router.get("/", authMiddleware, getHomePage);
router.get("/abc", getABC);

// ==================== USER ====================

router.get("/create", getCreatePage);
router.post("/create-user", postCreateUser);

router.get("/update/:id", getUpdatePage);
router.post("/update-user", postUpdateUser);

router.post("/delete-user/:id", getDeleteUserPage);
router.post("/delete-user", postRemoveUser);

// ==================== AUTH ====================

router.get("/login", getLoginPage);
router.post("/login", postLogin);
router.get("/register", getRegisterPage);

// ==================== PROJECT ====================

router.get("/projects", getProjectPage);
router.get("/projects/:id", getProjectDetailPage);

// ==================== TASK ====================

router.get("/projects/:id/tasks/create", getCreateTaskPage);
router.post("/projects/:id/tasks/create", postCreateTask);

module.exports = router;
