const express = require('express')
const { middleware } = require('../middleware/middleware')
const { OFFICE_STAFF } = require('../constant/constant')
const { getCategories, getCategory, addCategory, updateCategory, deleteCategory } = require('../handler/category')

const router = express.Router()

router.get('/', getCategories)
router.get('/:id', getCategory)
router.post('/', middleware([OFFICE_STAFF]), addCategory)
router.put('/:id', middleware([OFFICE_STAFF]), updateCategory)
router.delete('/:id', middleware([OFFICE_STAFF]), deleteCategory)

module.exports = router