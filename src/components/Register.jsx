import { useNavigate } from "react-router-dom"
import { useState } from 'react'
import authService from '../services/auth'
import { FormContainer, FormGroup, Input, Button }  from'./FormUi'

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
    <FormContainer title='Register'>
      <form onSubmit={handleRegister}>
        <FormGroup label='username'>
          <Input 
            value={username}
            onChange={event=>setUsername(event.target.value)}
            required
          />
        </FormGroup>
        <FormGroup label='name'>
          <Input 
            value={name}
            onChange={event=>setName(event.target.value)}
            required
          />
        </FormGroup>
        <FormGroup label='password'>
          <Input
            type="password" 
            value={password}
            onChange={event=>setPassword(event.target.value)}
            required
            minLength={5}
          />
        </FormGroup>
        <div className="flex justify-end">
          <Button type="submit">Register</Button>
        </div>
      </form>
    </FormContainer>
  )
}

export default Register