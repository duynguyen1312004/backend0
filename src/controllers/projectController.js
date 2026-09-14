const {
  createProjectService,
  getProjectService,
  deleteProjectService,
  putUpdateProjectService,
} = require("../services/projectService");

const postCreateProject = async (req, res) => {
  let result = await createProjectService(req.body);
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
  const { idProject, name, endDate, description } = req.body;
  const data = { name, endDate, description };
  let result = await putUpdateProjectService(idProject, data);
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
