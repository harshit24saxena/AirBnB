import { useEffect, useState } from "react";
import { useParams } from "react-router"
import axios from "axios";
import PlaceGallery from "../PlaceGallery";

export default function BookingPage(){
    const {id} = useParams();
    const [booking, setBooking] = useState(null)
    
    
    useEffect(()=>{
        if(id){
            axios.get(`/bookinng`).then(res =>{
                const foundBooking = res.data.find(({_id}) => _id === id)
                console.log(foundBooking);
            if(foundBooking){
                setBooking(foundBooking)
            }
            })
        }
    },[id])
    if(!booking){
        return "";
    }

    return(
        <PlaceGallery place={booking.place} />
    )
}