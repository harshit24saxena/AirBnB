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
      <div className="flex item-center bg-gray-200 p-4 mb-4 rounded-2xl">
        <BookingDate bk={booking} />
        <div className="text-1 bg-primary mr-2 py-8 px-2 text-white rounded-2xl size-fit my-auto">Total price : ${booking.price}</div>
      </div>
      <PlaceGallery place={booking.place} />
    </div>
  );
}
