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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-600">Loading cooking logs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-md">
        {error}
      </div>
    );
  }

  return(
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        Community Logs
      </h3>
      
      {logs.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600">
            No cooking logs yet. Be the first to share your experience!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {logs.map((log) => (
            <div 
              key={log.id}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-xl font-semibold text-gray-800">
                  {log.name}
                </h4>
                <span className="text-sm text-gray-500">
                  {new Date(log.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">
                by {log.user.name}
              </p>
              
              {log.note && (
                <p className="text-gray-700 whitespace-pre-line">
                  {log.note}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FishCookingLogs