// Import fungsi-fungsi repository terkait dasbor (dashboard)
const { getCountGoodsRepo, getCountTransactionRepo, getCountUserRepo, getCountCategoryRepo, getCountStockRepo, getCountSenderRepo, getCountRecipientRepo, getTotalSenderRecipientRepo, getMinimumStockRepo } = require('../repository/dashboard');

// Import respons berhasil dan gagal dari utilitas respons
const { failedGetResponse, successGetResponse } = require('../util/responses');

// Fungsi untuk mendapatkan jumlah barang (goods)
const getCountGoods = async (req, res) => { 
    const countGoods = await getCountGoodsRepo();
    if (!countGoods) return failedGetResponse(res);

    return successGetResponse(res, countGoods);
}

// Fungsi untuk mendapatkan jumlah transaksi
const getCountTransaction = async (req, res) => { 
    const countTransaction = await getCountTransactionRepo();
    if (!countTransaction) return failedGetResponse(res);

    return successGetResponse(res, countTransaction);
}

// Fungsi untuk mendapatkan jumlah pengguna (user)
const getCountUser = async (req, res) => { 
    const countUser = await getCountUserRepo();
    if (!countUser) return failedGetResponse(res);

    return successGetResponse(res, countUser);
}

// Fungsi untuk mendapatkan jumlah kategori
const getCountCategory = async (req, res) => { 
    const countCategory = await getCountCategoryRepo();
    if (!countCategory) return failedGetResponse(res);

    return successGetResponse(res, countCategory);
}

// Fungsi untuk mendapatkan jumlah stok
const getCountStock = async (req, res) => { 
    const countStock = await getCountStockRepo();
    if (!countStock) return failedGetResponse(res);

    return successGetResponse(res, countStock);
}

// Fungsi untuk mendapatkan jumlah pengirim (sender)
const getCountSender = async (req, res) => { 
    const countSender = await getCountSenderRepo();
    if (!countSender) return failedGetResponse(res);

    return successGetResponse(res, countSender);
}

// Fungsi untuk mendapatkan jumlah penerima (recipient)
const getCountRecipient = async (req, res) => { 
    const countRecipient = await getCountRecipientRepo();
    if (!countRecipient) return failedGetResponse(res);

    return successGetResponse(res, countRecipient);
}

const getTotalSenderRecipient = async (req, res) => { 
    const totalSenderRecipient = await getTotalSenderRecipientRepo();
    if (!totalSenderRecipient) return failedGetResponse(res);

    return successGetResponse(res, totalSenderRecipient);
}

const getMinimumStock = async (req, res) => { 
    const minimumStock = await getMinimumStockRepo();
    if (!minimumStock) return failedGetResponse(res);

    return successGetResponse(res, minimumStock);
}

// Ekspor semua fungsi agar dapat digunakan di tempat lain
module.exports = {
    getCountGoods,
    getCountTransaction,
    getCountUser,
    getCountCategory,
    getCountStock,
    getCountSender,
    getTotalSenderRecipient,
    getCountRecipient,
    getMinimumStock
}
