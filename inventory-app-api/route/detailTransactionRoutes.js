const express = require('express')

const { getDetailTransactions, insertDetailTransaction, updateDetailTransaction, deleteDetailTransaction } = require('../handler/detailTransactionHandler')

const router = express.Router()

router.get('/', getDetailTransactions)
router.post('/', insertDetailTransaction)
router.put('/:id', updateDetailTransaction)
router.delete('/:id', deleteDetailTransaction)

module.exports = router