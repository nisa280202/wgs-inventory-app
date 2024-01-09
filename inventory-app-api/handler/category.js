// Import fungsi-fungsi repository terkait kategori
const { getCategoriesRepo, getCategoryRepo, addCategoryRepo, updateCategoryRepo, deleteCategoryRepo } = require('../repository/category')

// Import respons berhasil dan gagal dari utilitas respons
const { successGetResponse, failedGetResponse, failedResponse, successResponse } = require('../util/responses')

// Fungsi untuk mendapatkan semua kategori
const getCategories = async (req, res) => { 
    const categories = await getCategoriesRepo();
    if (!categories) return failedGetResponse(res);

    return successGetResponse(res, categories);
}

// Fungsi untuk mendapatkan kategori berdasarkan ID
const getCategory = async (req, res) => { 
    const id = req.params.id;
    const category = await getCategoryRepo(id);
    if (!category) return failedGetResponse(res);

    return successGetResponse(res, category);
}

// Fungsi untuk menambahkan kategori baru
const addCategory = async (req, res) => { 
    const { name } = req.body;
    const category = { name: name };

    try {
        const data = await addCategoryRepo(category);
        if (!data) {
            return failedResponse(res, 'Failed to add type'); // Mengirim pesan error ke klien
        }
        
        return successResponse(res);
    } catch (error) {
        console.error(error.message);
        return failedResponse(res, error.message); // Mengirim pesan error ke klien
    }
}

// Fungsi untuk memperbarui kategori berdasarkan ID
const updateCategory = async (req, res) => { 
    const id = req.params.id;
    const { name } = req.body;
    const category = {
        id: id,
        name: name
    };

    const data = await updateCategoryRepo(category);
    if (!data) return failedResponse(res);

    return successResponse(res);
}

// Fungsi untuk menghapus kategori berdasarkan ID
const deleteCategory = async (req, res) => { 
    const id = req.params.id;
    await deleteCategoryRepo(id);

    return successResponse(res);
}

// Ekspor semua fungsi agar dapat digunakan di tempat lain
module.exports = {
    getCategories,
    getCategory,
    addCategory,
    updateCategory,
    deleteCategory
}