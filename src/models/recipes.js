const Pool = require('./../config/db')

const insertData = (data) => {
    let {ingredients,title,photo,cat_id} = data
    let time =new Date().toISOString()
  return Pool.query(
    `INSERT INTO recipes(title,ingredients,photo,id_cat,created_at) VALUES('${title}','${ingredients}','${photo}',${cat_id},'${time}')`
  );
}

const getDataBySearch = (data) => {
  let {searchBy,search,sortBy,sort} = data
  return Pool.query(
    `SELECT rc.title,rc.ingredients,rc.created_at, cat.category FROM recipes as rc
    JOIN categories as cat on rc.id_cat = cat.id_cat 
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
    `DELETE FROM recipes WHERE id=${id}`
  );
};


module.exports = {insertData,getDataBySearch,selectAllRecipe,updateDataRecipes,selectRecipeById,deleteRecipe}