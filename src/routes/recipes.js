const express = require('express')
const router = express.Router()
const {inputRecipes,getRecipes, getAllRecipes, putDataRecipes, deleteDataRecipe} = require('../controller/recipes')

router.get('/',getAllRecipes)
router.get('/',getRecipes)
router.post('/',inputRecipes)
router.put('/:id',putDataRecipes)
router.delete('/:id',deleteDataRecipe)

module.exports = router