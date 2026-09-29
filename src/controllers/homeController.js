const User = require("../models/user");

const Project = require("../models/project");
const Task = require("../models/task");
const { getMyTeamService } = require("../services/teamService");
const {
  createProjectService,
  addUsersToProjectService,
} = require("../services/projectService");
const {
  postCreateTaskService,
  putUpdateTaskService,
} = require("../services/taskService");

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

const postAddMember = async (req, res) => {
  try {
    const projectId = req.params.id;
    const userId = req.body.userId;

    const data = {
      type: "ADD-USERS",
      projectId: projectId,
      usersArr: [userId],
    };

    const result = await addUsersToProjectService(data, req.user.userId);

    if (result.EC !== undefined && result.EC !== 0) {
      return res.status(result.statusCode || 400).send(result.message);
    }

    return res.redirect(`/projects/${projectId}`);
  } catch (error) {
    console.log("error:", error);
    return res.status(500).send("Server error");
  }
};

const postCreateUser = async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;
  // console.log("check req.body", email, name, city);

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

  // console.log("check req.body", email, name, city, userId);

  //thêm data động vào database

  await User.updateOne(
    { _id: userId },
    {
      email: email,
      name: name,
      city: city,
    },
  );

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

  res.redirect("/"); //tro ve trang chu
};
const getCreateProjectPage = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.userId);

    return res.render("create-project.ejs", {
      currentUser: currentUser,
    });
  } catch (error) {
    console.log("error:", error);
    return res.status(500).send("Server error");
  }
};
const postCreateProjectPage = async (req, res) => {
  try {
    const data = {
      type: req.body.type,
      name: req.body.name,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      description: req.body.description,
      customerInfor: {
        name: req.body.customerName,
        phone: req.body.customerPhone,
        email: req.body.customerEmail,
      },
      leader: { name: req.body.leaderName, email: req.body.leaderEmail },
    };
    const result = await createProjectService(data, req.user.userId);
    if (result.EC !== undefined && result.EC !== 0) {
      return res.status(result.statusCode || 400).send(result.message);
    }
    return res.redirect("/projects");
  } catch (error) {
    console.log("error:", error);
    return res.status(500).send("Server error");
  }
};

