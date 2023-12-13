const express = require('express')

const { getUsers, insertUser, updateUser, deleteUser } = require('../handler/user')

const router = express.Router()

router.get('/', getUsers)
router.post('/', insertUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router