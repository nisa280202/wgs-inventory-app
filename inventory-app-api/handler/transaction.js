const { getTransactionsRepo, insertTransactionRepo, updateTransactionRepo, deleteTransactionRepo, findTransactionRepo, getTransactionRepo } = require('../repository/transaction')
const { successGetResponse, failedGetResponse, failedResponse, successResponse } = require('../util/responses')

const getTransactions = async (req, res) => {
    const transactions = await getTransactionsRepo();
    if (!transactions) return failedGetResponse(res);

    return successGetResponse(res, transactions);
}

const getTransaction = async (req, res) => {
    const id = req.params.id
    const transactions = await getTransactionRepo(id)
    if (!transactions) return failedGetResponse(res)

    return successGetResponse(res, transactions)
}

const insertTransaction = async (req, res) => {
    const user_id = req.user.id
    // console.log(req.user)
    const { type, date, sender, recipient, status } = req.body
    const transactions = {
        user_id: user_id,
        type: type,
        date: date,
        sender: sender,
        recipient: recipient,
        status: status,
    }
    console.log(transactions);

    const data = await insertTransactionRepo(transactions)
    if (!data) return failedResponse(res)

    return successResponse(res)
}

const updateTransaction = async (req, res) => {
    // const id = req.params.id
    const { id, type, date, sender, recipient } = req.body
    const transactions = {
        id: id,
        type: type,
        date: date,
        sender: sender,
        recipient: recipient,
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

const findTransaction = async (req, res) => {
    const { startDate, endDate } = req.query

    const transactions = await findTransactionRepo(startDate, endDate)
    if (!transactions) return failedGetResponse(res)

    return successGetResponse(res, transactions)
}

module.exports = {
    getTransactions,
    getTransaction,
    insertTransaction,
    updateTransaction,
    deleteTransaction,
    findTransaction
}