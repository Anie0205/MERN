const Form = require('../models/Form')

const sendForm = async (req, res) => {
    try {
        const { username, form } = req.body
        const saved = await Form.findOne({ username })
        if (saved) {
            // If the form doesn't exist in the array, append it and save the document
            saved.form.push(form)
            await saved.save()
            return res.status(201).json(saved)
        } else {
            // If no document exists for the username, create a new one
            const savedForm = await Form.create({ username, form: [form] })
            res.status(201).json(savedForm)
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}

const getForm = async (req, res) => {
    try {
        const { username } = req.body
        const savedItems = await Form.findOne({ username })
        res.status(200).json(savedItems)
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}

module.exports = { sendForm, getForm }