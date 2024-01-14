// Import fungsi-fungsi dari repository untuk berinteraksi dengan data pengguna (user) dalam database
const { 
    getUsersRepo, 
    insertUserRepo, 
    updateUserRepo, 
    deleteUserRepo, 
    loginRepo 
} = require('../repository/user');

// Import respons yang telah ditentukan untuk keberhasilan dan kegagalan
const { successGetResponse, failedGetResponse, failedResponse, successResponse } = require('../util/responses');

// Import fungsi-fungsi utilitas untuk keamanan dan aktivitas logging
const { comparedPassword, getHashedPassword } = require('../util/argon');
const getJWTKey = require('../util/jwt');
const { logActivity } = require('./log');

// Mendapatkan semua data pengguna
const getUsers = async (req, res) => {
    const users = await getUsersRepo();

    // Jika tidak ada data, kirim respons kegagalan
    if (!users) return failedGetResponse(res);

    // Jika berhasil, kirim respons dengan data yang diperoleh
    return successGetResponse(res, users);
}

// Menyisipkan data pengguna baru
const insertUser = async (req, res) => {
    const user_id = req.user.id;
    const { type, name, email, password } = req.body;
    const picture = req.file ? req.file.filename : null;

    const users = {
        type: type,
        name: name,
        email: email,
        password: await getHashedPassword(password),
        picture: picture
    };

    try {
        // Menyisipkan data pengguna ke dalam database
        const data = await insertUserRepo(users);

        // Log aktivitas penambahan pengguna
        await logActivity(user_id, 'create', name, 'Add user successfully');

        // Jika penyisipan gagal, kirim respons kegagalan
        if (!data) {
            return failedResponse(res);
        }

        // Jika berhasil, kirim respons keberhasilan dengan data yang diperoleh
        return successResponse(res, data);
    } catch (error) {
        // Log aktivitas jika terjadi kesalahan selama penyisipan
        await logActivity(user_id, 'create', name, `Failed to add user. Error: ${error.message}`);

        // Handle respons kegagalan dengan pesan error
        return failedResponse(res, 'Failed to add user');
    }
}

// Memperbarui data pengguna berdasarkan ID
const updateUser = async (req, res) => {
    const user_id = req.user.id;
    const { id, type, name, email } = req.body;
    const picture = req.file ? req.file.filename : null;

    const users = {
        id: id,
        type: type,
        name: name,
        email: email,
        picture: picture
    };

    // Memperbarui data pengguna di dalam database
    const data = await updateUserRepo(users);

    // Log aktivitas pembaruan pengguna
    await logActivity(user_id, 'update', name, 'Update user successfully');

    // Jika pembaruan gagal, kirim respons kegagalan
    if (!data) return failedResponse(res);

    // Jika berhasil, kirim respons keberhasilan
    return successResponse(res);
}

// Menghapus data pengguna berdasarkan ID
const deleteUser = async (req, res) => {
    const user_id = req.user.id;
    const id = req.params.id;

    // Menghapus data pengguna dari database
    await deleteUserRepo(id);

    // Log aktivitas penghapusan pengguna
    await logActivity(user_id, 'delete', `user id : ${id}`, 'Delete user successfully');

    // Mengirim respons keberhasilan setelah penghapusan
    return successResponse(res);
}

// Login pengguna dan menghasilkan token JWT jika berhasil
const login = async (req, res) => {
    const { email, password } = req.body;

    // Membuat objek pengguna untuk melakukan login
    const users = {
        email: email,
        password: password
    };

    // Mengambil data pengguna berdasarkan alamat email
    const result = await loginRepo(users.email);

    // Jika pengguna tidak ditemukan, kirim respons kegagalan
    if (result == null) return failedGetResponse(res, result);

    // Membandingkan password yang dimasukkan dengan password di database
    const passwordMatch = await comparedPassword(users.password, result.password);

    // Jika password tidak sesuai, kirim respons kegagalan dengan pesan error
    if (!passwordMatch) return failedResponse(res, "Email or Password wrong");

    // Menghapus password dari data pengguna sebelum membuat token JWT
    delete result.password;

    // Menghasilkan token JWT dan menambahkannya ke data pengguna
    const jwtToken = getJWTKey(result);
    result['accessToken'] = jwtToken;

    // Mengirim respons keberhasilan dengan data pengguna dan token JWT
    return successGetResponse(res, result);
}

// Ekspor fungsi-fungsi untuk digunakan dalam routing Express
module.exports = {
    getUsers,
    insertUser,
    updateUser,
    deleteUser,
    login
};
