import React, { useState } from 'react'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import TransactionsTable from '../components/table/TransactionsTable'
import AddTransaction from '../components/modal/AddTransaction'
import axios from 'axios'
import Swal from 'sweetalert2'

const Transactions = () => {
    const [openAdd, setOpenAdd] = useState(false)
    const type = localStorage.getItem('type')

    const handleAdd = async (transaction) => { 
        try {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            }
            await axios.post('http://localhost:3030/transaction', transaction, config) 

            // Tampilkan Sweet Alert jika berhasil
            Swal.fire({
                icon: 'success',
                title: 'Transaction Added!',
                text: 'The transaction has been added successfully.',
            });
        } catch (error) {
            console.error('Axios Request Error:', error);

            // Tampilkan Sweet Alert jika terjadi kesalahan
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to add the transaction. Please try again.',
            });
        }
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                {type == 1 ? (
                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<AddIcon />}
                        style={{ backgroundColor: "#FF9066", color: "#FFF" }}
                        onClick={() => setOpenAdd(true)}
                    >
                        Transaksi
                    </Button>
                ) : null}
            </div>
            <TransactionsTable />

            <AddTransaction open={openAdd} onAddTransaction={handleAdd} onClose={() => setOpenAdd(false)} />
        </>
    )
}

export default Transactions