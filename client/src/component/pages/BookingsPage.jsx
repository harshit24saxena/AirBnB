/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import AccountNavPage from "./AccountNavPage";

import axios from "axios";
import { Link } from "react-router-dom";
import BookingDate from "../BookingDate";
import DeleteBooking from "../DeleteBooking";

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
              key={bk._id}
              to={`/account/booking/${bk._id}`}
              className="max-sm:flex-col p-4 flex gap-4 bg-gray-200 rounded-2xl overflow-hidden mt-4 items-center"
            >
              <div className="w-48 shrink-0">
                {bk.place.photos.length > 0 && (
                  <img
                    src={import.meta.env.VITE_BACKEND_URL + "/uploads/" + bk.place.photos[0]}
                    alt=""
                    className="object-cover aspect-square"
                  />
                )}
              </div>
              <BookingDate bk={bk}></BookingDate>
              <div className="flex justify-center items-center">
                <div className="text-1 bg-primary my-auto mr-2 py-6 px-2 text-white rounded-2xl">
                  Total price : ${bk.price}
                </div>
                <DeleteBooking bk={bk} />
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
