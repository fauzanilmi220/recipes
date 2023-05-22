const {selectRecipe,insertRecipe,selectRecipeByUserId,selectRecipeById,deleteRecipeById,updateRecipe} = require('../models/recipesModel')
const cloudinary = require("../config/cloudinary")

const recipeController = {
    getDetailRecipe: async (req,res,next)=>{
        try {
            let {id} = req.params

            let dataCheck = await selectRecipeById(id)
        
            if(dataCheck.rows[0]){
                res.status(200).json({status:200,message:`data recipe found`,data:dataCheck.rows})
            } else {
                res.status(400).json({status:400,message:`data recipe not found`})
            }   
        } catch (error) {
            next(error)
        }
    },
    getUserRecipe: async (req,res,next)=>{
        try {
            let {search,sortby,sort} = req.query
            let data = {
                search: search || '',
                sortby: sortby || 'created_at',
                sort: sort || 'ASC',
                id: req.payload.id
            }
            let dataCheck = await selectRecipeByUserId(data)
        
            if(dataCheck.rows[0]){
                res.status(200).json({status:200,message:`data recipe found`,data:dataCheck.rows})
            } else {
                res.status(400).json({status:400,message:`data recipe not found`})
            }   
        } catch (error) {
            next(error)
        }
    },
    getRecipe: async (req,res,next)=>{
        try {
            let {search,sortby,sort,page,limit} = req.query
            let data = {
                search: search || '',
                sortby: sortby || 'created_at',
                sort: sort || 'ASC',
                page: page,
                limit: limit
            }
    
            let showUser = await selectRecipe(data)
            if(!showUser.rows[0]){
                res.status(400).json({status:400,message:`data recipe not found`})
            } else {
                res.status(200).json({status:200,message:`data found`,data:showUser.rows})
            }   
        } catch (error) {
            next(error)
        }
    },
    postRecipe: async (req,res,next)=>{
        try {
            if (req.file) {
                console.log(req.file.mimetype,typeof(req.file.mimetype))
                if (req.file.mimetype != 'image/png' && req.file.mimetype != 'image/jpg' && req.file.mimetype != 'image/jpeg' && req.file.mimetype != 'image/jfif') {
                    res.status(404).json({status:404,message:`Your file is not png or jpg type`})
                } else {
                    const imageUrl = await cloudinary.uploader.upload(req.file.path,{folder:'food'})

                    console.log('imageUrl', imageUrl)
        
                    if(!imageUrl){
                        res.status(404).json({status:404,message:`input data failed, failed to upload photo`})
                    } else {
                        let data = {}
                        data.name = req.body.name
                        data.photo = imageUrl.secure_url
                        data.users_id = req.payload.id
                        data.ingredient = req.body.ingredient
                        data.category_id = req.body.category_id
                        
                        let result = await insertRecipe(data)
            
                        data.search = data.name
                        data.sortby = 'created_at'
                        data.sort = 'DESC'
                        data.page = 1
                        data.limit = 1
            
                        let cekData = await selectRecipe(data)
                
                        if(!cekData.rows[0]){
                            res.status(404).json({status:404,message:`Input data failed`})
                        } else {
                            res.status(200).json({status:200,message:`Input data success`,data:cekData.rows}) 
                        }
                    }
                }
            } 
            else {
                let data = {}
                data.name = req.body.name
                data.photo = 'https://res.cloudinary.com/dfwx7ogug/image/upload/v1677589653/food/image_404_kto6wz.jpg'
                data.users_id = req.payload.id
                data.ingredient = req.body.ingredient
                data.category_id = req.body.category_id
                
                let result = await insertRecipe(data)
    
                data.search = data.name
                data.sortby = 'created_at'
                data.sort = 'DESC'
                data.page = 1
                data.limit = 1
    
                let cekData = await selectRecipe(data)
        
                if(!cekData.rows[0]){
                    res.status(404).json({status:404,message:`Input data failed`})
                } else {
                    res.status(200).json({status:200,message:`Input data success`,data:cekData.rows}) 
                }
            } 
        } catch (error) {
            next(error)
        }
    },
    deleteRecipe: async (req,res,next)=>{
        try {
            let userId = req.payload.id
            let id = req.params.id
            let dlt = null
    
            let checkData = await selectRecipeById(id)
            if (!checkData.rows[0]) {
                res.status(404).json({status:404,message:`id invalid`})
            } else {
                if (userId == checkData.rows[0].users_id) {
                    dlt = await deleteRecipeById(id)
                    checkData = await selectRecipeById(id)
                    res.status(200).json({status:200,message:`data delete successfully`,data:checkData.rows})   
                } else {
                    res.status(401).json({status:401,message:`this data isn't your`})
                }
            }
        } catch (error) {
            next(error)
        }
    },
    updateRecipe: async (req,res,next)=>{
        try {
            let id = req.params.id
            let name = req.body.name
            let ingredient = req.body.ingredient
            let photo = req.body.photo
            let users_id = req.body.users_id
            let category_id = req.body.category_id
            let data = {name,ingredient,photo,users_id,category_id}
            let userId = req.payload.id
    
            let checkData = await selectRecipeById(id)
    
            if (!checkData.rows[0]) {
                res.status(404).json({status:404,message:`id invalid`})
            } else {
                if (userId == checkData.rows[0].users_id) {
                    await updateRecipe(id,data)
                    let newData = await selectRecipeById(id)
                    res.status(200).json({status:200,message:`update data successfully`,data:newData.rows})
                } else {
                    res.status(401).json({status:401,message:`this data isn't your`})
                }
            }   
        } catch (error) {
            next(error)
        }
    }
}

module.exports = recipeController