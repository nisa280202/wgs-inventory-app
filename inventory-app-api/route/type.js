const express = require('express')
const { middleware } = require('../middleware/middleware')
const { OFFICE_STAFF } = require('../constant/constant')
const { getAllTypes, getType, addType, updateType, deleteType } = require('../handler/type')

const router = express.Router()

router.get('/', getAllTypes)
router.get('/:id', getType)
router.post('/', middleware([OFFICE_STAFF]), addType)
router.put('/:id', middleware([OFFICE_STAFF]), updateType)
router.delete('/:id', middleware([OFFICE_STAFF]), deleteType)

module.exports = router