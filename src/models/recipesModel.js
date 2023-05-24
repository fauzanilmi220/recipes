const Pool = require('../config/db')

const selectRecipe = (data) => {
  let {search,sortby,sort,page,limit} = data
  getQuery = `
    SELECT
      recipe.id, 
      recipe.name,
      recipe.ingredient,
      recipe.created_at as post_time, 
      category.name as category,
      users.name as creator,
      recipe.photo,
      users.photo as creator_photo
    FROM 
      recipe 
    JOIN 
      category ON recipe.category_id=category.id 
    JOIN 
      users ON users.id = users_id 
    WHERE 
      recipe.name ILIKE '%${search}%' AND recipe.deleted_at IS NULL 
    ORDER BY 
      recipe.${sortby} ${sort}`
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
      recipe.id,  
      recipe.name,
      recipe.ingredient,
      recipe.created_at as post_time, 
      category.name as category,
      users.name as creator,
      recipe.photo,
      users.photo as creator_photo
    FROM 
      recipe 
    JOIN 
      category ON recipe.category_id=category.id
    JOIN 
      users ON users.id = users_id
    WHERE 
      recipe.name ILIKE '%${search}%' AND recipe.deleted_at IS NULL AND recipe.users_id='${id}' 
    ORDER BY 
      recipe.${sortby} ${sort}`
  );
}

const selectRecipeById = (data) => {
  console.log(data)
  return Pool.query(
    `SELECT 
      recipe.name,
      recipe.ingredient,
      recipe.created_at as post_time, 
      category.name as category,
      users.name as creator,
      recipe.photo,
      recipe.deleted_at as delete_time,
      recipe.users_id,
      recipe.category_id,
      users.photo as creator_photo
    FROM 
      recipe 
    JOIN 
      category ON recipe.category_id=category.id
    JOIN 
      users ON users.id = users_id
    WHERE 
      recipe.id = ${data}`
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