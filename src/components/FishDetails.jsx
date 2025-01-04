import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import fishService from '../services/fish'
import CookingLogForm from './CookingLogForm'
import FishCookingLogs from './FishCookingLogs'
import authService from '../services/auth'

const FishDetails= () => {
  const [fish,setFish] =useState(null)
  const [error,setError]=useState(null)
  const [loading, setLoading] = useState(true)
  const[refreshTrigger,setRefreshTrigger]=useState(0)
  const { id } =useParams()
  const navigate=useNavigate()
  const user = authService.getUser()

  useEffect(()=>{
    const fetchFish= async ()=>{
      try{
        const data=await fishService.getFish(id)
        setFish(data)
        setError(null)
      }catch(err){
        setError('Error fetching fish details')
        console.error('Error fetching fish', err)
      }finally{
        setLoading(false)
      } 
    }
    fetchFish()
  },[id])


  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!fish) return <div>Loading...</div>
  
  
  const handleLogCreated = (newLog) => {
    setRefreshTrigger(prev=>prev+1)
  }  

return (
  <div> 
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
    {user && (
        <CookingLogForm 
          fishId={fish.id} 
          onLogCreated={handleLogCreated}
        />
    )}
      
    <FishCookingLogs fishId={fish.id} refreshTrigger={refreshTrigger} />
  </div>
  )
}
export default FishDetails