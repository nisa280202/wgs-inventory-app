const query = require('../util/db')

const getAllDetailGoodsRepo = async () => {
    try {
        const queryText = 'SELECT * FROM detail_goods ORDER BY id ASC'
        const result = await query(queryText)

        return result.rows
    } catch (error) {
        console.log(error)
        return null
    }
}

const insertDetailGoodsRepo = async (detail_goods) => {
    try {
        const queryText = 'INSERT INTO detail_goods(goods_id, date_in, date_out, stock, supplier) VALUES ($1, $2, $3, $4, $5)'
        const value = [detail_goods.goods_id, detail_goods.date_in, detail_goods.date_out, detail_goods.stock, detail_goods.supplier]
        
        const result = await query(queryText, value)
        return result.rows
    } catch (error) {
        console.log(error)
        return null
    }
}

const updateDetailGoodsRepo = async (detail_goods) => {
    try {
        const queryText = 'UPDATE detail_goods SET goods_id = $1, date_in = $2, date_out = $3, stock = $4, supplier = $5 WHERE id = $6'
        const value = [detail_goods.goods_id, detail_goods.date_in, detail_goods.date_out, detail_goods.stock, detail_goods.supplier, detail_goods.id]

        const result = await query(queryText, value)
        return result.rows
    } catch (error) {
        console.log(error)
        return null
    }
}

const deleteDetailGoodsRepo = async (id) => {
    try {
        const queryText = 'DELETE FROM detail_goods WHERE id = $1'
        const result = await query(queryText, [id])
        
        return result.rows[0]
    } catch (error) {
        console.log(error)
        return null
    }
}

module.exports = {
    getAllDetailGoodsRepo,
    insertDetailGoodsRepo,
    updateDetailGoodsRepo,
    deleteDetailGoodsRepo
}