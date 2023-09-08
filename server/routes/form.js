const express = require('express')
const router = express.Router()

// controller function
const {
    sendForm,
    getForm
} = require('../controllers/formController')

// Form creation
router.post('/create', sendForm)

// Form fetch
router.post('/get', getForm)

module.exports = router