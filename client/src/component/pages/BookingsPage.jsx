/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import AccountNavPage from "./AccountNavPage";

import axios from "axios";
import { Link } from "react-router-dom";
import BookingDate from "../BookingDate";

export default function BookingsPage() {
  const [booking, setBooking] = useState([]);
  const [deleteBooking, setDeleteBooking] = useState();

  useEffect(() => {
    axios.get("/booking").then((res) => {
      const bookedPlace = res.data;
      setBooking(bookedPlace);
    });
  }, []);

  function forDeleteBooking(e) {
    setDeleteBooking(e.target.value);
    {
      e.preventDefault();
    }
    console.log(e.target);
  }

  return (
    <div>
      <AccountNavPage />
      <div>
        {booking?.length > 0 &&
          booking.map((bk) => (
            <Link
              to={`/account/booking/${bk._id}`}
              className="max-sm:flex-col p-4 flex gap-4 bg-gray-200 rounded-2xl overflow-hidden mt-4 items-center"
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
              <div className="flex">
                <div className="text-1 bg-primary my-auto mr-2 py-6 px-2 text-white rounded-2xl">
                  Total price : ${bk.price}
                </div>
                <div
                // error in selecting value
                onClick={(e)=>forDeleteBooking(e)}
                value={bk._id} 
                >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
                </div>

              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
