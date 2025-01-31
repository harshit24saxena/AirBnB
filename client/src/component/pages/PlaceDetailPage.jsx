import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";

export default function PlaceDetailPage() {
  const { id } = useParams();
  const [place, setPlace] = useState();

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((res) => {
      setPlace(res.data);
    });
  }, [id]);

  if (!place) {
    return <div>loading</div>;
  }

  const checkIn = new Date(place.checkIn).toISOString().split('T')[0]
  const checkOut = new Date(place.checkOut).toISOString().split('T')[0]
  

  return (
    <div className="mt-4 bg-gray-100 -mx-8  px-8 pt-8">
      <h1 className="text-3xl">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <div>
        <PlaceGallery place={place} />
        
        <div className="mt-8 gap-4 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
          <div>
            <div className="my-4">
              <h2 className="font-semibold text-2xl">Description</h2>
              {place.description}
            </div>
            Check In: {checkIn}
            <br />
            Check Out: {checkOut}
            <br />
            Max Guests: {place.maxGuests}
          </div>
          <BookingWidget place={place} />
        </div>

        <div className="bg-white -mx-8 p-8 border-t leading-5 mt-2 mb-4 ">
          <div>
            <h2 className="font-semibold text-2xl mt-4">Extra Info</h2>
          </div>
          <div className="text-sm text-gray-700 leadin-4 mt-1">
            {place.extraInfo}
          </div>
        </div>
      </div>
    </div>
  );
}
