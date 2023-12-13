const argon2 = require('argon2') 

const hashPassword = async (password) => {
    try {
        const hashedPassword = await argon2.hash(password)
        return hashedPassword
    } catch (error) {
        console.error(error)
        return ''
    }
}

const getHashedPassword = async (password) => {
    try {
        const hashedPassword = await hashPassword(password)
        return hashedPassword
    } catch (error) {
        console.error(error)
        return ''
    }
}

const comparedPassword = async (password, hashedPassword) => {
    try {
        const isMatch = await argon2.verify(hashedPassword, password)
        return isMatch
    } catch (error) {
        console.error(error)
        return false
    }
}

module.exports = {
    hashPassword,
    getHashedPassword,
    comparedPassword
}