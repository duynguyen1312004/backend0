const {
  createProjectService,
  getProjectService,
  deleteProjectService,
  putUpdateProjectService,
} = require("../services/projectService");

const postCreateProject = async (req, res) => {
  console.log("BODY:", req.body);
  console.log("USER:", req.user);
  let result = await createProjectService(req.body, req.user.userId);
  return res.status(200).json({
    EC: 0,
    data: result,
  });
};

const getAllProject = async (req, res) => {
  let result = await getProjectService(req.query);
  return res.status(200).json({
    EC: 0,
    data: result,
  });
};
const deleteProject = async (req, res) => {
  let result = await deleteProjectService(req.body);
  return res.status(200).json({
    EC: 0,
    data: result,
  });
};

const putUpdateProject = async (req, res) => {
  console.log(">>> PUT PROJECT CONTROLLER");
  console.log("BODY:", req.body);
  console.log("USER:", req.user);
  const { idProject, type, idTask, userId, name, endDate, description } =
    req.body;
  console.log("idProject:", idProject);
  console.log("type:", type);
  const data = {
    idProject,
    type,
    idTask,
    userId,
    name,
    endDate,
    description,
  };
  console.log("DATA:", data);

  let result = await putUpdateProjectService(idProject, data);
  console.log("RESULT:", result);
  return res.status(200).json({
    EC: 0,
    data: result,
  });
};

module.exports = {
  deleteProject,
  postCreateProject,
  getAllProject,
  putUpdateProject,
};
