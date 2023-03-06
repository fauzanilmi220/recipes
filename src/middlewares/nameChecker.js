const nameChecker = (req,res,next) => {
    let name = req.body.name

    if(!name){
        res.status(400).json({status:400,message:`input data failed, name must be character`})
    }

    next()
}

module.exports = nameChecker