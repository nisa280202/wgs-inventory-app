// Import fungsi-fungsi dari repository untuk berinteraksi dengan data transaksi dalam database
const { 
    getTransactionsRepo, 
    insertTransactionRepo, 
    updateTransactionRepo, 
    deleteTransactionRepo, 
    findTransactionRepo, 
    getTransactionRepo 
} = require('../repository/transaction');

// Import respons yang telah ditentukan untuk keberhasilan dan kegagalan
const { successGetResponse, failedGetResponse, failedResponse, successResponse } = require('../util/responses');

// Mendapatkan semua data transaksi
const getTransactions = async (req, res) => {
    const transactions = await getTransactionsRepo();

    // Jika tidak ada data, kirim respons kegagalan
    if (!transactions) return failedGetResponse(res);

    // Jika berhasil, kirim respons dengan data yang diperoleh
    return successGetResponse(res, transactions);
}

// Mendapatkan detail transaksi berdasarkan ID
const getTransaction = async (req, res) => {
    const id = req.params.id;
    
    // Memanggil fungsi getTransactionRepo untuk mendapatkan detail transaksi berdasarkan ID dari database
    const transactions = await getTransactionRepo(id);

    // Jika tidak ada data, kirim respons kegagalan
    if (!transactions) return failedGetResponse(res);

    // Jika berhasil, kirim respons dengan data yang diperoleh
    return successGetResponse(res, transactions);
}

// Menyisipkan data transaksi baru
const insertTransaction = async (req, res) => {
    // Mendapatkan ID pengguna dari objek request
    const user_id = req.user.id;

    // Mendapatkan data transaksi dari objek request body
    const { type, date, sender, recipient, status } = req.body;

    // Membuat objek transaksi
    const transactions = {
        user_id: user_id,
        type: type,
        date: date,
        sender: sender,
        recipient: recipient,
        status: status,
    };

    // Menyisipkan data transaksi ke dalam database
    const data = await insertTransactionRepo(transactions);

    // Jika penyisipan gagal, kirim respons kegagalan
    if (!data) return failedResponse(res);

    // Jika berhasil, kirim respons keberhasilan
    return successResponse(res);
}

// Memperbarui data transaksi berdasarkan ID
const updateTransaction = async (req, res) => {
    // Mendapatkan data transaksi dari objek request body
    const { id, type, date, sender, recipient } = req.body;

    // Membuat objek transaksi yang akan diperbarui
    const transactions = {
        id: id,
        type: type,
        date: date,
        sender: sender,
        recipient: recipient,
    };

    // Memperbarui data transaksi di dalam database
    const data = await updateTransactionRepo(transactions);

    // Jika pembaruan gagal, kirim respons kegagalan
    if (!data) return failedResponse(res);

    // Jika berhasil, kirim respons keberhasilan
    return successResponse(res);
}

// Menghapus data transaksi berdasarkan ID
const deleteTransaction = async (req, res) => {
    const id = req.params.id;

    // Menghapus data transaksi dari database
    await deleteTransactionRepo(id);

    // Mengirim respons keberhasilan setelah penghapusan
    return successResponse(res);
}

// Mencari transaksi berdasarkan rentang tanggal
const findTransaction = async (req, res) => {
    try {
        // Mendapatkan tanggal awal dan akhir dari parameter URL
        const { startDate, endDate } = req.query;

        // Memanggil fungsi findTransactionRepo untuk mencari transaksi berdasarkan rentang tanggal
        const transactions = await findTransactionRepo(startDate, endDate);

        // Jika tidak ada hasil, kirim respons kegagalan
        if (!transactions) return failedGetResponse(res);

        // Jika berhasil, kirim respons dengan data yang ditemukan
        return successGetResponse(res, transactions);
    } catch (error) {
        // Jika terjadi kesalahan selama proses pencarian, kirim respons kegagalan
        console.error(error);
        return failedResponse(res);
    }
}

// Ekspor fungsi-fungsi untuk digunakan dalam routing Express
module.exports = {
    getTransactions,
    getTransaction,
    insertTransaction,
    updateTransaction,
    deleteTransaction,
    findTransaction
};
