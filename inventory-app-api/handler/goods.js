const { getAllGoodsRepo, insertGoodsRepo, updateGoodsRepo, deleteGoodsRepo, findGoodsRepo, getGoodsRepo } = require('../repository/goods')
const { successGetResponse, failedGetResponse, failedResponse, successResponse } = require('../util/responses')

const getAllGoods = async (req, res) => {
    const goods = await getAllGoodsRepo()
    if (!goods) return failedGetResponse(res)

    return successGetResponse(res, goods)
}

// Fungsi untuk mendapatkan detail goods berdasarkan ID
const getGoods = async (req, res) => { 
    // Mengambil nilai ID dari parameter yang ada dalam URL
    const id = req.params.id
    // Memanggil fungsi getGoodsRepo untuk mendapatkan detail kontak berdasarkan ID dari database
    const goods = await getGoodsRepo(id)
    // Memeriksa apakah kontak berhasil diperoleh
    if (!goods) return failedGetResponse(res)

    // Menanggapi permintaan HTTP dengan data kontak yang berhasil diperoleh
    return successGetResponse(res, goods)
}

const insertGoods = async (req, res) => {
    const { type_id, name, category_id, unit, price, stock } = req.body
    const picture = req.file ? req.file.filename : null

    const goods = {
        type_id: type_id,
        name: name,
        category_id: category_id,
        picture: picture,
        unit: unit,
        price: price,
        stock: stock
    }

    const data = await insertGoodsRepo(goods)
    if (!data) return failedResponse(res)

    return successResponse(res)
}

const updateGoods = async (req, res) => {
    // const id = req.params.id
    const { id, type_id, name, category_id, unit, price, stock } = req.body
    const picture = req.file ? req.file.filename : null
    const goods = {
        id: id,
        type_id: type_id,
        name: name,
        category_id: category_id,
        picture: picture,
        unit: unit,
        price: price,
        stock: stock
    }

    const data = await updateGoodsRepo(goods)
    if (!data) return failedResponse(res)

    return successResponse(res)
}

const deleteGoods = async (req, res) => {
    const id = req.params.id
    await deleteGoodsRepo(id)

    return successResponse(res)
}

const findGoods = async (req, res) => {
    try {
        const keyword = req.query.name || req.query.category_id || ""; // Add default value for the keyword
        const result = await findGoodsRepo(keyword);

        if (result.length === 0) {
            return failedGetResponse(res, 'No goods found for the provided keyword.');
        }
        return successGetResponse(res, result);
    } catch (error) {
        console.error(error);
        return failedResponse(res);
    }
}

module.exports = {
    getAllGoods,
    getGoods,
    insertGoods,
    updateGoods,
    deleteGoods,
    findGoods
}