const { getDetailTransactionsRepo, insertDetailTransactionRepo, updateDetailTransactionRepo, deleteDetailTransactionRepo, getDetailTransactionByIdRepo } = require('../repository/detailTransaction')
const { successGetResponse, failedGetResponse, failedResponse, successResponse } = require('../util/responses')

const getDetailTransactions = async (req, res) => {
    const detail_transactions = await getDetailTransactionsRepo();
    if (!detail_transactions) return failedGetResponse(res);

    return successGetResponse(res, detail_transactions);
}

const getDetailTransactionById = async (req, res) => { 
    const transaction_id = req.params.transaction_id;
    const transaction = await getDetailTransactionByIdRepo(transaction_id);
    if (!transaction) return failedGetResponse(res);

    return successGetResponse(res, transaction);
}

// const insertDetailTransaction = async (req, res) => {
//     const { transaction_id, stock, status, goods_id } = req.body;

//     try {
//         const detail_transactions = {
//             goods_id: goods_id,
//             transaction_id: transaction_id,
//             stock: stock,
//             status: status
//         };
//         console.log('Received detail_transactions:', detail_transactions);

//         const data = await insertDetailTransactionRepo(detail_transactions);
//         if (!data) {
//             console.log('Insert failed or returned null.');
//             return failedResponse(res);
//         }
//         console.log('Inserted data:', data);

//         return successResponse(res);
//     } catch (error) {
//         console.error('Error in insertDetailTransaction:', error);
//         return failedResponse(res);
//     }
// }

const insertDetailTransaction = async (req, res) => {
    const { transaction_id, stock, status, goods_id } = req.body;

    try {
        const detail_transactions = {
            goods_id: goods_id,
            transaction_id: transaction_id,
            stock: stock,
            status: status
        }
        console.log(detail_transactions)

        const data = await insertDetailTransactionRepo(detail_transactions);
        if (!data) {
            return failedResponse(res);
        }
        console.log(data)

        return successResponse(res);
    } catch (error) {
        console.error(error);
        return failedResponse(res);
    }
}

// const insertDetailTransaction = async (req, res) => {
//     const { goods_id, transaction_id, stock, status } = req.body
//     const detail_transactions = {
//         goods_id: goods_id,
//         transaction_id: transaction_id,
//         stock: stock,
//         status: status
//     }

//     const data = await insertDetailTransactionRepo(detail_transactions)
//     if (!data) return failedResponse(res)

//     return successResponse(res)
// }

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
    getDetailTransactionById,
    insertDetailTransaction,
    updateDetailTransaction,
    deleteDetailTransaction
}