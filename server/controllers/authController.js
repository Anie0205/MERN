const jwt = require('jsonwebtoken')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const sessionStorage = require('node-sessionstorage')

const createToken = (id) => {
    return jwt.sign({ _id: id}, process.env.SECRET, { expiresIn: "3d" })
}

const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body
        
        const already = await User.findOne({ username })
        if (already) {
            return res.status(400).json({ message: 'Already a registered user' })
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create a new user
        const user = User.create({
            username,
            password: hashedPassword,
        })
        const token = createToken(user._id)

        sessionStorage.setItem('token', token)
        sessionStorage.setItem('username', username)
        res.status(200).json({ message: 'Registered successfully' })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const loginUser = async (req, res) => {
    const { username, password } = req.body
    
    const user = await User.findOne({ username })
    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
        return res.status(400).json({ message: 'Invalid password' })
    }

    const token = createToken(user._id)
    sessionStorage.setItem('token', token)
    sessionStorage.setItem('username', username)
    res.status(200).json({ message: 'Login successful' })
}

module.exports = { loginUser, registerUser }