const query = require('../util/db')

const getDetailTransactionsRepo = async () => {
    try {
        const queryText = 'SELECT * FROM detail_transactions ORDER BY id ASC'
        const result = await query(queryText)

        return result.rows
    } catch (error) {
        console.log(error)
        return null
    }
}

const insertDetailTransactionRepo = async (detail_transactions) => {
    try {
        const queryText = 'INSERT INTO detail_transactions(goods_id, transaction_id, stock, status) VALUES ($1, $2, $3, $4)'
        const value = [detail_transactions.goods_id, detail_transactions.transaction_id, detail_transactions.stock, detail_transactions.status]

        const result = await query(queryText, value)
        return result.rows
    } catch (error) {
        console.log(error)
        return null
    }
}

const updateDetailTransactionRepo = async (detail_transactions) => {
    try {
        const queryText = 'UPDATE detail_transactions SET goods_id = $1, transaction_id = $2, stock = $3, status = $4 WHERE id = $5'
        const value = [detail_transactions.goods_id, detail_transactions.transaction_id, detail_transactions.stock, detail_transactions.status, detail_transactions.id]

        const result = await query(queryText, value)
        return result.rows
    } catch (error) {
        console.log(error)
        return null
    }
}

const deleteDetailTransactionRepo = async (id) => {
    try {
        const queryText = 'DELETE FROM detail_transactions WHERE id = $1'
        const result = await query(queryText, [id])

        return result.rows[0]
    } catch (error) {
        console.log(error)
        return null
    }
}

module.exports = {
    getDetailTransactionsRepo,
    insertDetailTransactionRepo,
    updateDetailTransactionRepo,
    deleteDetailTransactionRepo
}