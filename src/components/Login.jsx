import { useState } from "react"
import { useNavigate } from "react-router-dom"
import authService from '../services/auth'

const Login = ({setUser}) => {
  const [username,setUserName]=useState('')
  const [password,setPassword]=useState('')
  const [error, setError] = useState(null)
  const navigate= useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const userData=await authService.login({ username,password })
      setUser(userData)
      setUserName('')
      setPassword('')
      navigate('/')
    }catch(err){
      setError('Invalid username or password')
      console.err('Login error',err)
    }
  }
  return (
    <div>
      <h2>Log in</h2>
      {error && <div>{error}</div>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type='text' value={username}
            onChange= {event=>setUserName(event.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password" value={password}
            onChange={event=>setPassword(event.target.value)}
            required
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}
export default Login