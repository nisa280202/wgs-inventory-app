import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './table.scss'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faTrash } from '@fortawesome/free-solid-svg-icons'
import images from '../../constants/images'
import Swal from 'sweetalert2' // Import SweetAlert library
import UpdateUser from '../modal/UpdateUser'

const UsersTable = () => {
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [openUpdate, setOpenUpdate] = useState(false)

    const handleUpdate = (user) => {
        setSelectedUser(user)
        setOpenUpdate(true)
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get('http://localhost:3030/user')
                setUsers(res.data.Data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [users])

    const onUpdateUser = async (user) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }

            await axios.put(`http://localhost:3030/user/${user.id}`, user, config)

            // Menampilkan Sweet Alert ketika update berhasil
            Swal.fire({
                icon: 'success',
                title: 'Update Success',
                text: 'User data has been successfully updated!',
            });
        } catch (error) {
            console.error('Update Request Error: ', error)

            // Menampilkan Sweet Alert ketika update gagal
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: 'Failed to update user data. Please try again.',
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
                await axios.delete(`http://localhost:3030/user/${id}`, config)

                // Cek status response dari server
                Swal.fire('Deleted!', 'Your user has been deleted.', 'success')
                setUsers(users.filter(user => user.id !== id)) // Hapus user dari state lokal
            } catch (error) {
                console.error('Delete Request Error:', error)
                Swal.fire('Error!', 'Failed to delete user.', 'error')
            }
        }
    }

    return (
        <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="tableCell">Role</TableCell>
                        <TableCell className="tableCell">Name</TableCell>
                        <TableCell className="tableCell">Email</TableCell>
                        <TableCell className="tableCell">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell className="tableCell">
                                {(user.type === 0) ? "SUPER ADMIN" : (user.type === 1) ? "OFFICE STAFF" : "WAREHOUSE STAFF"}
                                {/* {(user.type === 0) ? (<Button variant="outlined" color="error" size="small">SUPER ADMIN</Button>) : 
                                (user.type === 1) ? (<Button variant="outlined" color="warning" size="small">ADMIN</Button>) : 
                                (user.type === 2) ? (<Button variant="outlined" size="small">OFFICE STAFF</Button>) : 
                                (<Button variant="outlined" color="secondary" size="small">WAREHOUSE STAFF</Button>)} */}
                            </TableCell>
                            <TableCell className="tableCell">
                                <div className="cellWrapper">
                                    <img src={user.picture === null ? images.defaultImage : `http://localhost:3030/uploads/${user.picture}`} alt="" className="image" />
                                    {user.name}
                                </div>
                            </TableCell>
                            <TableCell className="tableCell">{user.email}</TableCell>
                            <TableCell>
                                <FontAwesomeIcon
                                    icon={faCog}
                                    style={{ color: '#8624DB', marginRight: '8px', fontSize: '16px', cursor: 'pointer' }}
                                    onClick={() => handleUpdate(user)}
                                />
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    style={{ color: '#DB190C', marginLeft: '12px', fontSize: '15.5px', cursor: 'pointer' }}
                                    onClick={() => handleDelete(user.id)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <UpdateUser open={openUpdate} user={selectedUser} onClose={() => setOpenUpdate(false)} onUpdateUser={onUpdateUser} />
        </TableContainer>
    )
}

export default UsersTable