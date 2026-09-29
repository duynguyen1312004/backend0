const User = require("../models/user");
const Project = require("../models/project");
const Task = require("../models/task");

const getDashboardService = async () => {
  const totalUsers = await User.countDocuments();

  const totalProjects = await Project.countDocuments();

  const totalTasks = await Task.countDocuments();

  const inProgressTasks = await Task.countDocuments({
    status: "IN_PROGRESS",
  });

  let completedPercentage = 0;

  if (totalTasks > 0) {
    const completedTasks = await Task.countDocuments({
      status: "DONE",
    });

    completedPercentage = Math.round((completedTasks / totalTasks) * 100);
  }

  return {
    totalUsers,
    totalProjects,
    totalTasks,
    inProgressTasks,
    completedPercentage,
  };
};

module.exports = {
  getDashboardService,
};