const getProjectPage = async (req, res) => {
  try {
    const projects = await Project.find({})
      .populate("usersInfor")
      .populate("tasks");

    const currentUser = await User.findById(req.user.userId);

    return res.render("projects.ejs", {
      listProjects: projects,
      currentUser: currentUser,
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
      .populate({
        path: "tasks",
        populate: {
          path: "assignedTo",
          select: "name email",
        },
      });

    if (!project) {
      return res.status(404).send("Project not found");
    }

    const currentUser = await User.findById(req.user.userId);

    const users = await User.find({});

    return res.render("project-detail.ejs", {
      project,
      currentUser,
      users,
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
    }

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
    console.log("PARAMS:", req.params);
    console.log("BODY:", req.body);

    const projectId = req.params.id;
    console.log("PROJECT ID:", projectId);

    const data = {
      name: req.body.name,
      description: req.body.description,
      status: req.body.status,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      assignedTo: req.body.assignedTo,
      projectId: projectId,
    };

    const result = await postCreateTaskService(data, req.user.userId);

    if (result.EC !== undefined && result.EC !== 0) {
      return res.status(result.statusCode || 400).send(result.message);
    }

    return res.redirect(`/projects/${projectId}`);
  } catch (error) {
    console.log("error:", error);
    return res.status(500).send("Server error");
  }
};

const getMyTasksPage = async (req, res) => {
  try {
    console.log("CURRENT USER:", req.user);
    const tasks = await Task.find({
      assignedTo: req.user.userId,
    })
      .populate("assignedTo", "name email")
      .populate("projectId", "name");

    console.log("MY TASKS:", tasks);

    const currentUser = await User.findById(req.user.userId);

    return res.render("my-tasks.ejs", {
      tasks: tasks,
      currentUser: currentUser,
    });
  } catch (error) {
    console.log("error:", error);
    return res.status(500).send("Server error");
  }
};

const getTaskDetailPage = async (req, res) => {
  try {
    const taskId = req.params.id;

    const task = await Task.findById(taskId)
      .populate("assignedTo", "name email")
      .populate("projectId", "name createdBy");

    if (!task) {
      return res.status(404).send("Task not found");
    }

    const currentUser = await User.findById(req.user.userId);

    return res.render("task-detail.ejs", {
      task: task,
      currentUser: currentUser,
    });
  } catch (error) {
    console.log("error:", error);
    return res.status(500).send("Server error");
  }
};

const getEditTaskPage = async (req, res) => {
  try {
    const taskId = req.params.id;

    const task = await Task.findById(taskId)
      .populate("assignedTo", "name email")
      .populate("projectId", "name createdBy");

    if (!task) {
      return res.status(404).send("Task not found");
    }

    const currentUser = await User.findById(req.user.userId);

    const isAssignedUser =
      task.assignedTo &&
      task.assignedTo._id.toString() === req.user.userId.toString();

    const isProjectCreator =
      task.projectId &&
      task.projectId.createdBy.toString() === req.user.userId.toString();

    if (!isAssignedUser && !isProjectCreator) {
      return res
        .status(403)
        .send("You do not have permission to edit this task");
    }

    return res.render("edit-task.ejs", {
      task: task,
      currentUser: currentUser,
    });
  } catch (error) {
    console.log("error:", error);
    return res.status(500).send("Server error");
  }
};

const postEditTaskPage = async (req, res) => {
  try {
    const taskId = req.params.id;

    const data = {
      name: req.body.name,
      endDate: req.body.endDate,
      description: req.body.description,
      status: req.body.status,
    };

    const result = await putUpdateTaskService(taskId, data, req.user.userId);

    if (result.EC !== undefined && result.EC !== 0) {
      return res.status(result.statusCode || 400).send(result.message);
    }

    return res.redirect(`/tasks/${taskId}`);
  } catch (error) {
    console.log("error:", error);
    return res.status(500).send("Server error");
  }
};

const postRemoveAssignedUser = async (req, res) => {
  try {
    const taskId = req.params.id;

    const result = await deleteTaskService(
      {
        taskId: taskId,
        type: "REMOVE-ASSIGNED-USER",
      },
      req.user.userId,
    );

    if (result.EC !== undefined && result.EC !== 0) {
      return res.status(result.statusCode || 400).send(result.message);
    }

    return res.redirect(`/tasks/${taskId}`);
  } catch (error) {
    console.log("error:", error);
    return res.status(500).send("Server error");
  }
};
const postDeleteTaskPage = async (req, res) => {
  try {
    const taskId = req.params.id;

    const result = await deleteTaskService(
      {
        taskId: taskId,
        type: "REMOVE-TASK",
      },
      req.user.userId,
    );

    if (result.EC !== undefined && result.EC !== 0) {
      return res.status(result.statusCode || 400).send(result.message);
    }

    return res.redirect("/my-tasks");
  } catch (error) {
    console.log("error:", error);
    return res.status(500).send("Server error");
  }
};

const getProfilePage = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.userId);

    if (!currentUser) {
      return res.status(404).send("User not found");
    }

    return res.render("profile.ejs", {
      currentUser: currentUser,
    });
  } catch (error) {
    console.log("error:", error);
    return res.status(500).send("Server error");
  }
};
const getEditProfilePage = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.userId);

    if (!currentUser) {
      return res.status(404).send("User not found");
    }

    return res.render("edit-profile.ejs", {
      currentUser: currentUser,
    });
  } catch (error) {
    console.log("error:", error);
    return res.status(500).send("Server error");
  }
};
const postEditProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const { name, city } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).send("Name is required");
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Update thông tin cơ bản
    user.name = name.trim();
    user.city = city ? city.trim() : "";

    // Upload avatar
    if (req.files && req.files.avatar) {
      const avatar = req.files.avatar;

      if (!avatar.mimetype.startsWith("image/")) {
        return res.status(400).send("Avatar must be an image");
      }

      const fileName = `${Date.now()}-${avatar.name}`;

      const uploadPath = `src/public/images/upload/${fileName}`;

      await avatar.mv(uploadPath);

      user.avatar = `/images/upload/${fileName}`;
    }

    await user.save();

    return res.redirect("/profile");
  } catch (error) {
    console.log("error:", error);
    return res.status(500).send("Server error");
  }
};
const getTeamPage = async (req, res) => {
  try {
    const team = await getMyTeamService(req.user.userId);

    const currentUser = await User.findById(req.user.userId);

    return res.render("team.ejs", {
      team: team,
      currentUser: currentUser,
    });
  } catch (error) {
    console.log("error:", error);
    return res.status(500).send("Server error");
  }
};
const getHelpPage = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.userId);

    return res.render("help.ejs", {
      currentUser: currentUser,
    });
  } catch (error) {
    console.log("error:", error);
    return res.status(500).send("Server error");
  }
};
module.exports = {
  getUpdatePage,
  getHomePage,

  postCreateUser,
  getCreatePage,
  postUpdateUser,
  getDeleteUserPage,
  postRemoveUser,
  getProjectPage,
  getProjectDetailPage,
  getCreateTaskPage,
  postCreateTaskPage,
  getCreateProjectPage,
  postCreateProjectPage,
  postAddMember,
  getMyTasksPage,
  getTaskDetailPage,
  getEditTaskPage,
  postEditTaskPage,
  postRemoveAssignedUser,
  postDeleteTaskPage,
  getProfilePage,
  getEditProfilePage,
  postEditProfile,
  getTeamPage,
  getHelpPage,
};
