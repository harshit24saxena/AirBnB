import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AccountNavPage from "./AccountNavPage";
import axios from "axios";
import DeleteBooking from "../DeleteBooking";


export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  
  useEffect(() => {
    axios.get("./Userplaces").then(({ data }) => {
      setPlaces(data);
    });
  }, []);
  
  return (
    <div>
      <AccountNavPage />
      <div className="text-center mt-7 ">
        <Link
          className="gap-2 inline-flex bg-primary text-white py-2 px-6 rounded-full"
          to={"/account/places/new"}
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
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          Add new place
        </Link>
      </div>

      <div className="mt-4">
        {places.length > 0 &&
          places.map((place, index) => (
            <Link
              to={"/account/places/" + place._id}
              className="max-sm:flex-col m-2 bg-gray-100 flex p-4 rounded-2xl gap-4 cursor-pointer items-center relative"
              key={index}
            >
              <div className="w-32 bg-gray-200 flex shrink-0 " >
                {place.photos.length > 0 && (
                  <img
                    src= {place.photos[0]}
                    alt=""
                    className="object-cover aspect-square rounded-md"
                  />
                )}
              </div>
              <div className="grow-0 shrink text-left">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm mt-2 text-gray-600 h-16 overflow-hidden">{place.description} ... </p>
              </div>
              <DeleteBooking bk={place} />         
            </Link>
          ))}
      </div>
    </div>
  );
}
