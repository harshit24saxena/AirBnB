/* eslint-disable react/prop-types */
import axios from "axios";
import { differenceInCalendarDays } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router";
import { UserContext } from "../useContest";

export default function BookingWidget(props) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let NumNight = 0;
  if (checkIn && checkOut) {
    NumNight = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  async function bookThisPlace() {
    const response = await axios.post("/booking", {
      checkIn,
      checkOut,
      guests,
      name,
      phone,
      price: NumNight * props.place.price,
      place: props.place._id, 
    });
    console.log(response);
    const bookingId = response.data._id;
    setRedirect(`/account/booking/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="rounded-2xl shadow p-4 bg-white text-center">
      <div>Price: ${props.place.price}/per night</div>

      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="px-4 py-3 ">
            <label>Check In: </label>
            <input
              type="date"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div className="py-3 border-t">
            <label>Check Out: </label>
            <input
              type="date"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
        </div>
        <div className="px-4 py-3 border-t">
          <label>Max Guests: </label>
          <input
            type="number"
            value={guests}
            onChange={(ev) => setGuests(ev.target.value)}
          />
        </div>
      </div>
      {NumNight > 0 && (
        <div className="py-3 px-3 border-t">
          <label>Your full name</label>
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />

          <label>Phone number</label>
          <input
            type="tel"
            value={phone}
            onChange={(ev) => setPhone(ev.target.value)}
          />
        </div>
      )}
      <button className="primary mt-4" onClick={bookThisPlace}>
        Book this place
        {NumNight > 0 && <span>${NumNight * props.place.price}</span>}
      </button>
    </div>
  );
}
