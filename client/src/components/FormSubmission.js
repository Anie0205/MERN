// FormSubmission.js
import React, { useState } from 'react'
import Form from './Form'

const FormSubmission = () => {
    const [formFields, setFormFields] = useState([])
    const token = sessionStorage.getItem('token')
    const username = sessionStorage.getItem('username')

    const getForm = async () => {
        const response = await fetch('/form/get', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username }),
        })
        if (response.ok) {
            const json = await response.json()
            setFormFields(json.form)
        }
    }

    return (
        <div>
            <h2>Form Submission</h2>
            <button onClick={getForm}>Get Forms</button>
            <form>
                {formFields.map((field, index) => (
                    <div key={index}>
                        <Form field={field} />
                    </div>
                ))}
                
            </form>
        </div>
    )
}

export default FormSubmission
