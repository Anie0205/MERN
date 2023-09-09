const File = require('../models/File')
const fs = require('fs')

const fileUpload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' })
        }
        const { filename, path } = req.file
        const contentType = filename.split('.')[1]

        // Save file information to MongoDB
        const file = new File({ filename, path, contentType })
        await file.save()

        const _id = file._id
        res.status(200).json({ _id })
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}

const fileDownload = async (req, res) => {
    try {
        const _id = req.params.id

        // Find the file in MongoDB based on the filename
        const file = await File.findOne({ _id })

        if (!file) {
            return res.status(404).send('File not found')
        }

        // Set the appropriate content type for the response
        res.contentType(file.contentType)

        // Stream the file content to the response
        const fileStream = fs.createReadStream(file.path)
        fileStream.pipe(res)
    } catch (error) {
        res.status(500).send('Server error')
    }
}

module.exports = { fileUpload, fileDownload }