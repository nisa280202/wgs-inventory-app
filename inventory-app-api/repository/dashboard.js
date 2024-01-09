const query = require('../util/db');

const getCountGoodsRepo = async () => {
    try {
        const queryText = 'SELECT count(*) AS "count" FROM "goods" AS "goods"';
        const result = await query(queryText)
        return result.rows
    } catch (error) {
        console.log(error)
        return null
    }
}

const getCountTransactionRepo = async () => {
    try {
        const queryText = 'SELECT count(*) AS "count" FROM "transactions" AS "transaction"';
        const result = await query(queryText)
        return result.rows
    } catch (error) {
        console.log(error)
        return null
    }
}

const getCountUserRepo = async () => {
    try {
        const queryText = 'SELECT count(*) AS "count" FROM "users" AS "user"';
        const result = await query(queryText)
        return result.rows
    } catch (error) {
        console.log(error)
        return null
    }
}

const getCountCategoryRepo = async () => {
    try {
        const queryText = 'SELECT count(*) AS "count" FROM "categories" AS "category"';
        const result = await query(queryText)
        return result.rows
    } catch (error) {
        console.log(error)
        return null
    }
}

const getCountStockRepo = async () => {
    try {
        const queryText = 'SELECT name, stock FROM goods ORDER BY stock DESC LIMIT 5';
        const result = await query(queryText)
        return result.rows
    } catch (error) {
        console.log(error)
        return null
    }
}

const getCountSenderRepo = async () => {
    try {
        const queryText = 'SELECT sender, COUNT(*) AS sender_count FROM transactions GROUP BY sender ORDER BY sender_count DESC LIMIT 1';
        const result = await query(queryText)
        return result.rows
    } catch (error) {
        console.log(error)
        return null
    }
}

const getCountRecipientRepo = async () => {
    try {
        const queryText = 'SELECT recipient, COUNT(*) AS recipient_count FROM transactions GROUP BY recipient ORDER BY recipient_count DESC LIMIT 1';
        const result = await query(queryText)
        return result.rows
    } catch (error) {
        console.log(error)
        return null
    }
}

const getTotalSenderRecipientRepo = async () => {
    try {
        const queryText = 'SELECT COUNT(DISTINCT sender) AS total_senders, COUNT(DISTINCT recipient) AS total_recipients FROM transactions'
        const result = await query(queryText)
        return result.rows
    } catch (error) {
        console.log(error)
        return null
    }
}

const getMinimumStockRepo = async () => {
    try {
        const queryText = 'SELECT name, stock FROM goods ORDER BY stock ASC LIMIT 5'
        const result = await query(queryText)
        return result.rows
    } catch (error) {
        console.log(error)
        return null
    }
}

module.exports = {
    getCountGoodsRepo,
    getCountTransactionRepo,
    getCountUserRepo,
    getCountCategoryRepo,
    getCountStockRepo,
    getCountSenderRepo,
    getCountRecipientRepo,
    getTotalSenderRecipientRepo,
    getMinimumStockRepo
};
