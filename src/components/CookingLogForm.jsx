import { useState,useEffect } from "react"
import logService from'../services/cookingLog'
import authService from'../services/auth'

const CookingLogForm = ({ fishId, onLogCreated}) => {
  const [name,setName]=useState('')
  const [note,setNote]=useState('')
  const [error,setError]=useState(null)

  useEffect(() => {
    const user = window.localStorage.getItem('fishAppUser')
    console.log('Stored user data:', user)
    console.log('Parsed user data:', JSON.parse(user))
    console.log('Token from auth service:', authService.getToken())
  }, [])


  const handleSubmit= async(e)=>{
    e.preventDefault()
    try{
      const newLog= await logService.create({
        fishId,
        name,
        note
      })
      setName('')
      setNote('')
      setError(null)

      onLogCreated(newLog)

    }catch(err){
      console.error('error create log',err.message)
      setError(err.response?.data?.error || 'Failed to create log')
    }
  }

    return(
      <div>
        <h3>Add Your Cooking experience</h3>
        {error&&<div>{error}</div>}
        <form onSubmit={handleSubmit}>
        <div>
          <label>Recipe name:</label>
          <input
          type="text" value={name} onChange={e=>setName(e.target.value)} required
          />
        </div>

        <div>
          <label>Cooking Notes:</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows="8"
          />
        </div>
        <button type="submit">Add Cooking Log</button>
        </form>
      </div>
    )
  }
export default CookingLogForm