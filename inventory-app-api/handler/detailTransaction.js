const { getDetailTransactionsRepo, insertDetailTransactionRepo, updateDetailTransactionRepo, deleteDetailTransactionRepo } = require('../repository/detailTransaction')
const { successGetResponse, failedGetResponse, failedResponse, successResponse } = require('../util/responses')

const getDetailTransactions = async (req, res) => {
    const detail_transactions = await getDetailTransactionsRepo()
    if (!detail_transactions) return failedGetResponse(res)

    return successGetResponse(res, detail_transactions)
}

const insertDetailTransaction = async (req, res) => {
    const { goods_id, transaction_id, stock, status } = req.body
    const detail_transactions = {
        goods_id: goods_id,
        transaction_id: transaction_id,
        stock: stock,
        status: status
    }

    const data = await insertDetailTransactionRepo(detail_transactions)
    if (!data) return failedResponse(res)

    return successResponse(res)
}

const updateDetailTransaction = async (req, res) => {
    const id = req.params.id
    const { goods_id, transaction_id, stock, status } = req.body
    const detail_transactions = {
        id: id,
        goods_id: goods_id,
        transaction_id: transaction_id,
        stock: stock,
        status: status
    }

    const data = await updateDetailTransactionRepo(detail_transactions)
    if (!data) return failedResponse(res)

    return successResponse(res)
}

const deleteDetailTransaction = async (req, res) => {
    const id = req.params.id
    await deleteDetailTransactionRepo(id)

    return successResponse(res)
}

module.exports = {
    getDetailTransactions,
    insertDetailTransaction,
    updateDetailTransaction,
    deleteDetailTransaction
}