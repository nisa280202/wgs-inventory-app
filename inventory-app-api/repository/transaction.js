const query = require('../util/db');

// Fungsi untuk mendapatkan semua transaksi dengan informasi pengguna terkait
const getTransactionsRepo = async () => {
    try {
        const queryText = 'SELECT transactions.*, users.name as user_name FROM transactions INNER JOIN users ON transactions.user_id = users.id ORDER BY transactions.id DESC';
        const result = await query(queryText);

        return result.rows;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Fungsi untuk mendapatkan detail transaksi berdasarkan ID
const getTransactionRepo = async (id) => {
    try {
        const queryText = 'SELECT * FROM transactions WHERE id = $1'
        const result = await query(queryText, [id])
        return result.rows[0]
    } catch (error) {
        console.log(error)
        return null
    }
}

// Fungsi untuk menambahkan transaksi baru ke database
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

// Fungsi untuk memperbarui informasi transaksi berdasarkan ID
const updateTransactionRepo = async (transactions) => {
    try {
        let updateQuery = 'UPDATE transactions SET';
        let index = 1; // Start index for parameter placeholders

        if (transactions.type) {
            updateQuery += ` type = $${index}`;
            index++;
        }
        if (transactions.date) {
            updateQuery += `${index > 1 ? ',' : ''} date = $${index}`;
            index++;
        }
        if (transactions.sender) {
            updateQuery += `${index > 1 ? ',' : ''} sender = $${index}`;
            index++;
        }
        if (transactions.recipient) {
            updateQuery += `${index > 1 ? ',' : ''} recipient = $${index}`;
            index++;
        }

        updateQuery += ` WHERE id = $${index}`;
        console.log(updateQuery);

        const values = []
        if (transactions.type) values.push(transactions.type)
        if (transactions.date) values.push(transactions.date)
        if (transactions.sender) values.push(transactions.sender)
        if (transactions.recipient) values.push(transactions.recipient)
        values.push(transactions.id)

        console.log(values);
        const result = await query(updateQuery, values);

        return result.rows;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Fungsi untuk menghapus transaksi berdasarkan ID
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

// Fungsi untuk mencari transaksi berdasarkan rentang tanggal
const findTransactionRepo = async (startDate, endDate) => {
    try {
        const queryText = 'SELECT * FROM transactions WHERE date BETWEEN $1 AND $2'
        const values = [startDate, endDate]
        const result = await query(queryText, values)

        return result.rows
    } catch (error) {
        console.log(error)
        return null
    }
}

// Ekspor fungsi-fungsi repository untuk digunakan dalam kode lain
module.exports = {
    getTransactionsRepo,
    getTransactionRepo,
    insertTransactionRepo,
    updateTransactionRepo,
    deleteTransactionRepo,
    findTransactionRepo
}
