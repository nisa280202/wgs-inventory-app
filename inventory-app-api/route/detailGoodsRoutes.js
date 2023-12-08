const express = require('express')

const { getAllDetailGoods, insertDetailGoods, updateDetailGoods, deleteDetailGoods } = require('../handler/detailGoodsHandler')

const router = express.Router()

router.get('/', getAllDetailGoods)
router.post('/', insertDetailGoods)
router.put('/:id', updateDetailGoods)
router.delete('/:id', deleteDetailGoods)

module.exports = router