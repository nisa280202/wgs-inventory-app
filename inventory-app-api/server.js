const bodyParser = require('body-parser')
const express = require('express')
require('dotenv').config()
const goodsRoutes = require('./route/goods')
const detailGoodsRoutes = require('./route/detailGoods')
const userRoutes = require('./route/user')
const transactionRoutes = require('./route/transaction')
const detailTransactionRoutes = require('./route/detailTransaction')
const authRoutes = require('./route/auth')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.use('/goods', goodsRoutes)
app.use('/detail_goods', detailGoodsRoutes)
app.use('/user', userRoutes)
app.use('/transaction', transactionRoutes)
app.use('/detail_transaction', detailTransactionRoutes)
app.use('/auth', authRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Listening on Port ${process.env.PORT}`);
})