const jwt = require('jsonwebtoken')
require('dotenv').config()

const getJWTKey = (data) => {
    const token = jwt.sign(data, process.env.JWT_KEY);
    return token
}

module.exports = getJWTKey