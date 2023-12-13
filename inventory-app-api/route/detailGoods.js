const express = require('express')

const { getAllDetailGoods, insertDetailGoods, updateDetailGoods, deleteDetailGoods, findDetailGoods } = require('../handler/detailGoods')

const router = express.Router()

router.get('/', getAllDetailGoods)
router.post('/', insertDetailGoods)
router.put('/:id', updateDetailGoods)
router.delete('/:id', deleteDetailGoods)
router.get('/:id', findDetailGoods)

module.exports = router