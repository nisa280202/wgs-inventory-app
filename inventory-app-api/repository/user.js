const query = require('../util/db')

const getUsersRepo = async () => {
    try {
        const queryText = 'SELECT * FROM users ORDER BY id ASC'
        const result = await query(queryText)

        return result.rows
    } catch (error) {
        console.log(error)
        return null
    }
}

const insertUserRepo = async (users) => {
    try {
        const queryText = 'INSERT INTO users (type, name, email, password) VALUES ($1, $2, $3, $4)'
        const value = [users.type, users.name, users.email, users.password]

        const result = await query(queryText, value)
        return result.rows
    } catch (error) {
        console.log(error)
        return null
    }
}

const updateUserRepo = async (users) => {
    try {
        const queryText = 'UPDATE users SET type = $1, name = $2, email = $3, password = $4 WHERE id = $5'
        const value = [users.type, users.name, users.email, users.password, users.id]

        const result = await query(queryText, value)
        return result.rows
    } catch (error) {
        console.log(error)
        return null
    }
}

const deleteUserRepo = async (id) => {
    try {
        const queryText = 'DELETE FROM users WHERE id = $1'
        const result = await query(queryText, [id])

        return result.rows[0]
    } catch (error) {
        console.log(error)
        return null
    }
}

const loginRepo = async (email) => {
    try {
        const queryText = 'SELECT * FROM users WHERE email = $1'
        const result = await query(queryText, [email])

        return result.rows[0]
    } catch (error) {
        console.log(error)
        return null
    }
}

module.exports = {
    getUsersRepo,
    insertUserRepo,
    updateUserRepo,
    deleteUserRepo,
    loginRepo
}