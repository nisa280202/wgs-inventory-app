const query = require('../util/db');

// Fungsi untuk mendapatkan semua kategori dari database
const getCategoriesRepo = async () => {
    try {
        const queryText = 'SELECT * FROM categories ORDER BY id DESC';
        const result = await query(queryText);
        return result.rows;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Fungsi untuk mendapatkan kategori berdasarkan ID
const getCategoryRepo = async (id) => {
    try {
        const queryText = 'SELECT * FROM categories WHERE id = $1';
        const result = await query(queryText, [id]);
        return result.rows[0];
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Fungsi untuk menambahkan kategori baru ke database
const addCategoryRepo = async (category) => {
    try {
        const queryText = 'INSERT INTO categories(name) VALUES ($1)';
        const value = [category.name];
        const result = await query(queryText, value);
        return result.rows;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Fungsi untuk memperbarui nama kategori berdasarkan ID
const updateCategoryRepo = async (category) => {
    try {
        const queryText = 'UPDATE categories SET name = $1 WHERE id = $2';
        const value = [category.name, category.id];
        const result = await query(queryText, value);
        return result.rows;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Fungsi untuk menghapus kategori berdasarkan ID
const deleteCategoryRepo = async (id) => {
    try {
        const queryText = 'DELETE FROM categories WHERE id = $1';
        const result = await query(queryText, [id]);
        return result.rows[0];
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Ekspor fungsi-fungsi repository untuk digunakan dalam kode lain
module.exports = { 
    getCategoriesRepo,
    getCategoryRepo,
    addCategoryRepo,
    updateCategoryRepo,
    deleteCategoryRepo
}