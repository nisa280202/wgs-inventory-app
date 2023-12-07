const bodyParser = require('body-parser')
const express = require('express')
require('dotenv').config()
const goodsRoutes = require('./route/goodsRoutes')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.use('/goods', goodsRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Listening on Port ${process.env.PORT}`);
})