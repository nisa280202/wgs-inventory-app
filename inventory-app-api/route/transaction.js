const express = require('express')

const { getTransactions, insertTransaction, updateTransaction, deleteTransaction, findTransaction } = require('../handler/transaction')

const router = express.Router()

router.get('/', getTransactions)
router.post('/', insertTransaction)
router.put('/:id', updateTransaction)
router.delete('/:id', deleteTransaction)
router.get('/search', findTransaction)

module.exports = router