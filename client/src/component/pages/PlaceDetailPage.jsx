import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";

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
  

  return (
    <div className="mt-4 bg-gray-100 -mx-8  px-8 pt-8">
      <h1 className="text-3xl">{place.title}</h1>
      <a
        className="underline flex gap-1 my-3 font-semibold"
        target="blank"
        href={"https://maps.google.com/?q=" + place.address}
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
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
        {place.address}
      </a>

      <div>
        <PlaceGallery place={place} />
        
        <div className="mt-8 gap-4 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
          <div>
            <div className="my-4">
              <h2 className="font-semibold text-2xl">Description</h2>
              {place.description}
            </div>
            Check In: {place.checkIn}
            <br />
            Check Out: {place.checkOut}
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
