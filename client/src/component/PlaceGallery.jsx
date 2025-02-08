import { useState } from "react";

export default function PlaceGallery(place){
  
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    if (showAllPhotos) {
        return (
          <div className="absolute inset-0 bg-black text-white min-h-screen">
            <div className="bg-black p-8 grid gap-4">
              <div>
                <h2 className="text-2xl font-bold ml-4">Photos of {place.place.title}</h2>
                <button
                  onClick={() => setShowAllPhotos(false)}
                  className="fixed left-4 top-9 rounded-2xl bg-red-600 text-white shadow shadow-black"
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
              <div className="w-4/5 m-auto ">

              {place.place?.photos?.length > 0 &&
                place.place.photos.map((photo, index) => (
                  <div key={index}>
                    <img className="object-cover m-4"
                      onClick={() => setShowAllPhotos(true)}
                      src={"http://localhost:4000/uploads/" + photo}
                      ></img>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }
    
return(
    <div className=" gap-2 rounded-3xl overflow-hidden grid relative grid-cols-1 sm:grid-cols-[2fr_1fr]">
    <div>
      {place.place.photos?.[0] && (
        <div>
          <img
            onClick={() => setShowAllPhotos(true)}
            className="cursor-pointer aspect-square object-cover"
            src={"http://localhost:4000/uploads/" + place.place.photos[0]}
            alt=""
          />
        </div>
      )}
    </div>

    <div className="grid2">
      {place.place.photos?.[1] && (
        <img
          onClick={() => setShowAllPhotos(true)}
          className="hidden sm:cursor-pointer aspect-square object-cover"
          src={"http://localhost:4000/uploads/" + place.place.photos[1]}
          alt=""
        />
      )}
      {place.place.photos?.[2] && (
        <div className="overflow-hidden">
          <img
            onClick={() => setShowAllPhotos(true)}
            className="hidden sm:cursor-pointer aspect-square object-cover relative top-2"
            src={"http://localhost:4000/uploads/" + place.place.photos[2]}
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
)
}