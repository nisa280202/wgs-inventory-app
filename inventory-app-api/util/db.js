const Pool = require('pg').Pool

require('dotenv').config()

const util = require('util')

const pool = new Pool({
    user: process.env.USERNAME_DB,
    password: process.env.PASSWORD_DB,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.PORT_DB
})

const query = util.promisify(pool.query).bind(pool) 

module.exports = query