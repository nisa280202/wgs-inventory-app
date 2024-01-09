import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import UsersTable from '../components/table/UsersTable'
import AddUser from '../components/modal/AddUser'
import axios from 'axios'
import Swal from 'sweetalert2'

const Users = () => {
    const [openAdd, setOpenAdd] = useState(false);
    const type = parseInt(localStorage.getItem('type'), 10);

    useEffect(() => {
        if (![0, 1].includes(type)) {
            navigate('/unauthorized');
        }
    }, [type]);

    const handleAdd = async (user) => {
        try {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            }
            await axios.post('http://localhost:3030/user', user, config);

            // Menampilkan Sweet Alert ketika penambahan user berhasil
            Swal.fire({
                icon: 'success',
                title: 'Add Success',
                text: 'New user has been successfully added!',
            });
        } catch (error) {
            console.error('Axios Request Error:', error);

            // Menampilkan Sweet Alert ketika penambahan user gagal
            Swal.fire({
                icon: 'error',
                title: 'Add Failed',
                text: 'Failed to add a new user. Please try again.',
            });
        }
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                <Button
                    variant="contained"
                    color="success"
                    startIcon={<AddIcon />}
                    style={{ backgroundColor: "#FF9066", color: "#FFF" }}
                    onClick={() => setOpenAdd(true)}
                    >
                    User
                </Button>
            </div>

            <UsersTable />

            <AddUser open={openAdd} onAddUser={handleAdd} onClose={() => setOpenAdd(false)} />
        </>
    )
}

export default Users