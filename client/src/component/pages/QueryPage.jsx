import axios from "axios";
import { useEffect } from "react"

export default function QueryData(){
    useEffect(()=>{
        axios.get('/queryInfo').then(res=>{
            console.log(res.data +'data receieved');
            
        })
    },[])
    return
    
}