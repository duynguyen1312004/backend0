const Task = require("../models/task");
const Project = require("../models/project");
const postCreateTaskService = async (data, userId) => {
  try {
    // Tìm project
    const project = await Project.findById(data.projectId);
    if (!project) {
      return { EC: -1, statusCode: 404, message: "Project not found" };
    } // Kiểm tra Creator
    if (project.createdBy.toString() !== userId.toString()) {
      return {
        EC: -1,
        statusCode: 403,
        message: "You do not have permission to create task",
      };
    } // Tạo Task
    const result = await Task.create(data);
    // Thêm Task vào Project

    await Project.updateOne(
      { _id: data.projectId },
      {
        $push: {
          tasks: result._id,
        },
      },
    );

    return result;
  } catch (error) {
    console.log("error : ", error);
    return null;
  }
};

const getTaskService = async (data) => {
  let filter = {};
  let limit = Number(data.limit);
  let page = Number(data.page);
  let query = Task.find(filter).populate(data.populate); //lấy document liên quan từ collection khác.
  if (limit && page) {
    let skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
  }
  const result = await query.exec();
  return result;
};

const deleteTaskService = async (data, userId) => {
  try {
    const taskId = data.taskId;

    // Tìm Task
    const task = await Task.findById(taskId);

    if (!task) {
      return {
        EC: -1,
        statusCode: 404,
        message: "Task not found",
      };
    }

    // Bỏ người được assign khỏi Task
    if (data.type === "REMOVE-ASSIGNED-USER") {
      // Tìm Project
      const project = await Project.findById(task.projectId);

      if (!project) {
        return {
          EC: -1,
          statusCode: 404,
          message: "Project not found",
        };
      }

      // Chỉ Project Creator được bỏ assigned user
      if (project.createdBy.toString() !== userId.toString()) {
        return {
          EC: -1,
          statusCode: 403,
          message: "You do not have permission",
        };
      }
      let result = await Task.updateOne(
        { _id: taskId },
        {
          $unset: {
            assignedTo: 1,
          },
        },
      );

      return result;
    }
    // Xóa Task
    if (data.type === "REMOVE-TASK") {
      // Tìm Project
      const project = await Project.findById(task.projectId);

      if (!project) {
        return {
          EC: -1,
          statusCode: 404,
          message: "Project not found",
        };
      }

      // Chỉ Project Creator được xóa Task
      if (project.createdBy.toString() !== userId.toString()) {
        return {
          EC: -1,
          statusCode: 403,
          message: "You do not have permission to delete this task",
        };
      }

      // Soft delete Task
      const result = await Task.deleteById(taskId);

      // Xóa taskId khỏi Project.tasks
      await Project.updateOne(
        { _id: task.projectId },
        {
          $pull: {
            tasks: task._id,
          },
        },
      );

      return result;
    }
  } catch (error) {
    console.log("error : ", error);
    return null;
  }
};

const putUpdateTaskService = async (taskId, data, userId) => {
  try {
    const task = await Task.findById(taskId);

    if (!task) {
      return {
        EC: -1,
        statusCode: 404,
        message: "Task not found",
      };
    }

    const project = await Project.findById(task.projectId);

    // console.log("project:", project);
    // console.log("project.createdBy:", project.createdBy);
    // console.log("task.assignedTo:", task.assignedTo);
    // console.log("userId:", userId);
    if (!project) {
      return {
        EC: -1,
        statusCode: 404,
        message: "Project not found",
      };
    }
    //Người đang đăng nhập có phải chủ Project không?
    const isCreator = project.createdBy.toString() === userId.toString();
    //Người đang đăng nhập có phải người được giao Task không?
    const isAssignedUser =
      task.assignedTo && task.assignedTo.toString() === userId.toString();

    if (!isCreator && !isAssignedUser) {
      return {
        EC: -1,
        statusCode: 403,
        message: "You do not have permission to update this task",
      };
    }

    const result = await Task.updateOne(
      { _id: taskId },
      {
        $set: {
          name: data.name,
          endDate: data.endDate,
          description: data.description,
          status: data.status,
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

module.exports = {
  putUpdateTaskService,
  postCreateTaskService,
  getTaskService,
  deleteTaskService,
};
