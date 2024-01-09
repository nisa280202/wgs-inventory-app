import React from 'react'
import { Card, CardContent, Typography, CardMedia } from '@mui/material'

const DetailGoods = ({ open, onClose, goods }) => {
    if (!open) {
        return null
    }

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <button className="close-button" onClick={onClose}>x</button>
                <div className="modal-content">
                    <Card style={{ border: 'none', margin: '20px', borderRadius: '8px' }}>
                        <CardMedia
                            component="img"
                            alt={goods.name}
                            height="240"
                            image={`http://localhost:3030/uploads/${goods.picture}`}
                            style={{
                                objectFit: 'cover',
                                borderTopLeftRadius: '8px',
                                borderTopRightRadius: '8px',
                                // marginTop: '20px', // Tambahkan margin atas di sini
                            }}
                        />

                        <CardContent>
                            <Typography variant="h5" align="center" style={{ marginBottom: '10px' }}>
                                {goods.name}
                            </Typography>
                            <Typography color="text.secondary"><b>Type:</b> {goods.type_name}</Typography>
                            <Typography color="text.secondary"><b>Category:</b> {goods.category_name}</Typography>
                            <Typography color="text.secondary"><b>Unit:</b> {goods.unit}</Typography>
                            <Typography color="text.secondary"><b>Price:</b> Rp {goods.price.toLocaleString()}</Typography>
                            <Typography color="text.secondary"><b>Stock:</b> {goods.stock}</Typography>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default DetailGoods