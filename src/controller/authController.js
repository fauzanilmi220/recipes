const {findUser,createUser,selectUsersById,verifyUser} = require('./../models/usersModel')
const {v4:uuidv4} = require('uuid')
const argon2 = require('argon2');
const generateToken = require('./../helper/generateToken')
const email = require("../middlewares/emailOTP")

const AuthController = {
    registerUser: async (req,res,next)=>{
        try {
            if(!req.body.email || !req.body.password || !req.body.name){
                res.status(404).json({status:404,message:`Please fill all data`})
            } else {
                console.log(req.body.email)
    
                let {rows:[users]} = await findUser(req.body.email)
        
                if(users){
                    res.status(401).json({status:401,message:`Email has been registered`})
                } else {
                    let id = uuidv4()
                    let otp = Math.floor(100000 + Math.random() * 900000)

                    let data = {
                        id: id,
                        email: req.body.email,
                        password: await argon2.hash(req.body.password),
                        name: req.body.name,
                        photo: 'https://res.cloudinary.com/dfwx7ogug/image/upload/v1679293948/profile/blank-profile-picture-973460_1280_omhjlv.webp',
                        otp: otp,
                        role: req.body.role || 'User'
                    }
            
                    let register = await createUser(data)
                    
                    if(!register){
                        res.status(401).json({status:401,message:`Register failed`})
                    } else {
                        try {
                            let url = `https://long-tan-monkey-veil.cyclic.app/auth/otp/${id}/${otp}`
                            let sendEmail =  email(req.body.email,otp,url,req.body.name)
                            if(sendEmail == 'email not send'){
                                res.status(404).json({status:404,message:`Register failed, Email not send`})                
                            } else {
                                res.status(201).json({status:201,message:`Register success, Please check your email`})
                            }
                        } catch (error) {
                            console.log('Register failed, ',error.message)
                            res.status(404).json({status:404,message:`Register failed`})   
                        }
                    }
                }
            }   
        } catch (error) {
            next(error)
        }                
    },
    loginUser: async (req,res,next)=>{
        try {
            if(!req.body.email || !req.body.password){
                res.status(404).json({status:404,message:`Please fill Email or Password`})
            } else {
                let {rows:[users]} = await findUser(req.body.email)

                if (!users) {
                    res.status(404).json({status:404,message:`Incorrect Email or Password`})
                } else {
                    let verifyPassword = await argon2.verify(users.password,req.body.password)

                    let data = users
                    delete data.password 
    
                    let token = generateToken(users)
            
                    if(verifyPassword){
                        if (users.valid == 1) {
                            users.token = token
                            delete users.password
                            delete users.otp
                            delete users.valid
                            delete users.created_at
                            res.status(200).json({status:200,message:`Login success, Welcome back ${users.role} ${users.name}`,data:users})   
                        } else {
                            res.status(404).json({status:404,message:`Account has not been verified`})
                        }       
                    } else {
                        res.status(404).json({status:404,message:`Login failed`})
                    }
                }
            }
        } catch (error) {
            next(error)
        }
    },
    otp: async (req,res,next)=>{
        let userId = req.params.id
        let otpUser = req.params.code
        

        if(!userId || !otpUser){
            return res.status(404).json({status:404,message:`Please input the correct OTP`})
        } else {
            let {rows:[users]} = await selectUsersById(userId)

            if(!users){
                return res.status(404).json({status:404,message:`User cannot found`})
            } else {
                console.log(users)
    
                console.log(users.otp,otpUser)

                if(users.otp == otpUser){
                    let verif =  await verifyUser(userId)
                    if(verif){
                        return res.status(201).json({status:201,message:`User verification success`})
                    } else {
                        return res.status(404).json({status:404,message:`User verification failed`})
                    }
                } else {
                    return res.status(404).json({status:404,message:`Wrong user OTP`})
                }
            }
        }
    }
}

module.exports = AuthController