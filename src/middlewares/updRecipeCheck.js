const {selectRecipeById} = require('../models/recipesModel')
const cloudinary = require("../config/upload")

const updateRecipeChecker = async (req,res,next) => {
    let id = req.params.id
    let name = req.body.name
    let ingredient = req.body.ingredient
    let photo = req.file
    let users_id = req.body.users_id
    let category_id = req.body.category_id
    let data = {name,ingredient,photo,users_id,category_id}
    let oldData = await selectRecipeById(id)

    if(!name){
        req.body.name = oldData.rows[0].name
    }

    if(!ingredient){
        req.body.ingredient = oldData.rows[0].ingredient
    }
    
    if(!photo){
        req.body.photo = oldData.rows[0].photo
    } else {
        const imageUrl = await cloudinary.uploader.upload(req.file.path,{folder:'food'})
        req.body.photo = imageUrl.secure_url
    }

    if(!users_id){
        req.body.users_id = oldData.rows[0].users_id
    }

    if(!category_id){
        req.body.category_id= oldData.rows[0].category_id
    }
    
    next()
}

module.exports = updateRecipeChecker