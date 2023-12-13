const { getUsersRepo, insertUserRepo, updateUserRepo, deleteUserRepo, loginRepo } = require('../repository/user')
const { successGetResponse, failedGetResponse, failedResponse, successResponse } = require('../util/responses')
const { comparedPassword, getHashedPassword } = require('../util/argon')
const getJWTKey = require('../util/jwt')

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
        password: await getHashedPassword(password)
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

const login = async (req, res) => {
    const { email, password } = req.body
    const users = {
        email: email,
        password: password
    }

    const result = await loginRepo(users.email)
    if(result == null) return failedGetResponse(res, result)
    
    const passwordMatch = await comparedPassword(users.password, result.password)
    if (!passwordMatch) return failedResponse(res, "Email or Password wrong")
    delete result.password

    const jwtToken = getJWTKey(result)
    result['accessToken'] = jwtToken
    
    return successGetResponse(res, result)
}

module.exports = {
    getUsers,
    insertUser,
    updateUser,
    deleteUser,
    login
}