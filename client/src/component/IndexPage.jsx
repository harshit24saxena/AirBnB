import { useEffect, useState } from "react"
import axios from 'axios'
export default function IndexPage(){
    const [places,setPlaces] = useState([])
    useEffect(()=>{
        axios.get('/places').then(res=> {
            setPlaces([...res.data,...res.data,...res.data,...res.data,...res.data,...res.data,])
        }
        )
    },[])
    return(
        <div className="grid grid-cols-2 md:gird-cols-3 lg:grid-cols-4 mt-8 gap-6">
        {places.length > 0 && places.map((place,index) => (
            <div key={index} >
            <div className="bg-gray-400 rounded-2xl">
            {place.photos?.[0] && (
                <img src={'http://localhost:4000/uploads/'+ place.photos?.[0]} alt="" className="rounded-2xl aspect-square object-cover"/>
            )}
            </div>
           <h2 className="text-xs">{place.title}</h2>
        </div>
        ))}
        </div>
    )
}