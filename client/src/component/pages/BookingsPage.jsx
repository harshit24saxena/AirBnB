/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import AccountNavPage from "./AccountNavPage";

import axios from "axios";
import { Link } from "react-router-dom";
import BookingDate from "../BookingDate";

export default function BookingsPage() {
  const [booking, setBooking] = useState([]);

  useEffect(() => {
    axios.get("/booking").then((res) => {
      const bookedPlace = res.data;
      setBooking(bookedPlace);
    });
  }, []);
  return (
    <div>
      <AccountNavPage />
      <div>
        {booking?.length > 0 &&
          booking.map((bk) => (
            <Link
              to={`/account/booking/${bk._id}`}
              className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden mt-4 items-center"
            >
              <div className="w-48">
                {bk.place.photos.length > 0 && (
                  <img
                    src={"http://localhost:4000/uploads/" + bk.place.photos[0]}
                    alt=""
                    className="object-cover"
                  />
                )}
              </div>
              <BookingDate bk={bk} className={"text-1"}></BookingDate>
              <div className="text-1 bg-primary my-auto mr-2 py-6 px-2 text-white rounded-2xl">Total price : ${bk.price}</div>
            </Link>
          ))}
      </div>
    </div>
  );
}
