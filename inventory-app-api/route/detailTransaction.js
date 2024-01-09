const express = require('express')
const { middleware } = require('../middleware/middleware')
const { WAREHOUSE_STAFF } = require('../constant/constant')
const { getDetailTransactions, insertDetailTransaction, updateDetailTransaction, deleteDetailTransaction, getDetailTransactionById } = require('../handler/detailTransaction')

const router = express.Router()

router.get('/', getDetailTransactions)
router.get('/:transaction_id', getDetailTransactionById)
router.post('/', middleware([WAREHOUSE_STAFF]), insertDetailTransaction)
router.put('/:id', middleware([WAREHOUSE_STAFF]), updateDetailTransaction)
router.delete('/:id', middleware([WAREHOUSE_STAFF]), deleteDetailTransaction)

module.exports = router