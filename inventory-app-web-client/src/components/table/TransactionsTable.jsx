import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash, faCog } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import UpdateTransaction from '../modal/UpdateTransaction';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const TransactionsTable = () => {
    const [transactions, setTransactions] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [openUpdate, setOpenUpdate] = useState(false);
    const type = localStorage.getItem('type');

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get('http://localhost:3030/transaction');
                setTransactions(res.data.Data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [transactions]);

    const dataGridColumns = [
        { field: 'type', headerName: 'Type', width: 200, renderCell: (params) => params.value === 'IN' ? (
            <Button variant="outlined" size="small">IN</Button>
            ) : (
            <Button variant="outlined" color="error" size="small">OUT</Button>
        ) },
        { field: 'date', headerName: 'Date', width: 200 },
        { field: 'sender', headerName: 'Sender', width: 200 },
        { field: 'recipient', headerName: 'Recipient', width: 200 },
    ];

    // Conditionally add the "Actions" column based on user type
    if (type !== '0') {
        dataGridColumns.push({
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <>
                    <Link to={`/transactions/detail/${params.row.id}`}>
                        {type == 2 ? (
                            <FontAwesomeIcon
                                icon={faEdit}
                                style={{ color: '#3498db', marginLeft: '15px', fontSize: '16px', cursor: 'pointer' }}
                            />
                        ) : (
                            <FontAwesomeIcon 
                                icon={faEye} 
                                style={{ color: '#ED6C02', marginRight: '8px', fontSize: '16px', cursor: 'pointer' }} 
                            />
                        )}
                    </Link>
                    {type == 1 ? ( <div>
                        <FontAwesomeIcon
                            icon={faCog}
                            style={{ color: '#8624DB', marginLeft: '12px', marginRight: '8px', fontSize: '16px', cursor: 'pointer' }}
                            onClick={() => handleUpdate(params.row)}
                        />
                        <FontAwesomeIcon
                            icon={faTrash}
                            style={{ color: '#DB190C', marginLeft: '12px', fontSize: '15.5px', cursor: 'pointer' }}
                            onClick={() => handleDelete(params.row.id)}
                        />
                    </div>) : null}
                </>
            ),
        });
    }

    const dataGridRows = transactions.map((transaction) => ({
        id: transaction.id,
        type: transaction.type === 0 ? 'IN' : 'OUT',
        date: moment(transaction.date).format('DD/MM/YYYY'),
        sender: transaction.sender,
        recipient: transaction.recipient
    }));

    const handleUpdate = (transaction) => {
        setSelectedTransaction(transaction);
        setOpenUpdate(true);
    };

    const onUpdateTransaction = async (transaction) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.put(`http://localhost:3030/transaction/${transaction.id}`, transaction, config);

            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Transaction has been successfully updated.',
            });
        } catch (error) {
            console.error('Update Request Error: ', error);

            Swal.fire({
                icon: 'error',
                title: 'Failed!',
                text: 'An error occurred while updating the transaction.',
            });
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                await axios.delete(`http://localhost:3030/transaction/${id}`, config);

                Swal.fire('Deleted!', 'Your transaction has been deleted.', 'success');
                setTransactions(transactions.filter((transaction) => transaction.id !== id));
            } catch (error) {
                console.error('Delete Request Error:', error);
                Swal.fire('Error!', 'Failed to delete transaction.', 'error');
            }
        }
    };

    return (
        <Paper style={{ height: 450, width: '100%', background: 'white' }}>
            <DataGrid
                rows={dataGridRows}
                columns={dataGridColumns}
                pageSize={5}
                disableSelectionOnClick
            />

            <UpdateTransaction open={openUpdate} transaction={selectedTransaction} onClose={() => setOpenUpdate(false)} onUpdateTransaction={onUpdateTransaction} />
        </Paper>
    );
};

export default TransactionsTable;
