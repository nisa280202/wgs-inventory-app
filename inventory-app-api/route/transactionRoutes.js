const express = require('express')

const { getTransactions, insertTransaction, updateTransaction, deleteTransaction } = require('../handler/transactionHandler')

const router = express.Router()

router.get('/', getTransactions)
router.post('/', insertTransaction)
router.put('/:id', updateTransaction)
router.delete('/:id', deleteTransaction)

module.exports = router