const { getTransactionsRepo, insertTransactionRepo, updateTransactionRepo, deleteTransactionRepo } = require('../repository/transactionRepository')
const { successGetResponse, failedGetResponse, failedResponse, successResponse } = require('../util/responses')

const getTransactions = async (req, res) => {
    const transactions = await getTransactionsRepo()
    if (!transactions) return failedGetResponse(res)

    return successGetResponse(res, transactions)
}

const insertTransaction = async (req, res) => {
    const { user_id, type, date, sender, recipient, status } = req.body
    const transactions = {
        user_id: user_id,
        type: type,
        date: date,
        sender: sender,
        recipient: recipient,
        status: status
    }

    const data = await insertTransactionRepo(transactions)
    if (!data) return failedResponse(res)

    return successResponse(res)
}

const updateTransaction = async (req, res) => {
    const id = req.params.id
    const { user_id, type, date, sender, recipient, status } = req.body
    const transactions = {
        id: id,
        user_id: user_id,
        type: type,
        date: date,
        sender: sender,
        recipient: recipient,
        status: status
    }

    const data = await updateTransactionRepo(transactions)
    if (!data) return failedResponse(res)

    return successResponse(res)
}

const deleteTransaction = async (req, res) => {
    const id = req.params.id
    await deleteTransactionRepo(id)

    return successResponse(res)
}

module.exports = {
    getTransactions,
    insertTransaction,
    updateTransaction,
    deleteTransaction
}