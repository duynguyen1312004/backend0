const connection = require("../config/database");
const {
  getAllUsers,
  getUserById,
  updateUserById,
  createUser,
  deleteUserById,
} = require("../services/CRUDService");
const User = require("../models/user");

const Project = require("../models/project");
const Task = require("../models/task");

const { postCreateTaskService } = require("../services/taskService");

const getHomePage = async (req, res) => {
  let users = await User.find({});
  let projects = await Project.find({});
  let tasks = await Task.find({});
  let currentUser = await User.findById(req.user.userId);
  return res.render("home.ejs", {
    listUsers: users,
    listProjects: projects,
    listTasks: tasks,
    currentUser: currentUser,
  });
};

const getABC = (req, res) => {
  res.send("check ABC");
};

const postCreateUser = async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;
  console.log("check req.body", email, name, city);

  //thêm data động vào database
  await User.create({
    name: name,
    email: email,
    city: city,
  });

  res.send("Created user succeed");
};

const getCreatePage = (req, res) => {
  res.render("create.ejs");
};

const getUpdatePage = async (req, res) => {
  const userId = req.params.id;
  // let user = await getUserById(userId);
  let user = await User.findById(userId);
  res.render("edit.ejs", { userEdit: user }); //x <- y
};

const postUpdateUser = async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;
  let userId = req.body.userId;

  console.log("check req.body", email, name, city, userId);

  //thêm data động vào database
  // await updateUserById(email, city, name, userId);
  await User.updateOne(
    { _id: userId },
    {
      email: email,
      name: name,
      city: city,
    },
  );
  // res.send("Updated user succeed");
  res.redirect("/"); //tro ve trang chu
};

const getDeleteUserPage = async (req, res) => {
  const userId = req.params.id;
  let user = await User.findById(userId);

  res.render("delete-user.ejs", { userEdit: user });
};

const postRemoveUser = async (req, res) => {
  let userId = req.body.userId;
  let result = await User.deleteOne({ _id: userId });
  console.log(">> result: ", result);
  res.redirect("/"); //tro ve trang chu
};

const getProjectPage = async (req, res) => {
  try {
    let projects = await Project.find({});

    return res.render("projects.ejs", {
      listProjects: projects,
    });
  } catch (error) {
    console.log("error:", error);
    return res.status(500).send("Server error");
  }
};
const getProjectDetailPage = async (req, res) => {
  try {
    const projectId = req.params.id;

    const project = await Project.findById(projectId)
      .populate("createdBy")
      .populate("usersInfor")
      .populate("tasks");

    if (!project) {
      return res.status(404).send("Project not found");
    }

    return res.render("project-detail.ejs", {
      project: project,
    });
  } catch (error) {
    console.log("error:", error);
    return res.status(500).send("Server error");
  }
};
//Task

const getCreateTaskPage = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findById(projectId).populate("usersInfor");
    if (!project) {
      return res.status(404).send("Project not found");
    } // Kiểm tra người đang đăng nhập có phải Creator không
    if (project.createdBy.toString() !== req.user.userId.toString()) {
      return res.status(403).send("You do not have permission to create task");
    }
    return res.render("create-task.ejs", {
      projectId: project._id,
      users: project.usersInfor,
    });
  } catch (error) {
    console.log("error:", error);
    return res.status(500).send("Server error");
  }
};

const postCreateTaskPage = async (req, res) => {
  try {
    const projectId = req.params.id;

    const data = {
      name: req.body.name,
      description: req.body.description,
      status: req.body.status,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      assignedTo: req.body.assignedTo,
      projectId: projectId,
    };

    await postCreateTaskService(data);

    return res.redirect(`/projects/${projectId}`);
  } catch (error) {
    console.log("error:", error);
    return res.status(500).send("Server error");
  }
};
module.exports = {
  getUpdatePage,
  getHomePage,
  getABC,
  postCreateUser,
  getCreatePage,
  postUpdateUser,
  getDeleteUserPage,
  postRemoveUser,
  getProjectPage,
  getProjectDetailPage,
  getCreateTaskPage,
  postCreateTaskPage,
};
