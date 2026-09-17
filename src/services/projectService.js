const Project = require("../models/project");
const aqp = require("api-query-params");
const Task = require("../models/task");

const createProjectService = async (data, userId) => {
  if (data.type === "EMPTY-PROJECT") {
    let result = await Project.create({ ...data, createdBy: userId });
    return result;
  }
  if (data.type === "ADD-USERS") {
    let myProject = await Project.findById(data.projectId).exec();

    for (let i = 0; i < data.usersArr.length; i++) {
      myProject.usersInfor.push(data.usersArr[i]);
    }
    let newResult = await myProject.save();
    return newResult;
  }
  return null;
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

const deleteProjectService = async (data) => {
  try {
    const idProject = data.idProject;
    const idUser = data.idUser;
    if (data.type === "REMOVE-USER") {
      let result = await Project.updateOne(
        { _id: idProject },
        {
          $pull: {
            usersInfor: idUser,
          },
        },
      );
      return result;
    }
    if (data.type === "REMOVE-PROJECT") {
      let result = await Project.deleteById(idProject); //đẩy biến deleted = true
      console.log("Delete result:", result);
      return result;
    }
  } catch (error) {
    console.log("error : ", error);
    return null;
  }
};

const putUpdateProjectService = async (idProject, data) => {
  try {
    if (data.type === "ADD-TASK") {
      let result = await Project.updateOne(
        { _id: idProject },
        {
          $push: {
            tasks: data.idTask, //thêm idTask vào trong array tasks
          },
        },
      );
      return result;
    }
    let result = await Project.updateOne(
      { _id: idProject },
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
  createProjectService,
  getProjectService,
  deleteProjectService,
  putUpdateProjectService,
};
