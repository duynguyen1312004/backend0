const Project = require("../models/project");

const getMyTeamService = async (userId) => {
  const projects = await Project.find({
    $or: [{ createdBy: userId }, { usersInfor: userId }],
  })
    .populate("createdBy", "name email role")
    .populate("usersInfor", "name email role");

  const teamMap = new Map();

  projects.forEach((project) => {
    // Project Creator
    if (project.createdBy) {
      teamMap.set(project.createdBy._id.toString(), project.createdBy);
    }

    // Project Members
    project.usersInfor.forEach((user) => {
      teamMap.set(user._id.toString(), user);
    });
  });

  return Array.from(teamMap.values());
};

module.exports = {
  getMyTeamService,
};
