import { useState,useEffect} from 'react'
import logService from '../services/cookingLog'
import authService from'../services/auth'
import { FormContainer,FormGroup,Input,TextArea,Button } from './FormUi'

const EditForm =({log,handleUpdate,handleCancel,edittedFormData,setEdittedFormData})=>{
  const handleInputChange= (e) => {
    const{name,value} = e.target
    setEdittedFormData({...edittedFormData,[name]:value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleUpdate(edittedFormData)
  }
  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormGroup label='Title'>
          <Input name='name' value={edittedFormData.name} onChange={handleInputChange}/>
        </FormGroup>
        <FormGroup label='Notes'>
          <TextArea name='note' value={edittedFormData.note} onChange={handleInputChange} row="4"/>
        </FormGroup>  
        <Button type="submit" variant='secondary'>update</Button>
        <Button type="button" variant='secondary' onClick={handleCancel}>cancel</Button> 
      </form>   
    </FormContainer>
  )
}

const LogDisplay =({log,user,handleEdit,handleDelete}) => {
  return( 
    <div>
      <h4 className="text-xl font-semibold text-gray-800">
        {log.name}
      </h4>
      <span className="text-sm text-gray-500">
        {new Date(log.createdAt).toLocaleDateString()}
      </span>
    <p className="text-sm text-gray-600 mb-3">
      by {log.user.name}
    </p>
    {log.note && (
      <p className="text-gray-700 whitespace-pre-line">
        {log.note}
      </p>
    )}
      {user&&log.user.username===user.username&&(
      <div className='flex justify-end gap-2 '>
        <Button variant = "secondary" onClick={()=>handleEdit(log)}>Edit</Button>
        <Button variant = "secondary" className='text-red-600' onClick={() => handleDelete(log.id)}>Delete</Button>
      </div>)}  
    </div>
  )
}

const FishCookingLogs= ({fishId,refreshTrigger}) => {
  const [logs,setLogs]=useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingLogId,setEditingLogId]=useState('')
  const[edittedFormData,setEdittedFormData]=useState({name:'',note:''})
  const user=authService.getUser()
  

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


  const handleDelete = async (logId) => {
    if (window.confirm('Are you sure you want to delete this log?')) {
      try {
        await logService.remove(logId);
        setLogs(logs.filter(log => log.id !== logId));
      } catch (err) {
        setError('Failed to delete log');
      }
    }
  }

  const handleEdit = (log)=> {
    setEditingLogId(log.id)
    setEdittedFormData({
      name:log.name,
      note:log.note
    })
  }

  const handleCancel = () => {
    setEditingLogId(null)
    setEdittedFormData({
      name: '',
      note: ''
    })
  }
   
  const handleUpdate =async (formData) => {
   try{
    const updatedLog=await logService.update(editingLogId,formData)
    setLogs(logs.map((log) =>
      log.id === editingLogId ? updatedLog  : log
    ))
    setEditingLogId(null)
    setEdittedFormData({name:'',note:''})
   }catch(err){
    setError('Fail to update log')
   }
  }


  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
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
            No logs yet. Be the first to share your experience!
          </p>
        </div>
      ) : (
        <div className="space-y-6">{/*this is the spacing between logs!*/} 
          {logs.map((log) => (
            <div 
              key={log.id}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
            >
              {log.id===editingLogId
              ?(<EditForm 
                log={log}
                edittedFormData={edittedFormData}
                setEdittedFormData={setEdittedFormData}
                handleUpdate={handleUpdate} 
                handleCancel={handleCancel}/>)
              :(
                <LogDisplay
                log={log}
                user={user} 
                handleDelete={() => handleDelete(log.id)} 
                handleEdit={() => handleEdit(log)}/>      
              )}
            </div>
          ))}
        </div>
    )}
  </div>
)
}
export default FishCookingLogs