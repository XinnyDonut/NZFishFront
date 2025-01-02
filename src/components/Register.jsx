import { useNavigate } from "react-router-dom"
import { useState } from 'react'
import authService from '../services/auth'

const Register =({setUser}) => {
  const[username,setUsername]=useState('')
  const[password,setPassword]=useState('')
  const[name,setName]=useState('')
  const[error,setError]=useState(null)
  const navigate=useNavigate()

  const validatePassword = (password) => {
    if (password.length < 5) {
      return 'Password must be at least 5 characters long'
    }
    return null
  }

  const handleRegister=async (e) => {
    e.preventDefault()

    const passwordError = validatePassword(password)
    if (passwordError) {
      setError(passwordError)
      return
    }

    try {
      const registerResponse = await authService.register({username, name, password})
      if (registerResponse) {
          const userData = await authService.login({ username, password })
          setUser(userData)
          setUsername('')
          setName('')
          setPassword('')
          setError(null)
          navigate('/')
      }
    } catch(err) {
        console.error('Error Register', err)
        setError(err.response?.data?.error || 'Registration failed')
    }
  }

  return (
    <div>
      <h2>Register</h2>
      {error && <div>{error}</div>}
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            value={username}
            onChange={event=>setUsername(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
            <input
              type="text"
              value={name}
              onChange={event=>setName(event.target.value)}
            />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
            <input
              type="password"
              value={password}
              onChange={event=>setPassword(event.target.value)}
              required
              minLength={5}
            />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register