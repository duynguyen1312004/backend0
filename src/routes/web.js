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
const roleMiddleware = require("../middlewares/roleMiddleware");

// ==================== HOME ====================

router.get("/", authMiddleware, getHomePage);
router.get("/abc", getABC);

// ==================== USER ====================

router.get("/create", authMiddleware, roleMiddleware("ADMIN"), getCreatePage);

router.post(
  "/create-user",
  authMiddleware,
  roleMiddleware("ADMIN"),
  postCreateUser,
);

router.get(
  "/update/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getUpdatePage,
);
router.post(
  "/update-user",
  authMiddleware,
  roleMiddleware("ADMIN"),
  postUpdateUser,
);

router.post(
  "/delete-user/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getDeleteUserPage,
);
router.post("/delete-user", postRemoveUser);

// ==================== AUTH ====================

router.get("/login", getLoginPage);
router.post("/login", postLogin);
router.get("/register", getRegisterPage);

// ==================== PROJECT ====================

router.get("/projects", getProjectPage);
router.get("/projects/:id", getProjectDetailPage);

// ==================== TASK ====================

router.get("/projects/:id/tasks/create", authMiddleware, getCreateTaskPage);

router.post("/projects/:id/tasks/create", authMiddleware, postCreateTask);

module.exports = router;
