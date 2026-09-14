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
  const { idTask, name, endDate, description } = req.body;
  const data = { name, endDate, description };
  let result = await putUpdateTaskService(idTask, data);
  return res.status(200).json({
    EC: 0,
    data: result,
  });
};

module.exports = { postCreateTask, getAllTasks, deleteTask, updateTask };
