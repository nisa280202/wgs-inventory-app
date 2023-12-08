const query = require('../util/db')

const getTransactionsRepo = async () => {
    try {
        const queryText = 'SELECT * FROM transactions ORDER BY id ASC'
        const result = await query(queryText)

        return result.rows
    } catch (error) {
        console.log(error)
        return null
    }
}

const insertTransactionRepo = async (transactions) => {
    try {
        const queryText = 'INSERT INTO transactions (user_id, type, date, sender, recipient, status) VALUES ($1, $2, $3, $4, $5, $6)'
        const value = [transactions.user_id, transactions.type, transactions.date, transactions.sender, transactions.recipient, transactions.status]

        const result = await query(queryText, value)
        return result.rows 
    } catch (error) {
        console.log(error)
        return null
    }
}

const updateTransactionRepo = async (transactions) => {
    try {
        const queryText = 'UPDATE transactions SET user_id = $1,  type = $2, date = $3, sender = $4, recipient = $5, status = $6 WHERE id = $7'
        const value = [transactions.user_id, transactions.type, transactions.date, transactions.sender, transactions.recipient, transactions.status, transactions.id]

        const result = await query(queryText, value)
        return result.rows
    } catch (error) {
        console.log(error)
        return null
    }
}

const deleteTransactionRepo = async (id) => {
    try {
        const queryText = 'DELETE FROM transactions WHERE id = $1'
        const result = await query(queryText, [id])

        return result.rows[0]
    } catch (error) {
        console.log(error)
        return null
    }
}

module.exports = {
    getTransactionsRepo,
    insertTransactionRepo,
    updateTransactionRepo,
    deleteTransactionRepo
}