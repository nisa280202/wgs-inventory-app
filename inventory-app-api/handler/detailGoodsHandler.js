const { getAllDetailGoodsRepo, insertDetailGoodsRepo, updateDetailGoodsRepo, deleteDetailGoodsRepo } = require('../repository/detailGoodsRepository')
const { successGetResponse, failedGetResponse, failedResponse, successResponse } = require('../util/responses')

const getAllDetailGoods = async (req, res) => {
    const detail_goods = await getAllDetailGoodsRepo()
    if (!detail_goods) return failedGetResponse(res)

    return successGetResponse(res, detail_goods)
}

const insertDetailGoods = async (req, res) => {
    const { goods_id, date_in, date_out, stock, supplier } = req.body
    const detail_goods = {
        goods_id: goods_id,
        date_in: date_in,
        date_out: date_out,
        stock: stock,
        supplier: supplier
    }

    const data = await insertDetailGoodsRepo(detail_goods)
    if (!data) return failedResponse(res)

    return successResponse(res)
}

const updateDetailGoods = async (req, res) => {
    const id = req.params.id
    const { goods_id, date_in, date_out, stock, supplier } = req.body
    const detail_goods = {
        id: id,
        goods_id: goods_id,
        date_in: date_in,
        date_out: date_out,
        stock: stock,
        supplier: supplier
    }

    const data = await updateDetailGoodsRepo(detail_goods)
    if (!data) return failedResponse(res)

    return successResponse(res)
}

const deleteDetailGoods = async (req, res) => {
    const id = req.params.id
    await deleteDetailGoodsRepo(id)

    return successResponse(res)
}

module.exports = {
    getAllDetailGoods,
    insertDetailGoods,
    updateDetailGoods,
    deleteDetailGoods
}