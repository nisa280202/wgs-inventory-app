const query = require('../util/db')

const getAllGoodsRepo = async () => {
    try {
        const queryText = 'SELECT * FROM goods ORDER BY id ASC'
        const result = await query(queryText)
        
        return result.rows
    } catch (error) {
        console.log(error)
        return null
    }
}

const insertGoodsRepo = async (goods) => {
    try {
        const queryText = 'INSERT INTO goods(type, name, category, picture, unit, price) VALUES ($1, $2, $3, $4, $5, $6)'
        const value = [goods.type, goods.name, goods.category, goods.picture, goods.unit, goods.price]
        
        const result = await query(queryText, value)
        return result.rows
    } catch (error) {
        console.log(error)
        return null
    }
}

const updateGoodsRepo = async (goods) => {
    try {
        const queryText = 'UPDATE goods SET type = $1, name = $2, category = $3, picture = $4, unit = $5, price = $6 WHERE id = $7'
        const value = [goods.type, goods.name, goods.category, goods.picture, goods.unit, goods.price, goods.id]

        const result = await query(queryText, value)
        return result.rows
    } catch (error) {
        console.log(error)
        return null
    }
}

const deleteGoodsRepo = async (id) => {
    try {
        const queryText = 'DELETE FROM goods WHERE id = $1'
        const result = await query(queryText, [id])

        return result.rows[0]
    } catch (error) {
        console.log(error)
        return null
    }
}

const findGoodsRepo = async (keyword) => {
    try {
        const queryText = 'SELECT * FROM goods WHERE name ILIKE $1 OR category ILIKE $1'
        const result = await query(queryText, [`%${keyword}%`])

        return result.rows
    } catch (error) {
        console.log(error)
        return null
    }
}

module.exports = {
    getAllGoodsRepo,
    insertGoodsRepo,
    updateGoodsRepo,
    deleteGoodsRepo,
    findGoodsRepo
}