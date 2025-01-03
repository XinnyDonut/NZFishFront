import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import fishService from '../services/fish'

const FishDetails= () => {
  const [fish,setFish] =useState(null)
  const [error,setError]=useState(null)
  const { id } =useParams()
  const navigate=useNavigate()

  useEffect(()=>{
    const fetchFish= async ()=>{
      try{
        const data=await fishService.getFish(id)
        setFish(data)
      }catch(err){
        console.error('Error fetching fish', err)
        setError(err.message)
      } 
    }
    fetchFish()
  },[id])

  if (error) return <div>Error: {error}</div>
  if (!fish) return <div>Loading...</div>
  

return (
  <div> 
    {console.log(fish)}
    <button onClick={() => navigate(-1)}> Back to Fish List</button>
    <div>
      {fish.imageUrl&&(
        <img src={fish.imageUrl} alt={fish.name}/>
      )}
      <div>
        <h1>{fish.name}</h1>
        {fish.MaoriName&&(
          <h2>Māori Name: {fish.MaoriName}</h2>
        )}
        <p>{fish.description}</p>
      </div>
    </div>
  </div>
  )
}
export default FishDetails