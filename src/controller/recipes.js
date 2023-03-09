const {insertDataRecipe,getDataBySearch, selectAllRecipe, updateDataRecipes, selectRecipeById,deleteRecipe} = require('./../models/recipes')

const RecipesController = {
    inputRecipes: async (req,res,next)=>{
        let data = {}
        data.title = req.body.title
        data.photo = req.body.photo
        data.users_id = req.body.users_id
        data.ingredients = req.body.ingredients
        data.category_id = req.body.category_id
        
        let result = await insertDataRecipe(data)

        if(!result){
            res.status(404).json({status:404,message:`input data failed`})
        }

        res.status(200).json({status:200,message:`input data success `})

    },
    getRecipes: async (req,res,next) => {
        let {searchBy,search,sortBy,sort} = req.query
        let data = {
            searchBy: searchBy || 'title',
            search: search || '',
            sortBy: sortBy || 'created_at',
            sort: sort || 'ASC'
        }

        let result = await getDataBySearch(data)

        if(!result){
            res.status(404).json({status:404,message:`get data failed`})
        }

        res.status(200).json({status:200,message:`get data success `,data:result.rows})
    },

    getAllRecipes : async (req,res,next) => {
        let showRecipe = await selectAllRecipe()
        if(!showRecipe){
            res.status(400).json({status:400,message:`data user not found`})
        }
        
        res.status(200).json({status:200,message:`data found`,data:showRecipe.rows})
    },

    putDataRecipes: async(req,res,next)=>{
        let id = req.params.id_recipe
        let title = req.body.title

        let result = await updateDataRecipes(id,title)

        if(!result){
            res.status(404).json({status:404,message:`data input not found`})
        }

        let checkDataRecipes = await selectRecipeById('id',id)

        res.status(200).json({status:200,message:`update data success`,data:checkDataRecipes.rows})
    },
    deleteDataRecipe: async(req,res,next)=>{
        let id = req.params.id
        let result = await deleteRecipe(id)

        console.log(result)
        
        if(!result){
            res.status(404).json({status:404,message:`delete data failed`})
        }

        res.status(200).json({status:200,message:`delete data success`,data:`${id} deleted`})

    }

}

module.exports = RecipesController