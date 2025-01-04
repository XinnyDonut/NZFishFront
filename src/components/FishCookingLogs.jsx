import { useState,useEffect} from 'react'
import logService from '../services/cookingLog'

const FishCookingLogs= ({fishId,refreshTrigger}) => {
  const [logs,setLogs]=useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect( ()=>{
    const fetchLogs= async ()=>{
      try{
        const logs=await logService.getByFish(fishId)
        setLogs(logs)
        setError(null)
      }catch(err){
        setError(`Failed to fetch cooking logs`)
      }finally{
        setLoading(false)
      }
    }
    fetchLogs()
  },[fishId,refreshTrigger])

  if (loading) return <div>Loading cooking logs...</div>
  if (error) return <div>{error}</div>

  return(
    <div>
      <h3>How to cook me</h3>
      {logs.length === 0 ? (
        <p>No cooking logs yet. Be the first to share your experience!</p>
      ) : (
        <div>
          {logs.map((log) => (
            <div key={log.id}>
              <h4>{log.name}</h4>
              <p>by {log.user.name}</p>
              {log.note && <p>{log.note}</p>}
              <p>{new Date(log.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FishCookingLogs