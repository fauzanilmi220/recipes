const Pool = require('./../config/db')

const selectData = () => {
    return Pool.query(
      `SELECT * FROM users`
    );
  };

const insertData = data => {
  console.log(data)
  return Pool.query(
    `INSERT INTO users(name) VALUES('${data}')`
  );
}
const selectDataById = (by,data) => {
  console.log(data)
  return Pool.query(
    `SELECT * FROM users WHERE ${by}='${data}'`
  );
}

const updateData = (id,data) => {
  console.log(data)
  return Pool.query(
    `UPDATE users SET name='${data}' WHERE id=${id}`
  );
}

const deleteUser = (id) => {
  console.log(id)
  return Pool.query(
    `DELETE FROM users WHERE id=${id}`
  );
}

module.exports = {selectData,insertData,selectDataById,updateData,deleteUser}