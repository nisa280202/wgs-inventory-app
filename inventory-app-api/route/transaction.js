const express = require('express')
const { middleware } = require('../middleware/middleware')
const { OFFICE_STAFF } = require('../constant/constant')
const { getTransactions, insertTransaction, updateTransaction, deleteTransaction, findTransaction, getTransaction } = require('../handler/transaction')

const router = express.Router()

router.get('/', getTransactions)
router.get('/:id', getTransaction)
router.post('/', middleware([OFFICE_STAFF]), insertTransaction)
router.put('/:id', middleware([OFFICE_STAFF]), updateTransaction)
router.delete('/:id', middleware([OFFICE_STAFF]), deleteTransaction)
router.get('/search', findTransaction)

module.exports = router