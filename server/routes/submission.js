const express = require('express')
const router = express.Router()

// controller function
const {
    submitForm
} = require('../controllers/submissionController')

// User submission
router.post('/submit', submitForm)

module.exports = router