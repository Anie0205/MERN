import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ChakraProvider } from "@chakra-ui/react"
import UserRegistration from './components/Registration'
import UserLogin from './components/Login'
import FormBuilder from './components/FormBuilder'
import FormSubmission from './components/FormSubmission'

function App() {
  return (
    <ChakraProvider>
      <Router>
        <div>
          <Routes>
            {/* Public Routes */}
            <Route path="/register" element={<UserRegistration />} />
            <Route path="/login" element={<UserLogin />} />
            
            {/* Private Routes */}
            <Route path="/create" element={<FormBuilder />} />
            <Route path="/submission/:id" element={<FormSubmission />} />

            {/* Add more routes as needed */}
          </Routes>
        </div>
      </Router>
    </ChakraProvider>
  )
}

export default App