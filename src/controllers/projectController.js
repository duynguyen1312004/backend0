const { createProjectService } = require("../services/projectService");
const postCreateProject = async (req, res) => {
  let result = await createProjectService(req.body);
  return res.status(200).json({
    EC: 0,
    data: result,
  });
};

module.exports = { postCreateProject };
