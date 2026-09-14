const Task = require("../models/task");
const postCreateTaskService = async (data) => {
  try {
    let result = await Task.create(data);
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
    const idUser = data.idUser;
    if (data.type === "REMOVE-USER") {
      let result = await Task.updateOne(
        { _id: idTask },
        {
          $pull: {
            usersInfor: idUser,
          },
        },
      );
      return result;
    }
    if (data.type === "REMOVE-TASK") {
      let result = await Task.deleteById(idTask); //đẩy biến deleted = true
      console.log("Delete result:", result);
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
