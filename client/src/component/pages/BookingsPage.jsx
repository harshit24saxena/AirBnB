import { useEffect, useState } from "react";
import AccountNavPage from "./AccountNavPage";
import axios from "axios";

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
      <div  className="bg-gray-800 text-2xl w-5 h-5 text-white "  >
        {/* inside of this div is not rendering */}
        {booking?.length > 0 &&
          booking.map((bk) => {
            console.log(bk.checkIn);
            <h2>{bk.checkIn}</h2>;
          })}
      </div>
    </div>
  );
}
