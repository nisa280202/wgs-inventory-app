const express = require('express')

const { getAllGoods, insertGoods, updateGoods, deleteGoods } = require('../handler/goodsHandler')

const router = express.Router()

router.get('/', getAllGoods)
router.post('/', insertGoods)
router.put('/:id', updateGoods)
router.delete('/:id', deleteGoods)

module.exports = router