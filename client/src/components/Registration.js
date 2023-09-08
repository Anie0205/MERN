// Registration.js
import React, { useState } from 'react'

const UserRegistration = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleRegister = async () => {
        // Send registration data to the backend
        try {
            const response = await fetch('/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })
            if (response.ok) {
                alert('Registered successfully')
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
        </div>
    )
}

export default UserRegistration
