export default function PlaceImg(place, index=0, className=null){
    if (!PlaceImg.photos?.length){
        return '';
    }
    if(!className){
        className="object-cover"
    }
    return(
            <img
             src = {import.meta.env.VITE_BACKEND_URL+"/uploads/"  + place.photos[index]}
              alt=""
              className={className}></img>
            
    )
}