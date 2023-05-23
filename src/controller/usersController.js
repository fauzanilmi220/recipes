const {selectUsers,insertUsers,selectUsersById,selectUsersByName,deleteUsersById,updateUsers} = require('../models/usersModel')

const UsersController = {
    getDetailUsers: async (req,res,next)=>{
        try {
            let id = req.payload.id
            let data = await selectUsersById(id)
        
            if(data.rows[0]){
                res.status(200).json({status:200,message:`data user found`,data:data.rows})
            } else {
                res.status(400).json({status:400,message:`data user not found`})
            }
        } catch (error) {
            next(error)
        }
    },
    getUsers: async (req,res,next)=>{
        try {
            let showUser = await selectUsers()
            if(!showUser.rows[0]){
                res.status(400).json({status:400,message:`data user not found`})
            } else {
                res.status(200).json({status:200,message:`data found`,data:showUser.rows})
            }
        } catch (error) {
            next(error)
        }
    },

    postUsers: async (req,res,next)=>{
        try {
            let name = req.body.name
            let input = null
    
            input = await insertUsers(name)
    
            let checkData = await selectUsersByName(name)
    
            if(!checkData.rows[0]){
                res.status(404).json({status:404,message:`data input failed`})
            } else {
                res.status(200).json({status:200,message:`data input successfully`,data:checkData.rows})
            }   
        } catch (error) {
            next(error)
        }
    },

    deleteUsers: async (req,res,next)=>{
        try {
            let id = req.params.id
            let dlt = null
    
            let checkData = await selectUsersById(id)
            if (!checkData.rows[0]) {
                res.status(404).json({status:404,message:`sorry id is not registered`})
            } else {
                dlt = await deleteUsersById(id)
                checkData = await selectUsersById(id)
                res.status(200).json({status:200,message:`data delete successfully`,data:checkData.rows})
            }   
        } catch (error) {
            next(error)
        }
    },
    
    updateUsers: async (req,res,next)=>{
        try {
            let id = req.payload.id
            let name = req.body.name
            let email = req.body.email
            let photo = req.body.photo
    
            let checkData = await selectUsersById(id)
            if (!checkData.rows[0]) {
                res.status(404).json({status:404,message:`id invalid`})
            } else {
                await updateUsers(id,name,email,photo)
                let newData = await selectUsersById(id)
                res.status(200).json({status:200,message:`update data successfully`,data:newData.rows})
            }   
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UsersController