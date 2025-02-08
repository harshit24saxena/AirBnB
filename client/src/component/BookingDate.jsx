/* eslint-disable react/prop-types */
import {differenceInCalendarDays, format} from 'date-fns'
export default function BookingDate({bk}){
    
    return(
        <div className="py-3 pr-3 grow border-2">
           
        <h2 className="text-xl ">{bk.place.title}</h2>
        <div className="border-t border-gray=300 mt-2 py-2 flex gap-2 items-center text-gray-500">
        {format(new Date(bk.checkIn),'dd-MM-yyyy')} to {format(new Date(bk.checkOut),'dd-MM-yyyy')} {" "}<br />
        Number of nights : {differenceInCalendarDays(new Date(bk.checkOut), new Date(bk.checkIn))}
        </div>
       </div>
    )
}