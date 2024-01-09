const bodyParser = require('body-parser')
const express = require('express')
require('dotenv').config()
const goodsRoutes = require('./route/goods')
const userRoutes = require('./route/user')
const transactionRoutes = require('./route/transaction')
const detailTransactionRoutes = require('./route/detailTransaction')
const authRoutes = require('./route/auth')
const categoryRoutes = require('./route/category')
const typeRoutes = require('./route/type')
const dashboardRoutes = require('./route/dashboard')
const cors = require('cors')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use('/uploads', express.static('uploads'));

app.use('/goods', goodsRoutes)
app.use('/user', userRoutes)
app.use('/transaction', transactionRoutes)
app.use('/detail_transaction', detailTransactionRoutes)
app.use('/auth', authRoutes)
app.use('/category', categoryRoutes)
app.use('/type', typeRoutes)
app.use('/dashboard', dashboardRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Listening on Port ${process.env.PORT}`);
})