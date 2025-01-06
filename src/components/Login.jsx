import { useState } from "react"
import { useNavigate } from "react-router-dom"
import authService from '../services/auth'
import { FormContainer, FormGroup, Input, Button }  from'./FormUi'


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
    <FormContainer title='Login' error={error}>
      <form onSubmit={handleLogin}>
        <FormGroup label="username">
          <Input
            value={username}
            onChange={e=>setUserName(e.target.value)}
          />
        </FormGroup>
        <FormGroup label="Password">
          <Input
            type="password"
            value={password}
            onChange={e=>setPassword(e.target.value)}
          />
        </FormGroup>
        <div className="flex justify-end">
          <Button type="submit">Log in</Button>
        </div>
      </form>
    </FormContainer>
  )
}
export default Login