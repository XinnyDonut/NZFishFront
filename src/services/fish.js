import axios from 'axios'
const baseUrl='/api/fish'

const getAllFish = async () => {
  const response=await axios.get(baseUrl)
  return response.data
}

const getFish= async (id) =>{
  const response=await axios.get(`${baseUrl}/${id}`)
  return response.data
}

export default {getAllFish,getFish}