const express = require('express')

const { getAllGoods, insertGoods, updateGoods, deleteGoods, findGoods } = require('../handler/goods')

const router = express.Router()

router.get('/', getAllGoods)
router.post('/', insertGoods)
router.put('/:id', updateGoods)
router.delete('/:id', deleteGoods)
router.get('/search', findGoods)

module.exports = router