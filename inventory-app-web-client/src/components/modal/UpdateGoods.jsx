import React, { useState, useEffect } from 'react';
import './add-modal.scss';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const UpdateGoods = ({ open, onClose, onUpdateGoods, goods, types, categories }) => {
    const [selectedFile, setSelectedFile] = useState(null)
    const [fileSizeError, setFileSizeError] = useState(null)
    const type = localStorage.getItem('type');
    const [updateGoods, setUpdateGoods] = useState({
        id: '',
        type_id: '',
        name: '',
        category_id: '',
        unit: '',
        price: '',
        picture: '',
        stock: '',
    });

    useEffect(() => {
        if (goods) {
            setUpdateGoods((prevGoods) => ({
                ...prevGoods,
                id: goods.id || '',
                type_id: goods.type_id || '',
                type_name: goods.type_name || '',
                name: goods.name || '',
                category_id: goods.category_id || '',
                category_name: goods.category_name || '',
                unit: goods.unit || '',
                price: goods.price || '',
                picture: goods.picture || '',
                stock: goods.stock || '',
            }));
        }
    }, [goods]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateGoods((prevGoods) => ({
            ...prevGoods,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
        if (imageFile) {
            if (!/^image\/(jpeg|jpg|png|gif|webp)$/i.test(imageFile.type)) {
                setFileSizeError('Invalid file type. Please choose a valid image file.');
                return;
            }

            // Check the file size (limit to 1 MB)
            const fileSizeInMB = imageFile.size / (1024 * 1024);

            if (fileSizeInMB > 1) {
                // Display an error message or take appropriate action
                setFileSizeError('File size exceeds the limit (1 MB)');
                return;
            }

            setFileSizeError(null);

            setUpdateGoods((prevGoods) => ({
                ...prevGoods,
                picture: imageFile,
            }));
        }
        setSelectedFile(imageFile);
    };

    const handleUpdateGoods = () => {
        const formData = new FormData();
        formData.append('id', updateGoods.id);
        formData.append('type_id', updateGoods.type_id);
        formData.append('name', updateGoods.name);
        formData.append('category_id', updateGoods.category_id);
        formData.append('unit', updateGoods.unit);
        formData.append('price', updateGoods.price);
        formData.append('picture', updateGoods.picture);
        formData.append('stock', updateGoods.stock);

        onUpdateGoods(formData);
        onClose();
        setUpdateGoods({
            type_id: '',
            name: '',
            category_id: '',
            unit: '',
            price: '',
            picture: '',
            stock: '',
        });
    };

    if (!open) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <button className="close-button" onClick={onClose}>
                    x
                </button>
                <div className="modal-content">
                    <h1 className="text-xl text-gray-800 font-semibold mb-5">Update Goods</h1>
                    {type == 1 ? (
                    <div>
                        <FormControl fullWidth sx={{ marginBottom: 2, marginTop: 2 }}>
                            <InputLabel id="type-label">Type</InputLabel>
                            <Select
                                labelId="type-label"
                                id="type_id"
                                name="type_id"
                                value={updateGoods.type_id}
                                label="Type"
                                onChange={handleInputChange}
                            >
                                {types.map((type) => (
                                    <MenuItem key={type.id} value={type.id}>
                                        {type.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Name"
                            type="text"
                            value={updateGoods.name}
                            onChange={handleInputChange}
                            sx={{ marginBottom: 2 }}
                        />

                        <div className="input-picture">
                            <Button
                                variant="contained"
                                startIcon={<CloudUploadIcon />}
                                component="label"
                                htmlFor="picture"
                                style={{
                                    backgroundColor: '#2196F3',
                                    color: 'white',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                }}
                            >
                                Choose Picture
                                <Input
                                    type="file"
                                    id="picture"
                                    name="picture"
                                    style={{ display: 'none' }}
                                    onChange={handleImageChange}
                                />
                            </Button>
                            {selectedFile && (
                                <p style={{ marginTop: '10px', marginBottom: '-5px', textAlign: 'center' }}>
                                    Selected File: {selectedFile.name}
                                </p>
                            )}
                            {fileSizeError && (
                                <p style={{ marginTop: '10px', marginBottom: '-5px', color: 'red', textAlign: 'center' }}>
                                    {fileSizeError}
                                </p>
                            )}
                        </div>

                        <FormControl fullWidth sx={{ marginBottom: 2, marginTop: 2 }}>
                            <InputLabel id="category-label">Category</InputLabel>
                            <Select
                                labelId="category-label"
                                id="category_id"
                                name="category_id"
                                value={updateGoods.category_id}
                                label="Category"
                                onChange={handleInputChange}
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            fullWidth
                            id="unit"
                            name="unit"
                            label="Unit"
                            type="text"
                            value={updateGoods.unit}
                            onChange={handleInputChange}
                            sx={{ marginBottom: 2 }}
                        />

                        <TextField
                            fullWidth
                            id="price"
                            name="price"
                            label="Price"
                            type="text"
                            value={updateGoods.price}
                            onChange={handleInputChange}
                        />
                        </div>
                    ) : (
                        <div>
                            <TextField
                                fullWidth
                                id="name"
                                name="name"
                                label="Name"
                                type="text"
                                value={updateGoods.name}
                                onChange={handleInputChange}
                                sx={{ marginBottom: 2, marginTop: 2 }}
                                disabled
                            />

                            <TextField
                                fullWidth
                                id="stock"
                                name="stock"
                                label="Stock"
                                type="text"
                                value={updateGoods.stock}
                                onChange={handleInputChange}
                            />
                        </div>
                    )}

                    <div className="action-buttons">
                        <button
                            onClick={handleUpdateGoods}
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
    );
};

export default UpdateGoods;