import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import axios from 'axios'
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faTrash, faCog } from '@fortawesome/free-solid-svg-icons'
import images from '../../constants/images'
import UpdateGoods from '../modal/UpdateGoods'
import { TablePagination } from '@mui/material'
import DetailGoods from '../modal/DetailGoods'

const GoodsTable = ({ searchQuery }) => {
    const [originalGoods, setOriginalGoods] = useState([])
    const [selectedGoods, setSelectedGoods] = useState(null)
    const [openUpdate, setOpenUpdate] = useState(false)
    const [openDetail, setOpenDetail] = useState(false)
    const [types, setTypes] = useState([])
    const [categories, setCategories] = useState([])
    const [page, setPage] = useState(0)
    const [rowPerPage, setRowPerPage] = useState(5)
    const type = localStorage.getItem('type')

    useEffect(() => {
        const fetchTypesAndCategories = async () => {
            try {
                const typesResponse = await axios.get('http://localhost:3030/type');
                const categoriesResponse = await axios.get('http://localhost:3030/category');

                setTypes(typesResponse.data.Data);
                setCategories(categoriesResponse.data.Data);
            } catch (error) {
                console.error('Error fetching types and categories:', error);
            }
        };

        fetchTypesAndCategories();
    }, []);

    const handleUpdate = (goods) => {
        setSelectedGoods(goods);
        setOpenUpdate(true);
    };

    const handleDetail = (goods) => {
        setSelectedGoods(goods);
        setOpenDetail(true);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3030/goods');
                setOriginalGoods(response.data.Data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [originalGoods])

    const goods = searchQuery
        ? originalGoods.filter(
            (item) =>
                item.name &&
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (item.category &&
                item.category.toLowerCase().includes(searchQuery.toLowerCase()))
            )
        : originalGoods;


    const onUpdateGoods = async (updatedGoods) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            await axios.put(`http://localhost:3030/goods/${updatedGoods.id}`, updatedGoods, config);

            // Update the local goods state after successful update
            setOriginalGoods((prevGoods) =>
                prevGoods.map((item) =>
                    item.id === updatedGoods.id ? { ...item, ...updatedGoods } : item
                )
            );

            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Goods has been successfully updated.'
            });
        } catch (error) {
            console.error('Update Request Error: ', error);

            Swal.fire({
                icon: 'error',
                title: 'Failed!',
                text: 'An error occurred while updating the goods.'
            });
        }
    };

    const handleDelete = async (id) => {
        // Menampilkan konfirmasi SweetAlert
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        });

        // Jika pengguna menekan tombol 'Yes'
        if (result.isConfirmed) {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                await axios.delete(`http://localhost:3030/goods/${id}`, config);

                // Cek status response dari server
                Swal.fire('Deleted!', 'Your goods has been deleted.', 'success');

                // Hapus goods dari state lokal
                setOriginalGoods((prevGoods) => prevGoods.filter((item) => item.id !== id));
            } catch (error) {
                console.error('Delete Request Error:', error);
                Swal.fire('Error!', 'Failed to delete goods.', 'error');
            }
        }
    }

    const handlePageChange = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowPerPage = (event) => {
        setRowPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    // console.log(goods)

    return (
        <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {/* <TableCell className="tableCell" align="center">No</TableCell> */}
                        <TableCell className="tableCell" align="center">Picture</TableCell>
                        <TableCell className="tableCell">Name</TableCell>
                        <TableCell className="tableCell">Type</TableCell>
                        <TableCell className="tableCell">Category</TableCell>
                        <TableCell className="tableCell">Stock</TableCell>
                        {type == 1 || type == 2 ? <TableCell className="tableCell">Actions</TableCell> : null}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowPerPage > 0 ? goods.slice(
                        page * rowPerPage,
                        page * rowPerPage + rowPerPage
                    ) : goods).map((goods) => (
                        <TableRow key={goods.id}>
                            <TableCell className="tableCell" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img
                                    src={goods.picture ? `http://localhost:3030/uploads/${goods.picture}` : images.defaultGoods}
                                    alt="Goods"
                                    style={{ float: 'left', width: '80px', objectFit: 'contain' }}
                                />
                            </TableCell>
                            <TableCell className="tableCell">{goods.name}</TableCell>
                            <TableCell className="tableCell">{goods.type_name}</TableCell>
                            <TableCell className="tableCell">{goods.category_name}</TableCell>
                            <TableCell className="tableCell">{goods.stock}</TableCell>
                            {type == 1 || type == 2 ? (
                                <TableCell>
                                    <FontAwesomeIcon 
                                        icon={faEye} 
                                        style={{ color: '#ED6C02', marginRight: '8px', fontSize: '16px', cursor: 'pointer' }} 
                                        onClick={() => handleDetail(goods)}
                                    />
                                    <FontAwesomeIcon 
                                        icon={faCog} 
                                        style={{ color: '#8624DB', marginLeft: '12px', marginRight: '8px', fontSize: '16px', cursor: 'pointer' }}
                                        onClick={() => handleUpdate(goods)}
                                    />
                                    {type == 1 ? (
                                        <FontAwesomeIcon 
                                            icon={faTrash} 
                                            style={{ color: '#DB190C', marginLeft: '12px', fontSize: '15.5px', cursor: 'pointer' }} 
                                            onClick={() => handleDelete(goods.id)}
                                        />
                                    ) : null}
                                </TableCell>
                            ) : null}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination 
                style={{ backgroundColor: "#F5F5F5" }}
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={goods.length}
                rowsPerPage={rowPerPage}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleChangeRowPerPage}
            />

            <UpdateGoods
                open={openUpdate}
                onClose={() => setOpenUpdate(false)}
                onUpdateGoods={onUpdateGoods}
                goods={selectedGoods}
                types={types}
                categories={categories}
            />
            {/* <UpdateGoods open={openUpdate} onClose={() => setOpenUpdate(false)} onUpdateGoods={onUpdateGoods} goods={selectedGoods} /> */}
            
            <DetailGoods goods={selectedGoods} open={openDetail} onClose={() => setOpenDetail(false)} />

        </TableContainer>
    )
}

export default GoodsTable