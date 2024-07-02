const express = require("express")
const app = express()
const errorMiddleware = require("./Middleware/error")
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cookieParser())

// Route imports
const product = require('./Routes/productRoutes')
const user = require("./Routes/userRoutes")
const order = require('./Routes/orderRoutes')


app.use("/api/v1",product)
app.use("/api/v1",user)
app.use("/api/v1",order)
// error handler middleware
app.use(errorMiddleware)

module.exports = app