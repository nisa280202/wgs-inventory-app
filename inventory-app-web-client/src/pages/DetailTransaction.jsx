import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Grid from '@mui/material/Unstable_Grid2'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import moment from "moment"

const DetailTransaction = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [transaction, setTransaction] = useState([])
    const [detailTransactions, setDetailTransactions] = useState([])
    const [goods, setGoods] = useState([])
    const type = localStorage.getItem('type')
    const [formData, setFormData] = useState({
        goods: '',
        stock: '',
        status: '',
    })    

    useEffect(() => {
        async function fetchData() {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                };
                const res = await axios.get(`http://localhost:3030/transaction/${id}`, config)
                setTransaction(res.data.Data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData();
    }, [id]);

    useEffect(() => {
        async function fetchDataGoods() {
            try {
                const res = await axios.get('http://localhost:3030/goods');
                setGoods(res.data.Data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchDataGoods();
    }, []);

    useEffect(() => {
        async function fetchDataDetailTransactions() {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                };
                const res = await axios.get(`http://localhost:3030/detail_transaction/${id}`, config)
                // console.log(res)
                setDetailTransactions(res.data.Data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchDataDetailTransactions();
    }, [id, detailTransactions]);

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        if (name === 'goods') {
            const selectedGood = goods.find((good) => good.id === value);
    
            setFormData({
                ...formData,
                [name]: value,
                goods_id: selectedGood ? selectedGood.id : '',  // Change this line
                stock: selectedGood ? selectedGood.stock : '',
            });            
        } else {
            setFormData({ ...formData, [name]: value });
        }
    }    

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = { 
            transaction_id: id,
            stock: formData.stock, 
            status: transaction.type, 
            goods_id: formData.goods_id,
        }        
        // console.log(data)

        try {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            };
            const response = await axios.post(`http://localhost:3030/detail_transaction`, data, config)
            // return response
            console.log('ini respon ', response)
            Swal.fire({
                icon: 'success',
                title: 'Add Success!',
                text: 'New detail transaction has been successfully added!',
                timer: 2000,
                timerProgressBar: true
            });
            // navigate('/transactions')
        } catch (error) {
            console.error(error)
            Swal.fire({
                icon: 'error',
                title: 'Add Failed',
                text: 'Failed to add a new detail transaction. Please try again.',
                timer: 2000,
                timerProgressBar: true
            });
        }
    }        

    return (
        <>
            <Grid container spacing={2}>
                <Grid xs={6} md={6}>
                    <Card
                        sx={{
                            // maxWidth: 400,
                            marginTop: 3.5,
                            borderRadius: 4,
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <CardContent>
                            {transaction.type == 0 ? (
                                <Typography gutterBottom variant="h5" component="div" sx={{ color: '#1976D2' }}>
                                    Transaction IN
                                </Typography>
                            ) : (
                                <Typography gutterBottom variant="h5" component="div" sx={{ color: '#DB190C' }}>
                                    Transaction OUT
                                </Typography>
                            )}
                            <Typography variant="body2" color="text.secondary">
                                <b>Date:</b> {moment(transaction.date).format("DD/MM/YYYY")}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <b>Sender:</b> {transaction.sender}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <b>Recipient:</b> {transaction.recipient}
                            </Typography>
                        </CardContent>
                    </Card>
                    
                    <Card
                        sx={{
                            // maxWidth: 400,
                            marginTop: 2,
                            borderRadius: 4,
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>No</TableCell>
                                    <TableCell>Goods</TableCell>
                                    <TableCell>Stock</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {detailTransactions.map((detailTransaction, index) => (
                                <TableRow
                                    key={detailTransaction.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {index+1}
                                        {/* 1 */}
                                    </TableCell>
                                    {/* <TableCell>Hollow</TableCell> */}
                                    {/* <TableCell>1000</TableCell> */}
                                    <TableCell>{detailTransaction.goods_name}</TableCell>
                                    <TableCell>{detailTransaction.stock}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </Card>
                </Grid>
                
                <Grid xs={6} md={6}>
                    {type == 2 ? (
                    <Card
                        sx={{
                            // maxWidth: 'full',
                            marginTop: 3.5,
                            borderRadius: 4,
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <CardContent className="title" style={{ marginTop: 5, alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                            <h3 style={{ marginBottom: '30px', textAlign: 'center' }}>Detail Transaction</h3>

                            <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
                                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                                    <InputLabel id="goods-label">Goods</InputLabel>
                                    <Select
                                        labelId="goods-label"
                                        id="goods"
                                        name="goods"
                                        value={formData.goods}
                                        label="Goods"
                                        onChange={handleChange}
                                    >
                                        {goods.map((good) => (
                                            <MenuItem key={good.id} value={good.id}>
                                                {good.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <TextField
                                    fullWidth
                                    id="stock"
                                    name="stock"
                                    label="Stock"
                                    type="number"
                                    value={formData.stock}
                                    onChange={handleChange}
                                />

                                <div className="action-buttons">
                                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md mr-2" style={{ marginRight: "10px", marginBottom: "10px" }}>
                                        Submit
                                    </button>
                                    <Link to='/transactions'>
                                        <button className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded-md">
                                            Cancel
                                        </button>
                                    </Link>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                    ) : null}
                </Grid>
            </Grid>
        </>
    );
};

export default DetailTransaction;