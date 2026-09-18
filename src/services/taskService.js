const Task = require("../models/task");
const Project = require("../models/project");
const postCreateTaskService = async (data) => {
  try {
    let result = await Task.create(data);
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

const deleteTaskService = async (data) => {
  try {
    const idTask = data.idTask;

    // Bỏ người được assign khỏi Task
    if (data.type === "REMOVE-ASSIGNED-USER") {
      let result = await Task.updateOne(
        { _id: idTask },
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
      // Tìm Task trước để lấy projectId
      const task = await Task.findById(idTask);

      if (!task) {
        return null;
      }

      // Soft delete Task
      let result = await Task.deleteById(idTask);

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

const putUpdateTaskService = async (idTask, data) => {
  try {
    let result = await Task.updateOne(
      { _id: idTask },
      {
        ...data, //hoặc bỏ đi {} chỉ còn data thôi là nó đúng
      },
    );
    return result;
  } catch (error) {
    console.log("error : ", error);
    return null;
  }
};

module.exports = {
  putUpdateTaskService,
  postCreateTaskService,
  getTaskService,
  deleteTaskService,
};
