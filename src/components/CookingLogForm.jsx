import { useState,useEffect } from "react"
import logService from'../services/cookingLog'
import authService from'../services/auth'
import { FormContainer, FormGroup, Input, TextArea, Button }  from'./FormUi'

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
      <FormContainer title='Note down your cooking experience' error={error}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormGroup label='Title'>
          <Input
          type="text" value={name} onChange={e=>setName(e.target.value)} required
          />
          </FormGroup>

          <FormGroup label="Cooking Notes">
          <TextArea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Share your cooking tips here!"
            rows="4"
          />
        </FormGroup>

          <div className="flex justify-end">
            <Button type="submit">Share</Button>
          </div>
        </form>
      </FormContainer>
    )
  }
export default CookingLogForm