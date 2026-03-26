import React, { useState } from 'react'
import "../style/form.scss"
import FormGroup from '../components/FormGroup'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
  const { user, handleRegister } = useAuth()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    await handleRegister({ username, email, password })
    
    if (user) {
      navigate("/")
      setError("")
    }
    else{
      setError("Invalid credentials")
    }
  }
  return (
    <main className="register-page">
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <FormGroup onChange={(e) => setUsername(e.target.value)} label={"username"} value="username" placeholder="Enter your username" />
          <FormGroup onChange={(e) => setEmail(e.target.value)} label={"email"} value="email" placeholder="Enter your email" />
          <FormGroup onChange={(e) => setPassword(e.target.value)} label={"password"} value="password" placeholder="Enter your password" />
          <button type="submit">Register</button>
        </form>
        <p>{error}</p>
      </div>
    </main>
  )
}

export default Register
