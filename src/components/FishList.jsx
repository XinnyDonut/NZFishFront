import { useState,useEffect } from "react"
import fishService from '../services/fish'
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
    <div className="py-12">
     <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
    {fishes.map((fish) => (
      <Link to={`/fish/${fish.id}`} key={fish.id}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
         {fish.imageUrl && (
                <div className="relative">
                  <img 
                    src={fish.imageUrl} 
                    alt={fish.name} 
                    className="w-full h-auto object-contain"
                  />
                </div>
              )}
           <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{fish.name}</h3>
                {fish.MaoriName && (
                  <p className="text-gray-600 text-sm mb-2">
                    Māori Name: {fish.MaoriName}
                  </p>
                )}
                <p className="text-gray-700 text-sm line-clamp-2">
                  {fish.description}
                </p>
              </div>
      </Link>
    ))}
    </div>
    </div>
    </>
  )
}

export default FishList