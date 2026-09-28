const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

// Controllers
const {
  getHomePage,

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
  getCreateProjectPage,
  postCreateProjectPage,
  postAddMember,

  // Task
  getCreateTaskPage,
  postCreateTaskPage,
} = require("../controllers/homeController");

const {
  postLogin,
  getLoginPage,
  getRegisterPage,
  postLogout,
} = require("../controllers/authController");

const { postCreateTask } = require("../controllers/taskController");
const roleMiddleware = require("../middlewares/roleMiddleware");

// ==================== HOME ====================

router.get("/", authMiddleware, getHomePage);

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
router.post(
  "/delete-user",
  authMiddleware,
  roleMiddleware("ADMIN"),
  postRemoveUser,
);

// ==================== AUTH ====================

router.get("/login", getLoginPage);
router.post("/login", postLogin);
router.get("/register", getRegisterPage);
router.post("/logout", postLogout);

// ==================== PROJECT ====================
router.get("/projects/create", authMiddleware, getCreateProjectPage);
router.post("/projects/create", authMiddleware, postCreateProjectPage);

router.get("/projects", authMiddleware, getProjectPage);

router.get("/projects/:id", authMiddleware, getProjectDetailPage);
router.post("/projects/:id/add-member", authMiddleware, postAddMember);

// ==================== TASK ====================

router.get("/projects/:id/tasks/create", authMiddleware, getCreateTaskPage);

router.post("/projects/:id/tasks/create", authMiddleware, postCreateTaskPage);

module.exports = router;
