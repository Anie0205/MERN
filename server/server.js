require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

// Express App
const app = express()
const port = process.env.PORT
const dbUrl = process.env.URL

// Middleware
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

// Routes for user authentication
app.use('/auth', require('./routes/auth'))
app.use('/form', require('./routes/form'))
app.use('/response', require('./routes/submission'))

// Database connection
mongoose.set("strictQuery", false)

mongoose
    .connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(port, () => {})
    })

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB')
})

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err)
})

mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB')
})