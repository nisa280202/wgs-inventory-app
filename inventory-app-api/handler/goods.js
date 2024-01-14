// Import fungsi-fungsi dari repository untuk berinteraksi dengan data barang (goods) dalam database
const { 
    getAllGoodsRepo, 
    insertGoodsRepo, 
    updateGoodsRepo, 
    deleteGoodsRepo, 
    findGoodsRepo, 
    getGoodsRepo 
} = require('../repository/goods');

// Import respons yang telah ditentukan untuk keberhasilan dan kegagalan
const { successGetResponse, failedGetResponse, failedResponse, successResponse } = require('../util/responses');

// Mendapatkan semua data barang
const getAllGoods = async (req, res) => {
    const goods = await getAllGoodsRepo();

    // Jika tidak ada data, kirim respons kegagalan
    if (!goods) return failedGetResponse(res);

    // Jika berhasil, kirim respons dengan data yang diperoleh
    return successGetResponse(res, goods);
}

// Mendapatkan detail barang berdasarkan ID
const getGoods = async (req, res) => { 
    // Mengambil nilai ID dari parameter URL
    const id = req.params.id;

    // Memanggil fungsi getGoodsRepo untuk mendapatkan detail barang berdasarkan ID dari database
    const goods = await getGoodsRepo(id);

    // Jika tidak ada data, kirim respons kegagalan
    if (!goods) return failedGetResponse(res);

    // Jika berhasil, kirim respons dengan data yang diperoleh
    return successGetResponse(res, goods);
}

// Menyisipkan data barang baru
const insertGoods = async (req, res) => {
    const { type_id, name, category_id, unit, price, stock } = req.body;
    const picture = req.file ? req.file.filename : null;

    const goods = {
        type_id: type_id,
        name: name,
        category_id: category_id,
        picture: picture,
        unit: unit,
        price: price,
        stock: stock
    };

    // Menyisipkan data barang ke dalam database
    const data = await insertGoodsRepo(goods);

    // Jika penyisipan gagal, kirim respons kegagalan
    if (!data) return failedResponse(res);

    // Jika berhasil, kirim respons keberhasilan
    return successResponse(res);
}

// Memperbarui data barang berdasarkan ID
const updateGoods = async (req, res) => {
    const { id, type_id, name, category_id, unit, price, stock } = req.body;
    const picture = req.file ? req.file.filename : null;

    const goods = {
        id: id,
        type_id: type_id,
        name: name,
        category_id: category_id,
        picture: picture,
        unit: unit,
        price: price,
        stock: stock
    };

    // Memperbarui data barang di dalam database
    const data = await updateGoodsRepo(goods);

    // Jika pembaruan gagal, kirim respons kegagalan
    if (!data) return failedResponse(res);

    // Jika berhasil, kirim respons keberhasilan
    return successResponse(res);
}

// Menghapus data barang berdasarkan ID
const deleteGoods = async (req, res) => {
    const id = req.params.id;

    // Menghapus data barang dari database
    await deleteGoodsRepo(id);

    // Mengirim respons keberhasilan setelah penghapusan
    return successResponse(res);
}

// Mencari barang berdasarkan kata kunci (nama atau ID kategori)
const findGoods = async (req, res) => {
    try {
        // Mendapatkan kata kunci dari parameter URL, atau menggunakan nilai default jika tidak ada
        const keyword = req.query.name || req.query.category_id || "";

        // Memanggil fungsi findGoodsRepo untuk mencari barang berdasarkan kata kunci
        const result = await findGoodsRepo(keyword);

        // Jika tidak ada hasil, kirim respons kegagalan dengan pesan khusus
        if (result.length === 0) {
            return failedGetResponse(res, 'No goods found for the provided keyword.');
        }

        // Jika berhasil, kirim respons dengan data yang ditemukan
        return successGetResponse(res, result);
    } catch (error) {
        // Jika terjadi kesalahan selama proses pencarian, kirim respons kegagalan
        console.error(error);
        return failedResponse(res);
    }
}

// Ekspor fungsi-fungsi untuk digunakan dalam routing Express
module.exports = {
    getAllGoods,
    getGoods,
    insertGoods,
    updateGoods,
    deleteGoods,
    findGoods
};
