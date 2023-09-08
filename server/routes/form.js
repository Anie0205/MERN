const express = require('express')
const router = express.Router()

// controller function
const {
    sendForm,
    getForm
} = require('../controllers/formController')

// User registration
router.post('/create', sendForm)

// User login
router.post('/get', getForm)

module.exports = router