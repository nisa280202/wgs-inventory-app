const { getUsersRepo, insertUserRepo, updateUserRepo, deleteUserRepo } = require('../repository/userRepository')
const { successGetResponse, failedGetResponse, failedResponse, successResponse } = require('../util/responses')

const getUsers = async (req, res) => {
    const users = await getUsersRepo()
    if (!users) return failedGetResponse(res)

    return successGetResponse(res, users)
}

const insertUser = async (req, res) => {
    const { type, name, email, password } = req.body
    const users = {
        type: type,
        name: name,
        email: email,
        password: password
    }

    const data = await insertUserRepo(users)
    if (!data) return failedResponse(res)

    return successResponse(res)
}

const updateUser = async (req, res) => {
    const id = req.params.id
    const { type, name, email, password } = req.body
    const users = {
        id: id,
        type: type,
        name: name,
        email: email,
        password: password
    }

    const data = await updateUserRepo(users)
    if (!data) return failedResponse(res)

    return successResponse(res)
}

const deleteUser = async (req, res) => {
    const id = req.params.id
    await deleteUserRepo(id)

    return successResponse(res)
}

module.exports = {
    getUsers,
    insertUser,
    updateUser,
    deleteUser
}