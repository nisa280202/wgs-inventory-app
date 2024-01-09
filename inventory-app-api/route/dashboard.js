const express = require('express')

const { getCountGoods, getCountTransaction, getCountUser, getCountCategory, getCountStock, getCountSender, getCountRecipient, getTotalSenderRecipient, getMinimumStock } = require('../handler/dashboard')

const router = express.Router()

router.get('/goods', getCountGoods)
router.get('/transaction', getCountTransaction)
router.get('/user', getCountUser)
router.get('/category', getCountCategory)
router.get('/stock', getCountStock)
router.get('/sender', getCountSender)
router.get('/recipient', getCountRecipient)
router.get('/total-sender-recipient', getTotalSenderRecipient)
router.get('/min-stock', getMinimumStock)

module.exports = router