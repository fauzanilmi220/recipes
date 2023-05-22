const Pool = require('../config/db')

const selectCategory = () => {
    return Pool.query(
      `SELECT * FROM category WHERE deleted_at IS NULL`
    );
  };

const insertCategory = data => {
  console.log(data)
  return Pool.query(
    `INSERT INTO category(name) VALUES('${data}')`
  );
}
const selectCategoryById = (data) => {
  console.log(data)
  return Pool.query(
    `SELECT * FROM category WHERE id = ${data}`
  );
}
const selectCategoryByName = (data) => {
  console.log(data)
  return Pool.query(
    `SELECT * FROM category WHERE name ='${data}' AND deleted_at IS NULL`
  );
}

const deleteCategoryById = (data) => {
  console.log(data)
  let time = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
  return Pool.query(
    `UPDATE category SET deleted_at = '${time}' WHERE id = ${data};`
  );
}

const updateCategory = (id,name) => {
  console.log(id,name)
  return Pool.query(
    `UPDATE category SET name = '${name}' WHERE id = ${id};`
  );
}

module.exports = {selectCategory,insertCategory,selectCategoryById,selectCategoryByName,deleteCategoryById,updateCategory}