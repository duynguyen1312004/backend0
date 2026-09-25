const Project = require("../models/project");
const aqp = require("api-query-params");
const Task = require("../models/task");

const createProjectService = async (data, userId) => {
  try {
    const result = await Project.create({
      ...data,
      createdBy: userId,
    });

    return result;
  } catch (error) {
    console.log("error:", error);

    return {
      EC: -1,
      statusCode: 500,
      message: "Internal server error",
    };
  }
};
const addUsersToProjectService = async (data, userId) => {
  try {
    const project = await Project.findById(data.projectId);

    if (!project) {
      return {
        EC: -1,
        statusCode: 404,
        message: "Project not found",
      };
    }

    const isCreator = project.createdBy.toString() === userId.toString();

    if (!isCreator) {
      return {
        EC: -1,
        statusCode: 403,
        message: "You do not have permission to add users",
      };
    }

    const result = await Project.updateOne(
      { _id: data.projectId },
      {
        $addToSet: {
          usersInfor: {
            $each: data.usersArr,
          },
        },
      },
    );

    return result;
  } catch (error) {
    console.log("error:", error);

    return {
      EC: -1,
      statusCode: 500,
      message: "Internal server error",
    };
  }
};
const getProjectService = async (data) => {
  let filter = {};
  let limit = Number(data.limit);
  let page = Number(data.page);
  let query = Project.find(filter).populate(data.populate); //lấy document liên quan từ collection khác.
  if (limit && page) {
    let skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
  }
  const result = await query.exec();
  return result;
};

const deleteProjectService = async (projectId, data, userId) => {
  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return {
        EC: -1,
        statusCode: 404,
        message: "Project not found",
      };
    }

    // Authorization
    if (project.createdBy.toString() !== userId.toString()) {
      return {
        EC: -1,
        statusCode: 403,
        message: "You do not have permission",
      };
    }

    // Remove user
    if (data.type === "REMOVE-USER") {
      const result = await Project.updateOne(
        { _id: projectId },
        {
          $pull: {
            usersInfor: data.userId,
          },
        },
      );

      return result;
    }

    // Remove project
    if (data.type === "REMOVE-PROJECT") {
      const result = await Project.deleteById(projectId);

      console.log("Delete result:", result);

      return result;
    }
  } catch (error) {
    console.log("error:", error);
    return null;
  }
};

const putUpdateProjectService = async (projectId, data, userId) => {
  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return {
        EC: -1,
        statusCode: 404,
        message: "Project not found",
      };
    }

    // Authorization
    if (project.createdBy.toString() !== userId.toString()) {
      return {
        EC: -1,
        statusCode: 403,
        message: "You do not have permission to update this project",
      };
    }

    // Add user
    if (data.type === "ADD-USERS") {
      const result = await Project.updateOne(
        { _id: projectId },
        {
          $addToSet: {
            usersInfor: data.userId,
          },
        },
      );

      return result;
    }

    // Update project information
    const result = await Project.updateOne(
      { _id: projectId },
      {
        $set: {
          name: data.name,
          endDate: data.endDate,
          description: data.description,
        },
      },
    );

    return result;
  } catch (error) {
    console.log("error:", error);
    return null;
  }
};
module.exports = {
  createProjectService,
  getProjectService,
  deleteProjectService,
  putUpdateProjectService,
  addUsersToProjectService,
};
