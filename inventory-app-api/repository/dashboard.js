const query = require('../util/db');

// Fungsi untuk mendapatkan jumlah total barang
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

// Fungsi untuk mendapatkan jumlah total transaksi
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

// Fungsi untuk mendapatkan jumlah total pengguna
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

// Fungsi untuk mendapatkan jumlah total kategori
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

// Fungsi untuk mendapatkan daftar 5 barang dengan stok terbanyak
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

// Fungsi untuk mendapatkan pengirim transaksi dengan jumlah transaksi terbanyak
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

// Fungsi untuk mendapatkan penerima transaksi dengan jumlah transaksi terbanyak
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

// Fungsi untuk mendapatkan total pengirim dan penerima transaksi secara keseluruhan
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

// Fungsi untuk mendapatkan daftar 5 barang dengan stok terendah
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

// Ekspor fungsi-fungsi repository untuk digunakan dalam kode lain
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
