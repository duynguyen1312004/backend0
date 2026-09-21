const {
  createProjectService,
  getProjectService,
  deleteProjectService,
  putUpdateProjectService,
} = require("../services/projectService");

const postCreateProject = async (req, res) => {
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
  const { projectId, type, userId } = req.body;

  const result = await deleteProjectService(
    projectId,
    {
      type,
      userId, //userId này là userId sẽ bị loại bỏ
    },
    req.user.userId, //thằng này là thằng sẽ loại bỏ thằng ở trên
  );

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

const putUpdateProject = async (req, res) => {
  const { projectId, type, taskId, userId, name, endDate, description } =
    req.body;
  const data = {
    projectId,
    type,
    taskId,
    userId,
    name,
    endDate,
    description,
  };
  let result = await putUpdateProjectService(projectId, data, req.user.userId);
  console.log("RESULT:", result);
  if (result.EC !== 0) {
    return res.status(result.statusCode).json({
      EC: result.EC,
      message: result.message,
    });
  }

  return res.status(200).json({
    EC: 0,
    data: result.data,
  });
};

module.exports = {
  deleteProject,
  postCreateProject,
  getAllProject,
  putUpdateProject,
};
