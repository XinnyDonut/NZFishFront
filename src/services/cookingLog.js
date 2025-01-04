import axios from 'axios'
import authService from './auth'

const baseUrl='/api/logs'

const config = ()=>{
  const token=authService.getToken()
  return {
    headers:
      {Authorization: `Bearer ${token}`}
    
  }
}

const create =async (newLog) => {
  const response= await axios.post(baseUrl,newLog,config())
  return response.data
}

const getByFish= async (fishId) => {
  const response =await axios.get(`${baseUrl}/fish/${fishId}`)
  return response.data 
}

const getProfile=async () => {
  const response=axios.get(`${baseUrl}/my`,config())
  return (await response).data
}


const update = async (id, updatedLog) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedLog, config())
  return response.data
}

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, config())
}

export default{ create,getByFish,getProfile,update,remove}

