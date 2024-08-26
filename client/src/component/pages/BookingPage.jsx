import { useParams } from "react-router"

export default function BookingPage(){
    const {id} = useParams();

    return(
        <div>Single Booking :{id} </div>
    )
}