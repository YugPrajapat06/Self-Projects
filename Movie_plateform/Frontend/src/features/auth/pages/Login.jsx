import React, { useState } from 'react'
import "../style/form.scss"
import FormGroup from '../components/FormGroup'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const Login = () => {
    const {user, loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    
    async function handleSubmit(e) {
        e.preventDefault()
        await handleLogin({ email, password })
        console.log(user)
        if(user){ 
            navigate("/")
            setError("")
        }
        else{setError("Invalid email or password")} // Navigate to home when user login successfully.
    }
    return (
        <main className="login-page">
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <FormGroup
                        
                        
                        label = "email"
                        onChange = {
                            (e) => {
                                setEmail(e.target.value)
                            }
                        }
                        placeholder="Enter your email"
                    />
                    <FormGroup
                        
                      
                        label = "password"
                        onChange = {
                            (e) => {setPassword(e.target.value)}
                        }
                        placeholder="Enter your password"
                    />
                    <button type="submit">Login</button>
                </form>
                <p>{error}</p>
            </div>
        </main>
    )
}

export default Login
