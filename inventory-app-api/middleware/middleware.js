const jwt = require('jsonwebtoken')
const unauthorizedResponse = require('../util/responses')
require('dotenv').config()

const middleware = (userType) => {
    return (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        console.log(token)

        if (!token) {
            return unauthorizedResponse(res)
        }

        jwt.verify(token, process.env.JWT_KEY, (error, user) => {
            if (error) {
                return unauthorizedResponse(res)
            }

            if (!userType.includes(user.type)) {
                return unauthorizedResponse(res)
            }

            req.user = user
            next()
        })
    }
}

module.exports = {
    middleware
}
