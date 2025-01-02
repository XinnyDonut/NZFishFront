import axios from 'axios'
const baseUrl='/api'

const setToken =(token) => {
  window.localStorage.setItem('fishAppUser', JSON.stringify({token}))
}

const setUserJSON = (userData) => {
  window.localStorage.setItem('fishAppUser', JSON.stringify(userData))
}

const getToken =() => {
  const userJSON=window.localStorage.getItem('fishAppUser')
  return userJSON?JSON.parse(userJSON).token:null
}

const getUser=() => {
  const userJSON=window.localStorage.getItem('fishAppUser')
  return userJSON?JSON.parse(userJSON):null
}

const login = async(credentials) => {
  const response= await axios.post(`${baseUrl}/login`,credentials)
  if(response.data.token){
    setUserJSON(response.data)
  }
  return response.data
}

const register = async (userInfo) => {
  const response= await axios.post(`${baseUrl}/users/register`,userInfo)
  return response.data
}

const logout= ()=>{
  window.localStorage.removeItem('fishAppUser')
}

export default { login,register,logout,getToken,setToken,getUser,setUserJSON}