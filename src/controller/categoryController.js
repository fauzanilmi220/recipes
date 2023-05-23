const {selectCategory,insertCategory,selectCategoryById,selectCategoryByName,deleteCategoryById,updateCategory} = require('../models/categoryModel')

const CategoryController = {
    getDetailCategory: async (req,res,next)=>{
        try {
            let id = req.params.id
            let data = await selectCategoryById(id)
        
            if(data.rows[0]){
                res.status(200).json({status:200,message:`data category found`,data:data.rows})
            } else {
                res.status(400).json({status:400,message:`data category not found`})
            }
        } catch (error) {
            next(error)
        }
    },
    getCategory: async (req,res,next)=>{
        try {
            let showCategory = await selectCategory()
            if(!showCategory.rows[0]){
                res.status(400).json({status:400,message:`data category not found`})
            } else {
                res.status(200).json({status:200,message:`data found`,data:showCategory.rows})
            }   
        } catch (error) {
            next(error)
        }
    },

    postCategory: async (req,res,next)=>{
        try {
            let name = req.body.name
            let input = 0
    
            input = await insertCategory(name)
    
            let checkData = await selectCategoryByName(name)
    
            if(!checkData.rows[0]){
                res.status(404).json({status:404,message:`data input failed`})
            } else {
                res.status(200).json({status:200,message:`data input successfully`,data:checkData.rows})
            }   
        } catch (error) {
            next(error)
        }
    },

    deleteCategory: async (req,res,next)=>{
        try {
            let id = req.params.id
            let dlt = null
    
            if (!id) {
                res.status(404).json({status:404,message:`id not input`})
            } else {
                let checkData = await selectCategoryById(id)
                if (!checkData.rows[0]) {
                    res.status(404).json({status:404,message:`id invalid`})
                } else {
                    dlt = await deleteCategoryById(id)
                    checkData = await selectCategoryById(id)
                    res.status(200).json({status:200,message:`data delete successfully`,data:checkData.rows})
                }
            }   
        } catch (error) {
            next(error)
        }
    },
    
    updateCategory: async (req,res,next)=>{
        try {
            let id = req.params.id
            let name = req.body.name
    
            let checkData = await selectCategoryById(id)
            if (!checkData.rows[0]) {
                res.status(404).json({status:404,message:`id invalid`})
            } else {
                await updateCategory(id,name)
                let newData = await selectCategoryById(id)
                res.status(200).json({status:200,message:`data update successfully`,data:newData.rows})
            }   
        } catch (error) {
            next(error)
        }
    }
}

module.exports = CategoryController