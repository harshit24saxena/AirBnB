import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then((res) => {
      setPlaces(
        res.data
      );
    });
  }, []);
  return (
    <div className="grid grid-cols-2 md:gird-cols-3 lg:grid-cols-4 mt-8 gap-x-6 gap-y-8">
      {places.length > 0 &&
        places.map((place,index) => (
          <Link to={'/place/'+place._id} key={index}>
            <div className="bg-gray-400 rounded-2xl">
              {place.photos?.[0] && (
                <img
                  src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                  alt=""
                  className="rounded-2xl aspect-square object-cove mb-2"
                />
              )}
            </div>
            <h2 className="font-bold">{place.address}</h2>
            <h3 className="text-xs text-gray-500 leading-4">{place.title}</h3>
            <div className="mt-1">
                <span className="font-bold">${place.price} per night</span>
                </div>

          </Link>
        ))}
    </div>
  );
}
