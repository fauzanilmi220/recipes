const express = require('express')
const router = express.Router()
const {getUsers,getDetailUsers,postUsers,deleteUsers,updateUsers} = require('../controller/usersController')
const nameChecker = require('./../middlewares/nameChecker')
const {protect} = require('./../middlewares/authProtect')
const upload = require('../middlewares/uploadPhoto')

router.get('/',getUsers)
router.get('/myProfile',protect,getDetailUsers)
router.put('/updateProfile',protect,upload.single('photo'),updateUsers)

module.exports = router