const bodyParser = require('body-parser')
const express = require('express')
require('dotenv').config()
const goodsRoutes = require('./route/goodsRoutes')
const detailGoodsRoutes = require('./route/detailGoodsRoutes')
const userRoutes = require('./route/userRoutes')
const transactionRoutes = require('./route/transactionRoutes')
const detailTransactionRoutes = require('./route/detailTransactionRoutes')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.use('/goods', goodsRoutes)
app.use('/detail_goods', detailGoodsRoutes)
app.use('/user', userRoutes)
app.use('/transaction', transactionRoutes)
app.use('/detail_transaction', detailTransactionRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Listening on Port ${process.env.PORT}`);
})