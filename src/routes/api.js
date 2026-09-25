const express = require("express");
const routerAPI = express.Router();

const validationMiddleware = require("../middlewares/validationMiddleware");
const {
  createCustomerSchema,
  updateCustomerSchema,
  deleteCustomerSchema,
} = require("../validations/customer.validation");
const {
  createProjectSchema,
  addUsersToProjectSchema,
} = require("../validations/project.validation");
const {
  createTaskSchema,
  updateTaskSchema,
  deleteTaskSchema,
} = require("../validations/task.validation");

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
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

const {
  postCreateProject,
  getAllProject,
  deleteProject,
  putUpdateProject,
  postAddUsersToProject,
} = require("../controllers/projectController");

const {
  postCreateTask,
  getAllTasks,
  deleteTask,
  updateTask,
} = require("../controllers/taskController");

const {
  postRegister,
  postLogin,
  getProfile,
} = require("../controllers/authController");

// ==================== AUTH ====================

routerAPI.post("/register", postRegister);
routerAPI.post("/login", postLogin);

routerAPI.get("/profile", authMiddleware, getProfile);

// ==================== USERS ====================

routerAPI.get("/users", authMiddleware, roleMiddleware("ADMIN"), getUsersAPI);
routerAPI.post("/users", postCreateUserAPI);
routerAPI.put("/users", putUpdateUserAPI);
routerAPI.delete(
  "/users",
  authMiddleware,
  roleMiddleware("ADMIN"),
  deleteUserAPI,
);
// ==================== CUSTOMERS ====================

// routerAPI.post("/customers", postCreateCustomer);
routerAPI.post("/customers-many", postCreateArrayCustomer);

routerAPI.get("/customers", getAllCustomers);

// routerAPI.put("/customers", putUpdateCustomers);

routerAPI.post(
  "/customers",
  validationMiddleware(createCustomerSchema),
  postCreateCustomer,
);

routerAPI.put(
  "/customers",
  validationMiddleware(updateCustomerSchema),
  putUpdateCustomers,
);

routerAPI.delete(
  "/customers",
  validationMiddleware(deleteCustomerSchema),
  deleteACustomer,
);
routerAPI.delete("/customers-many", deleteArrayCustomers);

// ==================== PROJECTS ====================

routerAPI.post(
  "/projects",
  authMiddleware,
  validationMiddleware({
    create: createProjectSchema,
    addUsers: addUsersToProjectSchema,
  }),
  postCreateProject,
);
routerAPI.post(
  "/projects/users",
  authMiddleware,
  validationMiddleware(addUsersToProjectSchema),
  postAddUsersToProject,
);
routerAPI.get("/projects", authMiddleware, getAllProject);

routerAPI.put("/projects", authMiddleware, putUpdateProject);
routerAPI.delete("/projects", authMiddleware, deleteProject);

// ==================== TASKS ====================

routerAPI.post(
  "/tasks",
  authMiddleware,
  validationMiddleware(createTaskSchema),
  postCreateTask,
);

routerAPI.get("/tasks", authMiddleware, getAllTasks);

routerAPI.put(
  "/tasks",
  authMiddleware,
  validationMiddleware(updateTaskSchema),
  updateTask,
);

routerAPI.delete(
  "/tasks",
  authMiddleware,
  validationMiddleware(deleteTaskSchema),
  deleteTask,
);

// ==================== FILE UPLOAD ====================

routerAPI.post("/file", postUploadSingleFileAPI);
routerAPI.post("/files", postUploadMultipleFilesAPI);

// ==================== QUERY / PARAMS NOTES ====================

// Query string:
// Không cần khai báo thêm route.
// Ví dụ:
// GET /users?name=Duy
//
// req.query

// Params:
// Cần khai báo params trong route.
// Ví dụ:
// GET /users/Duy/HCM
//
// routerAPI.get("/info/:name/:address", (req, res) => {
//   console.log("check params:", req.params);
//
//   return res.status(200).json({
//     data: req.params,
//   });
// });

module.exports = routerAPI;
