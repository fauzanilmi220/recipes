const Pool = require('../config/db')

const selectRecipe = (data) => {
  let {search,sortby,sort,page,limit} = data
  getQuery = `
    SELECT
      rc.id, 
      rc.name,
      rc.ingredient,
      rc.created_at as post_time, 
      category.name as category,
      users.name as creator,
      rc.photo,
      rc.photo as creator_photo
    FROM 
      recipe as rc
    JOIN 
      category as cat ON rc.category_id=cat.id 
    JOIN 
      users as us ON us.id = users_id
    WHERE 
      rc.name ILIKE '%${search}%' AND rc.deleted_at IS NULL 
    ORDER BY 
      rc.${sortby} ${sort}`
  if (page && limit) {
    getQuery += ` OFFSET ${(page-1)*limit} LIMIT ${limit}`
  }
  console.log(data)
    return Pool.query(getQuery);
}

const insertRecipe = (data) => {
  console.log(data)
  let {name,ingredient,photo,users_id,category_id} = data
  let time = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
  return Pool.query(
    `INSERT INTO 
      recipe(name,ingredient,photo,created_at,users_id,category_id) 
    VALUES('${name}','${ingredient}','${photo}','${time}','${users_id}','${category_id}')`
  );
}
const selectRecipeByUserId = (data) => {
  console.log(data)
  let {search,sortby,sort,id} = data
  return Pool.query(
    `SELECT
      rc.id,  
      rc.name,
      rc.ingredient,
      rc.created_at as post_time, 
      category.name as category,
      users.name as creator,
      rc.photo,
      users.photo as creator_photo
    FROM 
      recipe as rc
    JOIN 
      category as cat ON rc.category_id=cat.id
    JOIN 
      users as us ON us.id = users_id
    WHERE 
      rc.name ILIKE '%${search}%' AND rc.deleted_at IS NULL AND rc.users_id='${id}' 
    ORDER BY 
      rc.${sortby} ${sort}`
  );
}

const selectRecipeById = (data) => {
  console.log(data)
  return Pool.query(
    `SELECT 
      rc.name,
      rc.ingredient,
      rc.created_at as post_time, 
      cat.name as category,
      users.name as creator,
      rc.photo,
      rc.deleted_at as delete_time,
      rc.users_id,
      rc.category_id,
      users.photo as creator_photo
    FROM 
      recipe as rc
    JOIN 
      category as cat ON rc.category_id=cat.id
    JOIN 
      users ON users.id = users_id
    WHERE 
      rc.id = ${data}`
  );
}

const deleteRecipeById = (data) => {
  console.log(data)
  let time = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
  return Pool.query(
    `UPDATE recipe SET deleted_at = '${time}' WHERE id = ${data};`
  );
}

const updateRecipe = (id,data) => {
  console.log(id,data)
  let {name,ingredient,photo,users_id,category_id} = data
  return Pool.query(
    `UPDATE 
      recipe 
    SET 
      name = '${name}', 
      ingredient = '${ingredient}', 
      photo = '${photo}', 
      users_id = '${users_id}', 
      category_id = ${category_id} 
    WHERE 
      id = ${id};`
  );
}

module.exports = {selectRecipe,insertRecipe,selectRecipeByUserId,selectRecipeById,deleteRecipeById,updateRecipe}