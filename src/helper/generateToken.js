const jwt = require('jsonwebtoken')
const {verify} = require('argon2')

let key = process.env.JWT_KEY

const generateToken = (payload) => {
    const verifyOpts = {
        expiresIn: '360h'
    }
    const token = jwt.sign(payload,key,verifyOpts)
    return token
}

module.exports = generateToken