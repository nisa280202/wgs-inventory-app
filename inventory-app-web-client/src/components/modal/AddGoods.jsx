import React, { useState, useEffect } from 'react'
import './add-modal.scss'
import Button from '@mui/material/Button'
import Input from '@mui/material/Input'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import axios from 'axios'

const AddGoods = ({ open, onClose, onAddGoods }) => {
    const [types, setTypes] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedFile, setSelectedFile] = useState(null)
    const [fileSizeError, setFileSizeError] = useState(null)
    const [newGoods, setNewGoods] = useState({
        type_id: '',
        name: '',
        category_id: '',
        unit: '',
        price: '',
        picture: null,
        stock: 0
    })

    useEffect(() => {
        async function fetchDataTypes() {
            try {
                const res = await axios.get('http://localhost:3030/type');
                setTypes(res.data.Data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchDataTypes();
    }, []);

    useEffect(() => {
        async function fetchDataCategories() {
            try {
                const res = await axios.get('http://localhost:3030/category');
                setCategories(res.data.Data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchDataCategories();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setNewGoods((prevGoods) => ({
            ...prevGoods,
            [name]: value,
        }))
    }
    
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
            // Set the image file if it meets the size criteria
            setNewGoods((prevGoods) => ({
                ...prevGoods,
                picture: imageFile,
            }));
        }
        setSelectedFile(imageFile);
    }

    const handleAddGoodsClick = () => {
        // Create FormData and append data
        const formData = new FormData();
        formData.append('type_id', newGoods.type_id);
        formData.append('name', newGoods.name);
        formData.append('category_id', newGoods.category_id);
        formData.append('unit', newGoods.unit);
        formData.append('price', newGoods.price);
        formData.append('picture', newGoods.picture);
        formData.append('stock', newGoods.stock);

        onAddGoods(formData)
        onClose()
        setNewGoods({
            type_id: '',
            name: '',
            category_id: '',
            unit: '',
            price: '',
            picture: null,
            stock: 0
        })
    }

    if (!open) {
        return null
    }

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <button className="close-button" onClick={onClose}>
                    x
                </button>
                <div className="modal-content">
                    <h1 className="text-xl text-gray-800 font-semibold mb-5">Add New Goods</h1>
                    <FormControl fullWidth sx={{ marginBottom: 2, marginTop: 2 }}>
                        <InputLabel id="type-label">Type</InputLabel>
                        <Select
                            labelId="type-label"
                            id="type_id"
                            name="type_id"
                            value={newGoods.type_id}
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
                        value={newGoods.name}
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
                            value={newGoods.category_id}
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
                        value={newGoods.unit}
                        onChange={handleInputChange}
                        sx={{ marginBottom: 2 }}
                    />

                    <TextField
                        fullWidth
                        id="price"
                        name="price"
                        label="Price"
                        type="text"
                        value={newGoods.price}
                        onChange={handleInputChange}
                    />

                    <div className="action-buttons">
                        <button
                            onClick={handleAddGoodsClick}
                            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md mr-2"
                        >
                            Add Goods
                        </button>
                        <button onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded-md">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddGoods