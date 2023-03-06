const express = require('express')
const router = express.Router()
const {getData,getDetail,postData,putData,deleteData} = require('./../controller/users')
const nameChecker = require('./../middlewares/nameChecker')

router.get('/',getData)
router.get('/:id',getDetail)
router.post('/',nameChecker,postData)
router.put('/:id',putData)
router.delete('/:id',deleteData)

module.exports = router