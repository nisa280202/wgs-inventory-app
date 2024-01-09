const { getUsersRepo, insertUserRepo, updateUserRepo, deleteUserRepo, loginRepo } = require('../repository/user')
const { successGetResponse, failedGetResponse, failedResponse, successResponse } = require('../util/responses')
const { comparedPassword, getHashedPassword } = require('../util/argon')
const getJWTKey = require('../util/jwt')
const { logActivity } = require('./log')

const getUsers = async (req, res) => {
    const users = await getUsersRepo()
    if (!users) return failedGetResponse(res)

    return successGetResponse(res, users)
}

// const insertUser = async (req, res) => {
//     const user_id = req.user.id
//     const { type, name, email, password } = req.body
//     const picture = req.file ? req.file.filename : null

//     const users = {
//         type: type,
//         name: name,
//         email: email,
//         password: await getHashedPassword(password),
//         picture: picture
//     }

//     const data = await insertUserRepo(users)
//     // console.log(data)
//     await logActivity(user_id, 'create', name, 'Add user uccessfully')

//     if (!data) return failedResponse(res)

//     return successResponse(res, data)
// }

const insertUser = async (req, res) => {
    const user_id = req.user.id
    const { type, name, email, password } = req.body
    const picture = req.file ? req.file.filename : null

    const users = {
        type: type,
        name: name,
        email: email,
        password: await getHashedPassword(password),
        picture: picture
    }

    try {
        const data = await insertUserRepo(users);
        // console.log(data)
        await logActivity(user_id, 'create', name, 'Add user successfully');

        if (!data) {
            return failedResponse(res);
        }

        return successResponse(res, data);
    } catch (error) {
        // Log activity for the error case
        await logActivity(user_id, 'create', name, `Failed to add user. Error: ${error.message}`);

        // Handle the error response here if needed
        return failedResponse(res, 'Failed to add user');
    }
}

const updateUser = async (req, res) => {
    const user_id = req.user.id
    // const id = req.params.id
    const { id, type, name, email } = req.body
    const picture = req.file ? req.file.filename : null
    // console.log(picture, 'ini picture req')
    const users = {
        id: id,
        type: type,
        name: name,
        email: email,
        // password: password,
        picture: picture
    }
    // console.log(users, 'ini users')
    const data = await updateUserRepo(users)
    // console.log(data, 'ini data')
    await logActivity(user_id, 'update', name, 'Update user successfully');

    if (!data) return failedResponse(res)

    return successResponse(res)
}

const deleteUser = async (req, res) => {
    const user_id = req.user.id
    const id = req.params.id
    await deleteUserRepo(id)
    await logActivity(user_id, 'delete', `user id : ${id}`, 'Delete user successfully');

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
    // console.log(res);
    return successGetResponse(res, result)
}

module.exports = {
    getUsers,
    insertUser,
    updateUser,
    deleteUser,
    login
}