// Form.js
import React, { useState } from 'react'

const Form = ({ field }) => {
    const [responses, setResponses] = useState({})
    const token = sessionStorage.getItem('token')

    const handleSubmit = async () => {
        // Send responses to the backend or perform further processing
        const response = await fetch('/response/submit', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ formName: 'response', formData: responses }),
        })
        if (response.ok) {
            alert('Response submitted successfully')
        }
    }

    const handleTextChange = (e, fieldName) => {
        const updatedResponses = { ...responses }
        updatedResponses[fieldName] = e.target.value
        setResponses(updatedResponses)
    }

    const handleMCQChange = (e, fieldName) => {
        const updatedResponses = { ...responses }
        updatedResponses[fieldName] = e.target.value
        setResponses(updatedResponses)
    }

    return (
        <div>
            {field.type === 'text' && (
                <div>
                    <label htmlFor={field.name}>{field.name}</label>
                    <input
                        type="text"
                        id={field.name}
                        name={field.name}
                        onChange={(e) => handleTextChange(e, field.name)}
                    />
                </div>
            )}
            {field.type === 'mcq' && (
                <div>
                    <label>{field.name}</label>
                    <select onChange={(e) => handleMCQChange(e, field.name)}>
                        <option value="">Select an option</option>
                        {field.options.map((option, optionIndex) => (
                            <option key={optionIndex} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default Form
