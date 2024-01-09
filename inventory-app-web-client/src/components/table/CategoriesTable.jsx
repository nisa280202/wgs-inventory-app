import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCog } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Swal from 'sweetalert2'
import UpdateCategory from '../modal/UpdateCategory'

const CategoriesTable = () => {
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [openUpdate, setOpenUpdate] = useState(false)
    const type = localStorage.getItem('type')

    const handleUpdate = (category) => {
        setSelectedCategory(category)
        setOpenUpdate(true)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3030/category');
                setCategories(response.data.Data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [categories])

    const onUpdateCategory = async (category) => {
        try {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            await axios.put(`http://localhost:3030/category/${category.id}`, category, config)

            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Category has been successfully updated.'
            });
        } catch (error) {
            console.error('Update Request Error: ', error)

            Swal.fire({
                icon: 'error',
                title: 'Failed!',
                text: 'An error occurred while updating the category.'
            });
        }
    }

    const handleDelete = async (id) => {
        // Menampilkan konfirmasi SweetAlert
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })

        // Jika pengguna menekan tombol 'Yes'
        if (result.isConfirmed) {
            try {
                const token = localStorage.getItem('token');
                    const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
                await axios.delete(`http://localhost:3030/category/${id}`, config)

                // Cek status response dari server
                Swal.fire('Deleted!', 'Your category has been deleted.', 'success')
                setCategories(categories.filter(category => category.id !== id)) // Hapus category dari state lokal
            } catch (error) {
                console.error('Delete Request Error:', error)
                Swal.fire('Error!', 'Failed to delete category.', 'error')
            }
        }
    }

    return (
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>Category Name</TableCell>
                        {type == 1 ? <TableCell>Actions</TableCell> : null}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories.map((category, index) => (
                        <TableRow
                        key={category.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {index+1}
                            </TableCell>
                            <TableCell>{category.name}</TableCell>
                            {type == 1 ? (
                                <TableCell>
                                    <FontAwesomeIcon
                                        icon={faCog}
                                        style={{ color: '#8624DB', marginRight: '8px', fontSize: '16px', cursor: 'pointer' }}
                                        onClick={() => handleUpdate(category)}
                                    />
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        style={{ color: '#DB190C', marginLeft: '12px', fontSize: '15.5px', cursor: 'pointer' }}
                                        onClick={() => handleDelete(category.id)}
                                    />
                                </TableCell>
                            ) : null}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <UpdateCategory open={openUpdate} category={selectedCategory} onClose={() => setOpenUpdate(false)} onUpdateCategory={onUpdateCategory} />
        </TableContainer>
    )
}

export default CategoriesTable