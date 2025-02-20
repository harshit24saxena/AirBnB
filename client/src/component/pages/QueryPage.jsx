import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function QueryData(){
    const[queryList, setQueryList] = useState('')

    useEffect(()=>{
      try {
        axios.get('/queryInfo').then(res=>{
          setQueryList(res.data);  
        })
      } catch (error) {
        console.log('error in get request for queryData '+error);
      }
       
    },[])

    return(
       <div className="grid grid-cols-2 md:gird-cols-3 lg:grid-cols-4 mt-8 gap-x-6 gap-y-8">
         {queryList.length > 0 &&
           queryList.map((place,index) => (
             <Link to={'/place/'+place._id} key={index}>
               <div className="bg-gray-400 rounded-2xl">
                 {place.photos?.[0] && (
                   <img
                     src= ''
                     alt=""
                     className="rounded-2xl aspect-square object-cove mb-2"
                   />
                 )}
               </div>
               <h2 className="font-bold">{place.address}</h2>
               <h3 className="text-xs text-gray-500 leading-4">{place.title}</h3>
               <div className="mt-1">
                   <span className="font-bold">${place.price} per night</span>
                   </div>
   
             </Link>
           ))}
       </div>
    )
    
}