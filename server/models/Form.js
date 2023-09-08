const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    form: {
        type: Array,
    },
}, { timestamps: true })

module.exports = mongoose.model('Form', userSchema)