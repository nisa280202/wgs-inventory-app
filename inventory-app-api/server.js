const bodyParser = require('body-parser'); // Mengimpor middleware untuk mengurai permintaan HTTP.
const express = require('express'); // Mengimpor modul Express.js.
require('dotenv').config(); // Mengimpor modul dotenv untuk mengelola variabel lingkungan.
const goodsRoutes = require('./route/goods'); // Mengimpor rute terkait barang.
const userRoutes = require('./route/user'); // Mengimpor rute terkait pengguna.
const transactionRoutes = require('./route/transaction'); // Mengimpor rute terkait transaksi.
const detailTransactionRoutes = require('./route/detailTransaction'); // Mengimpor rute terkait detail transaksi.
const authRoutes = require('./route/auth'); // Mengimpor rute terkait otentikasi.
const categoryRoutes = require('./route/category'); // Mengimpor rute terkait kategori.
const typeRoutes = require('./route/type'); // Mengimpor rute terkait jenis.
const dashboardRoutes = require('./route/dashboard'); // Mengimpor rute terkait dasbor.
const cors = require('cors'); // Mengimpor middleware CORS untuk menangani permintaan lintas domain.
const app = express(); // Membuat instance aplikasi Express.

app.use(express.urlencoded({ extended: true })); // Menggunakan middleware untuk mengurai data dari permintaan HTTP.
app.use(express.json()); // Menggunakan middleware untuk mengurai payload JSON dari permintaan HTTP.

app.use(bodyParser.urlencoded({ extended: true })); // Menggunakan middleware body-parser untuk mengurai data dari permintaan HTTP.

app.use(cors({ // Menggunakan middleware CORS dengan konfigurasi tertentu.
    origin: 'http://localhost:5173', // Mengizinkan permintaan dari origin tertentu.
}));

app.use('/uploads', express.static('uploads')); // Menyediakan akses statis ke folder 'uploads'.

// Mengarahkan permintaan ke rute-rute yang sesuai untuk berbagai fitur aplikasi.
app.use('/goods', goodsRoutes);
app.use('/user', userRoutes);
app.use('/transaction', transactionRoutes);
app.use('/detail_transaction', detailTransactionRoutes);
app.use('/auth', authRoutes);
app.use('/category', categoryRoutes);
app.use('/type', typeRoutes);
app.use('/dashboard', dashboardRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Listening on Port ${process.env.PORT}`);
});