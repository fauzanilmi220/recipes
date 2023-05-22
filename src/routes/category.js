const express = require('express')
const router = express.Router()
const {getCategory,getDetailCategory,postCategory,deleteCategory,updateCategory} = require('../controller/categoryController')
const nameChecker = require('./../middlewares/nameChecker')

router.get('/',getCategory)
router.get('/:id',getDetailCategory)
router.post('/',nameChecker,postCategory)
router.delete('/delete/:id',deleteCategory)
router.put('/:id',nameChecker,updateCategory)

module.exports = router