const Pool = require('./../config/db')

const insertDataRecipe = (data) => {
  let {ingredients,title,photo,users_id, category_id} = data
  let time =new Date().toISOString()
return Pool.query(
  `INSERT INTO recipes(title,ingredients,photo,users_id,created_at, category_id) VALUES('${title}','${ingredients}','${photo}',${users_id},'${time}','${category_id}')`
);
}

const getDataBySearch = (data) => {
  let {searchBy,search,sortBy,sort} = data
  return Pool.query(
    `SELECT rc.title,rc.ingredients,rc.created_at, cat.id FROM recipes as rc
    JOIN category as cat on rc.category_id = cat.id
     WHERE recipes.${searchBy} ILIKE '%${search}%' ORDER BY recipes.${sortBy} ${sort}`
  );
}

const selectAllRecipe = () => {
  return Pool.query(
    `SELECT * FROM recipes`
  );
};

const selectRecipeById = (by,data) => {
  console.log(data)
  return Pool.query(
    `SELECT * FROM recipes WHERE ${by}='${data}'`
  );
};

const updateDataRecipes = (id,data) => {
  console.log(data)
  return Pool.query(
    `UPDATE recipes SET title='${data}' WHERE id=${id}`
  );
};

const deleteRecipe = (id) => {
  console.log(id)
  return Pool.query(
    `DELETE FROM recipes WHERE id_recipe=${id}`
  );
};


module.exports = {insertDataRecipe,getDataBySearch,selectAllRecipe,updateDataRecipes,selectRecipeById,deleteRecipe}