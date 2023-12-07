const { getAllGoodsRepo, insertGoodsRepo, updateGoodsRepo, deleteGoodsRepo } = require('../repository/goodsRepository')
const { successGetResponse, failedGetResponse, failedResponse, successResponse } = require('../util/responses')

const getAllGoods = async (req, res) => {
    const goods = await getAllGoodsRepo()
    if (!goods) return failedGetResponse(res)

    return successGetResponse(res, goods)
}

const insertGoods = async (req, res) => {
    const { type, name, category, picture, unit, price } = req.body
    const goods = {
        type: type,
        name: name,
        category: category,
        picture: picture,
        unit: unit,
        price: price
    }

    const data = await insertGoodsRepo(goods)
    if (!data) return failedResponse(res)

    return successResponse(res)
}

const updateGoods = async (req, res) => {
    const id = req.params.id
    const { type, name, category, picture, unit, price } = req.body
    const goods = {
        id: id,
        type: type,
        name: name,
        category: category,
        picture: picture,
        unit: unit,
        price: price
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

module.exports = {
    getAllGoods,
    insertGoods,
    updateGoods,
    deleteGoods
}