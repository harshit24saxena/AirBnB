/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import AccountNavPage from "./AccountNavPage";
import {differenceInCalendarDays, format} from 'date-fns'
import axios from "axios";
import { Link } from "react-router-dom";

export default function BookingsPage() {
  const [booking, setBooking] = useState([]);

  useEffect(() => {
    axios.get("/booking").then((res) => {
    const bookedPlace = res.data
      setBooking(bookedPlace);
    });
}, []);
  return (
    <div>
      <AccountNavPage />
      <div>
        {booking?.length > 0 &&
          booking.map((bk) =>(
           <Link to={`/account/booking/${bk._id}`} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden mt-4">
            <div className="w-48">
             {bk.place.photos.length > 0 && (
               <img
               src={"http://localhost:4000/uploads/" + bk.place.photos[0]}
               alt=""
               className="object-cover"
               />
              )}
            </div>
            <div className="py-3 pr-3 grow">
             <h2 className="text-xl">{bk.place.title}</h2>
             <div className="border-t border-gray=300 mt-2 py-2 flex gap-2 items-center text-gray-500">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
             </svg>
             {format(new Date(bk.checkIn),'dd-MM-yyyy')} to {format(new Date(bk.checkOut),'dd-MM-yyyy')}
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
             </svg>
             Number of nights : {differenceInCalendarDays(new Date(bk.checkOut), new Date(bk.checkIn))}
             </div>
             <div className="text-l" >
              Total price : ${bk.price}
             </div>
            </div>
           </Link>
          ))}
      </div>
    </div>
  );
}