import { useState,useEffect } from "react"
import fishService from '../../services/fish'
import { Link } from 'react-router-dom'

const FishList= () => {
  const[fishes,setFishes] =useState([])

  useEffect(()=>{
    const fetchAll=async () => {
      try{
        const data= await fishService.getAllFish()
        setFishes(data)
      }catch(err){
        console.err('err fetch fish:',err)
      }  
    }

    fetchAll()  
  },[])

  return(
   
    <>
    <h1>New Zealand Fish Cooking Guide </h1>
    {fishes.map((fish) => (
      <Link to={`/fish/${fish.id}`} key={fish.id}>
        {fish.imageUrl && <img src={fish.imageUrl} alt={fish.name} />}
        <div>
          <h2>{fish.name}</h2>
          {fish.MaoriName && <p>Māori Name: {fish.MaoriName}</p>}
          <p>{fish.description}</p>
        </div>
      </Link>
    ))}
    </>
  )
}

export default FishList