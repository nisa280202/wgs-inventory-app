const query = require('../util/db')
// const logActivityRepo = require('./log')

const getDetailTransactionsRepo = async () => {
    try {
        const queryText = 'SELECT detail_transactions.*, transactions.id as transaction_id, goods.name as goods_name FROM detail_transactions INNER JOIN transactions ON detail_transactions.transaction_id = transactions.id INNER JOIN goods ON detail_transactions.goods_id = goods.id ORDER BY detail_transactions.id DESC';
        const result = await query(queryText);

        return result.rows;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getDetailTransactionByIdRepo = async (transaction_id) => {
    try {
        const queryText = 'SELECT detail_transactions.*, goods.name as goods_name FROM detail_transactions INNER JOIN goods ON detail_transactions.goods_id = goods.id WHERE detail_transactions.transaction_id = $1';
        const result = await query(queryText, [transaction_id]);
        return result.rows;
    } catch (error) {
        console.error(error);
        throw error; // Rethrow the error to be caught by the calling function
    }
}

const insertDetailTransactionRepo = async (detail_transactions) => {
    try {
        const queryTextCheckExistence = `
            SELECT COUNT(*)
            FROM goods
            WHERE id = $1
        `;
        const valuesCheckExistence = [detail_transactions.goods_id];

        const existenceResult = await query(queryTextCheckExistence, valuesCheckExistence);
        const isGoodsExist = existenceResult.rows[0].count > 0;

        if (!isGoodsExist) {
            // Jika goods_id belum ada, buat query untuk insert ke goods
            const insertGoodsQuery = `
                INSERT INTO goods(id, stock)
                VALUES ($1, $2)
            `;
            const insertGoodsValues = [detail_transactions.goods_id, detail_transactions.stock];

            await query(insertGoodsQuery, insertGoodsValues);
        }

        // Setelah insert atau jika goods_id sudah ada, insert ke detail_transactions
        const queryText = `
            INSERT INTO detail_transactions(goods_id, transaction_id, stock, status)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const values = [
            detail_transactions.goods_id,
            detail_transactions.transaction_id,
            detail_transactions.stock,
            detail_transactions.status
        ];

        const result = await query(queryText, values);
        const insertedRow = result.rows[0];

        // Update stock in goods table based on the status
        // Update stock in goods table based on the status
        const updateQuery = `
            UPDATE goods
            SET stock = CASE 
                WHEN $1 = 0 THEN stock + $2
                WHEN $1 = 1 THEN stock - $2
                ELSE stock
            END
            WHERE id = $3
            RETURNING *
        `;

        const updateValues = [detail_transactions.status, detail_transactions.stock, detail_transactions.goods_id];

        const updateResult = await query(updateQuery, updateValues);

        if (updateResult.rows.length > 0) {
            console.log('Update successful. Updated goods:', updateResult.rows[0]);
        } else {
            console.log('Update failed or did not affect any rows.');
        }

        // await logActivityRepo(userId, 'create', 'detail_transaction', `Detail Transaction ID: ${insertedRow.id}, Goods ID: ${detail_transactions.goods_id}, Transaction ID: ${detail_transactions.transaction_id}`);

        return insertedRow;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const updateDetailTransactionRepo = async (detail_transactions) => {
    try {
        const queryText = 'UPDATE detail_transactions SET goods_id = $1, transaction_id = $2, stock = $3, status = $4 WHERE id = $5'
        const value = [detail_transactions.goods_id, detail_transactions.transaction_id, detail_transactions.stock, detail_transactions.status, detail_transactions.id]
        const result = await query(queryText, value)

        // await logActivityRepo(userId, 'update', 'detail_transaction', `Detail Transaction ID: ${detail_transactions.id}, Goods ID: ${detail_transactions.goods_id}, Transaction ID: ${detail_transactions.transaction_id}`);

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

        // await logActivityRepo(userId, 'delete', 'detail_transaction', `Detail Transaction ID: ${deletedDetailTransaction.id}, Goods ID: ${deletedDetailTransaction.goods_id}, Transaction ID: ${deletedDetailTransaction.transaction_id}`);

        return result.rows[0]
    } catch (error) {
        console.log(error)
        return null
    }
}

module.exports = {
    getDetailTransactionsRepo,
    getDetailTransactionByIdRepo,
    insertDetailTransactionRepo,
    updateDetailTransactionRepo,
    deleteDetailTransactionRepo
}