import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function PlaceDetailPage() {
  const { id } = useParams();
  const [place, setPlace] = useState();
  const [showAllPhotos, setShowAllPhotos] = useState(false);

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
  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white min-h-screen">
        <div className="bg-black p-8 grid gap-4">
          <div>
            <h2 className="text-2xl font-bold">Photos of {place.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed right-12 top-8 rounded-2xl bg-red-600 text-white shadow shadow-black"
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
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo, index) => (
              <div key={index}>
                <img src={"http://localhost:4000/uploads/" + photo}></img>
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 bg-gray-100">
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
        <div className=" rounded-3xl overflow-hidden grid gap-2 grid-cols-[2fr_1fr] relative">
          <div>
            {place.photos?.[0] && (
              <div>
                <img
                  className="aspect-square object-cover"
                  src={"http://localhost:4000/uploads/" + place.photos[0]}
                  alt=""
                />
              </div>
            )}
          </div>

          <div className="grid2">
            {place.photos?.[1] && (
              <img
                className="aspect-square object-cover"
                src={"http://localhost:4000/uploads/" + place.photos[1]}
                alt=""
              />
            )}
            {place.photos?.[2] && (
              <div className="overflow-hidden">
                <img
                  className="aspect-square object-cover relative top-2"
                  src={"http://localhost:4000/uploads/" + place.photos[2]}
                  alt=""
                />
              </div>
            )}
          </div>
          <button
            onClick={() => setShowAllPhotos(true)}
            className="absolute bottom-2 right-2  py-2 px-4 bg-white rounded-2xl  shadow-md shadow-gray-500"
          >
            show more photos
          </button>
        </div>
        <div className="my-4">
          <h2 className="font-semibold text-2xl">Description</h2>
          {place.description}
        </div>
        <div className="grid grid-cols-2">
          <div>
            Check In: {place.checkIn}
            <br />
            Check Out: {place.checkOut}
            <br />
            Max Guests: {place.maxGuests}
          </div>
          <div>
            <div className="rounded-2xl shadow p-4 bg-white text-center">
              <div>Price: {place.price}</div>

              <div className="border rounded-2xl">
                <div className="px-4 py-3 ">
                  <div className="flex">
                    <label htmlFor="">Check In</label>
                    <input type="date" />
                  </div>
                  <div className="px-4 py-3 border-t">
                    <label htmlFor="">Check Out</label>
                    <input type="date" />
                  </div>
                  <div className="px-4 py-3 border-t">
                    <label htmlFor="">Max Guests</label>
                    <input type="number" />
                  </div>
                  
                </div>
              </div>
              <button className="primary mt-4">Book this place</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
