// Form.js
import React, { useState } from 'react'

const Form = ({ field }) => {
    const [responses, setResponses] = useState({})
    const [id, setId] = useState('')
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

    const handleFileSubmit = async (file) => {
        const formData = new FormData()
        formData.append('file', file)
        const response = await fetch('/file/upload', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        })
        if (response.ok) {
            const json = await response.json()
            setId(json._id)
        }
    }

    const handleFileChange = (e, fieldName) => {
        handleFileSubmit(e.target.files[0])
        const updatedResponses = { ...responses }
        updatedResponses[fieldName] = id
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
            {field.type === 'file' && (
                <div>
                    <label>{field.name}</label>
                    <input
                        type="file"
                        onChange={(e) => handleFileChange(e, field.name)}
                    />
                </div>
            )}
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default Form
