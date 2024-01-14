const query = require('../util/db');

// Fungsi untuk mendapatkan semua jenis barang dari database
const getAllTypesRepo = async () => {
    try {
        const queryText = 'SELECT * FROM types ORDER BY id DESC';
        const result = await query(queryText);
        return result.rows;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Fungsi untuk mendapatkan detail jenis barang berdasarkan ID
const getTypeRepo = async (id) => {
    try {
        const queryText = 'SELECT * FROM types WHERE id = $1';
        const result = await query(queryText, [id]);
        return result.rows[0];
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Fungsi untuk menambahkan jenis barang baru ke database
const addTypeRepo = async (type) => {
    try {
        // Tambahkan validasi di sini jika diperlukan
        const queryText = 'INSERT INTO types(name) VALUES ($1)';
        const value = [type.name];
        const result = await query(queryText, value);

        return result.rows;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Fungsi untuk memperbarui informasi jenis barang berdasarkan ID
const updateTypeRepo = async (type) => {
    try {
        const queryText = 'UPDATE types SET name = $1 WHERE id = $2';
        const value = [type.name, type.id];
        const result = await query(queryText, value);

        return result.rows;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Fungsi untuk menghapus jenis barang berdasarkan ID
const deleteTypeRepo = async (id) => {
    try {
        const queryText = 'DELETE FROM types WHERE id = $1';
        const result = await query(queryText, [id]);

        return result.rows[0];
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Ekspor fungsi-fungsi repository untuk digunakan dalam kode lain
module.exports = { 
    getAllTypesRepo,
    getTypeRepo,
    addTypeRepo,
    updateTypeRepo,
    deleteTypeRepo
}
