// Import modul untuk menjalankan query ke database
const query = require('../util/db');

// Fungsi untuk mendapatkan semua detail transaksi dengan informasi tambahan
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

// Fungsi untuk mendapatkan detail transaksi berdasarkan ID transaksi
const getDetailTransactionByIdRepo = async (transaction_id) => {
    try {
        const queryText = 'SELECT detail_transactions.*, goods.name as goods_name FROM detail_transactions INNER JOIN goods ON detail_transactions.goods_id = goods.id WHERE detail_transactions.transaction_id = $1';
        const result = await query(queryText, [transaction_id]);
        return result.rows;
    } catch (error) {
        console.error(error);
        throw error; // Lebihkan kembali kesalahan untuk ditangkap oleh fungsi yang memanggil
    }
}

// Fungsi untuk menyisipkan detail transaksi baru ke dalam database
const insertDetailTransactionRepo = async (detail_transactions) => {
    try {
        // Mengecek keberadaan barang berdasarkan ID
        const queryTextCheckExistence = `
            SELECT COUNT(*)
            FROM goods
            WHERE id = $1
        `;
        const valuesCheckExistence = [detail_transactions.goods_id];

        const existenceResult = await query(queryTextCheckExistence, valuesCheckExistence);
        const isGoodsExist = existenceResult.rows[0].count > 0;

        // Jika barang belum ada, buat query untuk menyisipkan barang baru
        if (!isGoodsExist) {
            const insertGoodsQuery = `
                INSERT INTO goods(id, stock)
                VALUES ($1, $2)
            `;
            const insertGoodsValues = [detail_transactions.goods_id, detail_transactions.stock];

            await query(insertGoodsQuery, insertGoodsValues);
        }

        // Setelah penyisipan atau jika barang sudah ada, menyisipkan detail transaksi ke dalam tabel detail_transactions
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

        // Update stok di tabel goods berdasarkan status transaksi
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

        return insertedRow;
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Fungsi untuk memperbarui detail transaksi berdasarkan ID
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

// Fungsi untuk menghapus detail transaksi berdasarkan ID
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

// Ekspor fungsi-fungsi repository untuk digunakan dalam kode lain
module.exports = {
    getDetailTransactionsRepo,
    getDetailTransactionByIdRepo,
    insertDetailTransactionRepo,
    updateDetailTransactionRepo,
    deleteDetailTransactionRepo
}
