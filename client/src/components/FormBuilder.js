// FormBuilder.js
import React, { useState } from 'react'

const FormBuilder = () => {
    const [formFields, setFormFields] = useState([])
    const [fieldName, setFieldName] = useState('')
    const token = sessionStorage.getItem('token')
    const username = sessionStorage.getItem('username')

    const addTextField = () => {
        if (fieldName.trim() !== '') {
            setFormFields([...formFields, { type: 'text', name: fieldName }])
            setFieldName('')
        }
    }

    const addMCQField = () => {
        if (fieldName.trim() !== '') {
            setFormFields([...formFields, { type: 'mcq', name: fieldName, options: [] }])
            setFieldName('')
        }
    }

    const addFileField = () => {
        if (fieldName.trim() !== '') {
            setFormFields([...formFields, { type: 'file', name: fieldName }])
            setFieldName('')
        }
    }

    const addOption = (index, option) => {
        const updatedFields = [...formFields]
        updatedFields[index].options.push(option)
        setFormFields(updatedFields)
    }

    const removeField = (index) => {
        const updatedFields = [...formFields]
        updatedFields.splice(index, 1)
        setFormFields(updatedFields)
    }

    const handleSubmit = async () => {
        const response = await fetch('/form/create', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username, form: formFields })
        })
        if (response.ok) {
            alert('Form created')
        }
    }

    return (
        <div>
            <h2>Form Builder</h2>
            <div>
                <input
                    type="text"
                    placeholder="Field Name"
                    value={fieldName}
                    onChange={(e) => setFieldName(e.target.value)}
                />
                <button onClick={addTextField}>Add Text Field</button>
                <button onClick={addMCQField}>Add MCQ Field</button>
                <button onClick={addFileField}>Add File Field</button>
            </div>

            <h3>Form Preview</h3>
            <form>
                {formFields.map((field, index) => (
                    <div key={index}>
                        {field.type === 'text' && (
                            <div>
                                <input type="text" name={field.name} placeholder={field.name} />
                                <button onClick={() => removeField(index)}>Remove</button>
                            </div>
                        )}
                        {field.type === 'file' && (
                            <div>
                                <input type="file" name={field.name} />
                                <button onClick={() => removeField(index)}>Remove</button>
                            </div>
                        )}
                        {field.type === 'mcq' && (
                            <div>
                                <input type="text" placeholder={field.name} />
                                <ul>
                                {field.options.map((option, optionIndex) => (
                                    <li key={optionIndex}>{option}</li>
                                ))}
                                </ul>
                                <input
                                    type="text"
                                    placeholder="Add an option"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            addOption(index, e.target.value)
                                            e.target.value = ''
                                        }
                                    }}
                                />
                                <button onClick={() => removeField(index)}>Remove</button>
                            </div>
                        )}
                    </div>
                ))}
            </form>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default FormBuilder
