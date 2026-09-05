const connection = require("../config/database");

const getAllUsers = async (req, res) => {
  let [results, fields] = await connection.query("SELECT * FROM users");
  return results;
};

const createUser = async (email, name, city) => {
  let [results, fields] = await connection.query(
    `INSERT INTO users ( email,name, city)VALUES (?, ?, ?);`,
    [email, name, city],
  );
  return results;
};

const getUserById = async (userId) => {
  let [results, fields] = await connection.query(
    "SELECT * FROM users where id = ?",
    [userId],
  );
  let user = results && results.length > 0 ? results[0] : {};
  return user;
};

const updateUserById = async (email, city, name, userId) => {
  let [results, fields] = await connection.query(
    `UPDATE users
    SET email = ?, city = ?, name =?
    WHERE id = ?`,
    [email, city, name, userId],
  );
};

const deleteUserById = async (userId) => {
  let [results, fields] = await connection.query(
    `DELETE FROM users
    WHERE id = ?`,
    [userId],
  );
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
