const express = require('express')
const router = express.Router()
const Users =   require('./users')
const Category =  require('./category')
const Recipe =  require('./recipes')
const Auth =   require('./auth')

router.use('/users',Users)
router.use('/category',Category)
router.use('/recipe',Recipe)
router.use('/auth',Auth)

router.get('/',function(req, res) {
    res.json({ message: 'Welcome to Food Recipe API !!!' });   
})

module.exports = router