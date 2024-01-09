import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'

const UpdateType = ({ open, onClose, onUpdateType, type }) => {
    const [nameError, setNameError] = useState('')
    const [updateType, setUpdateType] = useState({ 
        id: '',
        name: '' 
    })

    useEffect(() => {
        if (type) {
            setUpdateType((prevType) => ({
                ...prevType,
                id: type.id || '',
                name: type.name || ''
            }));
        }
    }, [type]);

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUpdateType((prevType) => ({
            ...prevType,
            [name]: value,
        }))
        // Reset error message when input changes
        setNameError('')
    }
    
    const handleUpdateType = async () => {
        // Validasi jika nama jenis tidak boleh kosong
        if (updateType.name.trim() === '') {
            setNameError('Type name cannot be empty');
            return;
        }
    
        // Panggil prop onUpdateType untuk mengupdate jenis
        try {
            await onUpdateType(updateType);
    
            // Tutup modal setelah mengupdate jenis
            onClose();
    
            // Reset state setelah menutup modal
            setUpdateType({
                name: '',
            });
        } catch (error) {
            // Tangkap dan tampilkan pesan error dari server di sini
            const errorMessage = error.response.data.message || 'Failed to update type';
    
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
                    <h1 className="text-lg text-gray-400 font-semibold mb-7">Update Type</h1>
                    <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Type Name"
                        type="text"
                        value={updateType.name}
                        onChange={handleInputChange}
                        error={Boolean(nameError)}
                        helperText={nameError}
                        sx={{ marginBottom: 2, marginTop: 3 }}
                    />
                    <div className="action-buttons">
                        <button
                            onClick={handleUpdateType}
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

export default UpdateType
