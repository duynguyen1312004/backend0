const {
  postCreateTaskService,
  getTaskService,
  deleteTaskService,
  putUpdateTaskService,
} = require("../services/taskService");

const postCreateTask = async (req, res) => {
  let result = await postCreateTaskService(req.body);
  return res.status(200).json({
    EC: 0,
    data: result,
  });
};

const getAllTasks = async (req, res) => {
  let result = await getTaskService(req.query);
  return res.status(200).json({
    EC: 0,
    data: result,
  });
};

const deleteTask = async (req, res) => {
  let result = await deleteTaskService(req.body);
  return res.status(200).json({
    EC: 0,
    data: result,
  });
};

const updateTask = async (req, res) => {
  console.log("=== UPDATE TASK ===");
  console.log("req.user:", req.user);
  console.log("requester userId:", req.user.userId);
  const { taskId, name, endDate, description, status } = req.body;

  const data = {
    name,
    endDate,
    description,
    status,
  };

  const result = await putUpdateTaskService(taskId, data, req.user.userId);

  if (result.EC !== undefined && result.EC !== 0) {
    return res.status(result.statusCode).json({
      EC: result.EC,
      message: result.message,
    });
  }

  return res.status(200).json({
    EC: 0,
    data: result,
  });
};

module.exports = { postCreateTask, getAllTasks, deleteTask, updateTask };
