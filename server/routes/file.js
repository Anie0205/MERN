const express = require('express')
const multer = require('multer')
const router = express.Router()

// File handling
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/') // Destination folder for uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname) // File name with a timestamp
    },
})

const upload = multer({ storage: storage })

// controller function
const {
    fileUpload,
    fileDownload
} = require('../controllers/fileController')

// File upload
router.post('/upload', upload.single('file'), fileUpload)

// File download
router.get('/download/:id', fileDownload)

module.exports = router