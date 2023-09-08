const mongoose = require('mongoose')

const submitForm = async (req, res) => {
    try {
        const { formName, formData } = req.body

        // Create a new schema based on the form response
        const formSchema = new mongoose.Schema({}, { strict: false })

        // Create a model based on the schema
        let FormResponse
        try {
            FormResponse = mongoose.model(formName)
        } catch {
            FormResponse = mongoose.model(formName, formSchema)
        }

        // Create a new FormResponse document based on the request body
        const newResponse = new FormResponse(formData)

        // Save the response to the MongoDB database
        await newResponse.save()

        // Respond with a success message
        res.status(200).json(newResponse)
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}

module.exports = { submitForm }