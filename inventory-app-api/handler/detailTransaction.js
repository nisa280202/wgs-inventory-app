// Import fungsi dari repository untuk berinteraksi dengan database terkait detail transaksi
const { 
    getDetailTransactionsRepo, 
    insertDetailTransactionRepo, 
    updateDetailTransactionRepo, 
    deleteDetailTransactionRepo, 
    getDetailTransactionByIdRepo 
} = require('../repository/detailTransaction');

// Import respons yang telah ditentukan untuk keberhasilan dan kegagalan
const { successGetResponse, failedGetResponse, failedResponse, successResponse } = require('../util/responses');

// Mendapatkan semua detail transaksi
const getDetailTransactions = async (req, res) => {
    const detail_transactions = await getDetailTransactionsRepo();

    // Jika tidak ada data, kirim respons kegagalan
    if (!detail_transactions) return failedGetResponse(res);

    // Jika berhasil, kirim respons dengan data yang diperoleh
    return successGetResponse(res, detail_transactions);
}

// Mendapatkan detail transaksi berdasarkan ID transaksi
const getDetailTransactionById = async (req, res) => { 
    const transaction_id = req.params.transaction_id;
    const transaction = await getDetailTransactionByIdRepo(transaction_id);

    // Jika tidak ada data, kirim respons kegagalan
    if (!transaction) return failedGetResponse(res);

    // Jika berhasil, kirim respons dengan data yang diperoleh
    return successGetResponse(res, transaction);
}

// Menyisipkan detail transaksi baru
const insertDetailTransaction = async (req, res) => {
    const { transaction_id, stock, status, goods_id } = req.body;

    try {
        // Membuat objek detail transaksi
        const detail_transactions = {
            goods_id: goods_id,
            transaction_id: transaction_id,
            stock: stock,
            status: status
        };

        // Menyisipkan detail transaksi ke dalam database
        const data = await insertDetailTransactionRepo(detail_transactions);

        // Jika penyisipan gagal atau tidak mengembalikan data, kirim respons kegagalan
        if (!data) {
            return failedResponse(res);
        }

        // Jika berhasil, kirim respons keberhasilan
        return successResponse(res);
    } catch (error) {
        // Jika terjadi kesalahan selama proses penyisipan, kirim respons kegagalan
        console.error(error);
        return failedResponse(res);
    }
}

// Memperbarui detail transaksi berdasarkan ID
const updateDetailTransaction = async (req, res) => {
    const id = req.params.id;
    const { goods_id, transaction_id, stock, status } = req.body;

    // Membuat objek detail transaksi yang akan diperbarui
    const detail_transactions = {
        id: id,
        goods_id: goods_id,
        transaction_id: transaction_id,
        stock: stock,
        status: status
    };

    // Memperbarui detail transaksi di dalam database
    const data = await updateDetailTransactionRepo(detail_transactions);

    // Jika pembaruan gagal, kirim respons kegagalan
    if (!data) return failedResponse(res);

    // Jika berhasil, kirim respons keberhasilan
    return successResponse(res);
}

// Menghapus detail transaksi berdasarkan ID
const deleteDetailTransaction = async (req, res) => {
    const id = req.params.id;

    // Menghapus detail transaksi dari database
    await deleteDetailTransactionRepo(id);

    // Mengirim respons keberhasilan setelah penghapusan
    return successResponse(res);
}

// Ekspor fungsi-fungsi untuk digunakan dalam routing Express
module.exports = {
    getDetailTransactions,
    getDetailTransactionById,
    insertDetailTransaction,
    updateDetailTransaction,
    deleteDetailTransaction
};
