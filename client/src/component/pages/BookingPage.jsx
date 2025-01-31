import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";
import BookingDate from "../BookingDate";

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`/booking`).then((res) => {
        const foundBooking = res.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);
  if (!booking) {
    return "";
  }

  return (
    <div>
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink className="my-3 block">{booking.place.address}</AddressLink>
      <div className="max-sm:flex-col max-sm:items-center flex item-center bg-gray-200 p-4 mb-4 rounded-2xl">
        <BookingDate bk={booking} />
        <div>
          <div className="text-1 bg-primary mr-2 py-8 px-2 text-white rounded-2xl size-fit my-auto">
            Total price : ${booking.price}
          </div>
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
      <PlaceGallery place={booking.place} />
    </div>
  );
}
