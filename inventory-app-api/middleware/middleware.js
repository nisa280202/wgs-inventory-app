// Import library untuk JSON Web Token (JWT)
const jwt = require('jsonwebtoken')

// Import fungsi unauthorizedResponse dari file responses.js di folder util
const { unauthorizedResponse } = require('../util/responses')

// Load konfigurasi environment dari file .env
require('dotenv').config()

// Middleware untuk otentikasi berdasarkan tipe pengguna (userType)
const middleware = (userType) => {
    // Fungsi middleware yang akan digunakan dalam routing Express
    return (req, res, next) => {
        // Mendapatkan token dari header Authorization dalam request
        const authHeader = req.headers['authorization']

        // Memeriksa apakah token ada
        const token = authHeader && authHeader.split(' ')[1]

        // Jika token tidak ada, kirim respons unauthorized
        if (!token) {
            return unauthorizedResponse(res)
        }

        // Verifikasi token menggunakan kunci rahasia (JWT_KEY) dari environment
        jwt.verify(token, process.env.JWT_KEY, (error, user) => {
            // Jika terjadi error pada verifikasi, kirim respons unauthorized
            if (error) {
                return unauthorizedResponse(res)
            }

            // Jika tipe pengguna (user.type) tidak termasuk dalam daftar userType, kirim respons unauthorized
            if (!userType.includes(user.type)) {
                return unauthorizedResponse(res)
            }

            // Menyimpan informasi pengguna dalam objek request (req.user) untuk digunakan pada handler selanjutnya
            req.user = user

            // Lanjutkan ke middleware atau handler berikutnya
            next()
        })
    }
}

// Ekspor middleware agar dapat digunakan pada file lain
module.exports = {
    middleware
}
