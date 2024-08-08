
import { Link } from "react-router-dom";
import { useEffect , useState} from 'react';
import AccountNavPage from "./AccountNavPage";
import axios from "axios";

export default function PlacesPage() {
  const [places, setPlaces] = useState([])
  
  useEffect(() => {
    axios.get('./places').then(({data}) => {
      setPlaces(data)
    })
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
{/* place.id in link is showing as undefined */}
          <div className="mt-4">      
            {places.length > 0 && places.map((place , index) => (
              <Link to={'/account/places/' + place.owner} className='bg-gray-100 flex p-4 rounded-2xl gap-4 cursor-pointer' key = {index}>
                <div className='w-32 h-32 bg-gray-200 shrink-0' >
                  {place.photos.length > 0 && (
                    <img src={place.photos[0]} alt="" />
                  )}
                </div>
                <div className="grow-0 shrink text-left">
               <h2 className='text-xl'>{place.title}</h2>
               <p className='text-sm mt-2'>{place.description}</p>
               <p>{place.owner}</p>
                </div>
              </Link>
            ))}
          </div>
        
    </div>
  );
}
