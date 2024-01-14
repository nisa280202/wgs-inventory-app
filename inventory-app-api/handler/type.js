// Import fungsi-fungsi dari repository untuk berinteraksi dengan data jenis barang (type) dalam database
const { 
    getAllTypesRepo, 
    getTypeRepo, 
    addTypeRepo, 
    updateTypeRepo, 
    deleteTypeRepo 
} = require('../repository/type');

// Import respons yang telah ditentukan untuk keberhasilan dan kegagalan
const { successGetResponse, failedGetResponse, failedResponse, successResponse } = require('../util/responses');

// Mendapatkan semua data jenis barang
const getAllTypes = async (req, res) => { 
    const types = await getAllTypesRepo();

    // Jika tidak ada data, kirim respons kegagalan
    if (!types) return failedGetResponse(res);

    // Jika berhasil, kirim respons dengan data yang diperoleh
    return successGetResponse(res, types);
}

// Mendapatkan detail jenis barang berdasarkan ID
const getType = async (req, res) => { 
    const id = req.params.id;
    const type = await getTypeRepo(id);

    // Jika tidak ada data, kirim respons kegagalan
    if (!type) return failedGetResponse(res);

    // Jika berhasil, kirim respons dengan data yang diperoleh
    return successGetResponse(res, type);
}

// Menyisipkan jenis barang baru
const addType = async (req, res) => { 
    // Mendapatkan data jenis barang dari objek request body
    const { name } = req.body;
    const type = { name: name };

    try {
        // Menyisipkan data jenis barang ke dalam database
        const data = await addTypeRepo(type);

        // Jika penyisipan gagal, kirim respons kegagalan dengan pesan error
        if (!data) {
            return failedResponse(res, 'Failed to add type');
        }

        // Jika berhasil, kirim respons keberhasilan
        return successResponse(res);
    } catch (error) {
        // Jika terjadi kesalahan selama proses penyisipan, kirim respons kegagalan dengan pesan error
        console.error(error.message);
        return failedResponse(res, error.message);
    }
}

// Memperbarui data jenis barang berdasarkan ID
const updateType = async (req, res) => { 
    const id = req.params.id;
    const { name } = req.body;
    
    // Membuat objek jenis barang yang akan diperbarui
    const type = {
        id: id,
        name: name
    };

    // Memperbarui data jenis barang di dalam database
    const data = await updateTypeRepo(type);

    // Jika pembaruan gagal, kirim respons kegagalan
    if (!data) return failedResponse(res);

    // Jika berhasil, kirim respons keberhasilan
    return successResponse(res);
}

// Menghapus data jenis barang berdasarkan ID
const deleteType = async (req, res) => { 
    const id = req.params.id;

    // Menghapus data jenis barang dari database
    await deleteTypeRepo(id);

    // Mengirim respons keberhasilan setelah penghapusan
    return successResponse(res);
}

// Ekspor fungsi-fungsi untuk digunakan dalam routing Express
module.exports = {
    getAllTypes,
    getType,
    addType,
    updateType,
    deleteType
};
