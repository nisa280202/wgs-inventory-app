import React, { useState, useEffect } from 'react'
import validator from 'validator'
import './add-modal.scss'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Input from '@mui/material/Input'
import TextField from '@mui/material/TextField'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

const UpdateUser = ({ open, onClose, onUpdateUser, user }) => {
    const [selectedFile, setSelectedFile] = useState(null)
    const [fileSizeError, setFileSizeError] = useState(null)
    const [updateUser, setUpdateUser] = useState({
        id: '',
        name: '',
        email: '',
        picture: '',
        type: '',
    })
    
    useEffect(() => {
        if (user) {
            setUpdateUser((prevUser) => ({
                ...prevUser,
                id: user.id || '',
                name: user.name || '',
                email: user.email || '',
                picture: user.picture || '',
                type: user.type || '',
            }));
        }
    }, [user]);

    const [emailValid, setEmailValid] = useState(true);
    const [roleValid, setRoleValid] = useState(true);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateUser((prevUser) => ({
        ...prevUser,
        [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
        // console.log(imageFile)
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

            setUpdateUser((prevUser) => ({
                ...prevUser,
                picture: imageFile,
            }));
        }
        setSelectedFile(imageFile)
    }    

    const handleUpdateUser = () => {
        if (validator.isEmail(updateUser.email)) {
            setEmailValid(true);
        } else {
            setEmailValid(false);
            return; // Stop execution if email is invalid
        }
    
        // Log the id value to debug
        // console.log('User ID:', updateUser.id);
    
        // Create FormData and append data
        const formData = new FormData();
        formData.append('id', updateUser.id);
        formData.append('name', updateUser.name);
        formData.append('email', updateUser.email);
        formData.append('type', updateUser.type);
        formData.append('picture', updateUser.picture);
    
        // console.log(formData);
    
        onUpdateUser(formData); // Pass FormData to the onUpdateUser function
        onClose();
        setUpdateUser({
            name: '',
            email: '',
            picture: '',
            type: '',
        })
    }
    
    if (!open) {
        return null
    }

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <button className="close-button" onClick={onClose}>x</button>
                <div className="modal-content">
                    <h1 className="text-lg text-gray-400 font-semibold mb-7">Update User</h1>
                    {!emailValid && <div className="invalid-message">Invalid Email Format!</div>}
                    {!roleValid && <div className="invalid-message">Invalid Role!</div>}
                    
                    <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Name"
                        type="text"
                        value={updateUser.name}
                        onChange={handleInputChange}
                        sx={{ marginBottom: 2, marginTop: 2 }}
                    />

                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        value={updateUser.email}
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

                    <FormControl fullWidth sx={{ marginTop: 2 }}>
                        <InputLabel id="type-label">Role</InputLabel>
                        <Select
                            labelId="type-label"
                            id="type"
                            name="type"
                            value={updateUser.type}
                            label="Role"
                            onChange={handleInputChange}
                        >
                            <MenuItem value="1">Office Staff</MenuItem>
                            <MenuItem value="2">Warehouse Staff</MenuItem>
                        </Select>
                    </FormControl>
                    
                    <div className="action-buttons">
                        <button
                            onClick={handleUpdateUser}
                            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md mr-2"
                        >
                            Update
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

export default UpdateUser
