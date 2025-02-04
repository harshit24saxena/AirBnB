import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AccountNavPage from "./AccountNavPage";
import axios from "axios";



async function forDeleteBooking(e) {
  const deleteBooking = e.target.dataset.id; 
  console.log(deleteBooking);
  
   
  axios.post("/deletBooking", {deleteBooking}).then((res) => console.log(res))
  {e.preventDefault()}
  window.location.reload()
}

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
              className="max-sm:flex-col m-2 bg-gray-100 flex p-4 rounded-2xl gap-4 cursor-pointe"
              key={index}
            >
              <div className="w-32 h-32 bg-gray-200 flex shrink-0" >
                {place.photos.length > 0 && (
                  <img
                    src={"http://localhost:4000/uploads/" + place.photos[0]}
                    alt=""
                    className="object-cover"
                  />
                )}
              </div>
              <div className="grow-0 shrink text-left">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm mt-2 text-gray-600">{place.description}</p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8 bg-white border rounded-lg "
                data-id={place._id}
                onClick={(e) => forDeleteBooking(e)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </Link>
          ))}
      </div>
    </div>
  );
}
