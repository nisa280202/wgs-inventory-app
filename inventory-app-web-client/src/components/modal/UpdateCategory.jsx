import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'

const UpdateCategory = ({ open, onClose, onUpdateCategory, category }) => {
    const [nameError, setNameError] = useState('')
    const [updateCategory, setUpdateCategory] = useState({ 
        id: '',
        name: '' 
    })

    useEffect(() => {
        if (category) {
            setUpdateCategory((prevCategory) => ({
                ...prevCategory,
                id: category.id || '',
                name: category.name || ''
            }));
        }
    }, [category]);

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUpdateCategory((prevCategory) => ({
            ...prevCategory,
            [name]: value,
        }))
        // Reset error message when input changes
        setNameError('')
    }
    
    const handleUpdateCategory = async () => {
        // Validasi jika nama jenis tidak boleh kosong
        if (updateCategory.name.trim() === '') {
            setNameError('Category name cannot be empty');
            return;
        }
    
        // Panggil prop onUpdateCategory untuk mengupdate jenis
        try {
            await onUpdateCategory(updateCategory);
    
            // Tutup modal setelah mengupdate jenis
            onClose();
    
            // Reset state setelah menutup modal
            setUpdateCategory({
                name: '',
            });
        } catch (error) {
            // Tangkap dan tampilkan pesan error dari server di sini
            const errorMessage = error.response.data.message || 'Failed to update Category';
    
            // Set pesan error ke state agar bisa ditampilkan di tabel
            setUpdateError(errorMessage);
        }
    }

    if (!open) {
        return null
    }

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <button className="close-button" onClick={onClose}>x</button>
                <div className="modal-content">
                    <h1 className="text-lg text-gray-400 font-semibold mb-7">Update Category</h1>
                    <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Category Name"
                        type="text"
                        value={updateCategory.name}
                        onChange={handleInputChange}
                        error={Boolean(nameError)}
                        helperText={nameError}
                        sx={{ marginBottom: 2, marginTop: 3 }}
                    />
                    <div className="action-buttons">
                        <button
                            onClick={handleUpdateCategory}
                            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md mr-2"
                        >
                            Update
                        </button>
                        <button
                            onClick={onClose}
                            className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded-md"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateCategory
