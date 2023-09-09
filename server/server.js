require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const fs = require('fs')

// Express App
const app = express()
const port = process.env.PORT
const dbUrl = process.env.URL

// Middleware
app.use(express.json())
app.use(express.static('uploads'))
app.use(cors())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

// Routes for users
app.use('/auth', require('./routes/auth'))
app.use('/form', require('./routes/form'))
app.use('/response', require('./routes/submission'))
app.use('/file', require('./routes/file'))

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

// Upload folder existence
fs.readdir('./', (err, files) => {
    if (err) {
        console.error(`Error reading directory: ${err}`)
        return
    }
    if (!files.includes('uploads')) {
        fs.mkdir('./uploads', { recursive: true }, (err) => {
            if (err) {
                console.error(`Error creating directory: ${err}`)
            } else {
                console.log('Directory created successfully')
            }
        })
    }
})