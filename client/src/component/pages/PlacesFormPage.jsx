import axios from "axios";
import { useEffect, useState } from "react";
import Perks from "../perks";
import PhotoUploader from "../PhotosUploader";
import AccountNavPage from "./AccountNavPage";
import { Navigate, useParams } from "react-router";

export default function PlacesFormPage(){
    const {id} = useParams();
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDecription] = useState("");
    const [extraInfo, setExtraInfo] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [maxGuests, setMaxGuests] = useState(1);
    const [perks, setPerks] = useState([]);
    const [addedPhoto, setAddedPhotos] = useState([]);
    const [price ,setPrice] = useState(100)
    const [redirect, setRedirect] = useState(false)
    useEffect(()=>{
      if(!id){
        return
      }
      axios.get('/places/'+ id).then(res => {
        const {data} = res;
        setTitle(data.title)
        setAddress(data.address)
        setAddedPhotos(data.photos)
        setDecription(data.description)
        setExtraInfo(data.extraInfo)
        setCheckIn(data.checkIn)
        setCheckOut(data.checkOut)
        setPerks(data.perks)
        setMaxGuests(data.maxGuests)
        setPrice(data.price)
      })
    },[id])

    function inputHeader(title) {
        return <h2 className="text-2xl mt-4">{title}</h2>;
      }
      function inputDescription(Des) {
        return <p className="text-sm text-gray-500">{Des}</p>;
      }
      function preInput(header, des) {
        return (
          <>
            {inputHeader(header)}
            {inputDescription(des)}
          </>
        );
      }
      
      async function savePlace(ev){
        ev.preventDefault();
        const placeData = 
        {
          title, address, description,addedPhoto,extraInfo, checkIn, checkOut, perks, maxGuests,price 
        }
        if(id){
          // update
          await axios.put('/places', {id, ...placeData})
          setRedirect(true)

        }else{
          // new data
          await axios.post('/places', placeData)
          setRedirect(true)
        }

      }
      if(redirect){
        return <Navigate to={'/account/places'} />
      }
    
    return(
        <div>
        <AccountNavPage />  
        <form onSubmit={savePlace} method="post" className="m-4" >
          {preInput("title", "Title for your post")}
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />

          {preInput("Address", "addres to this places")}
          <input
            type="text"
            placeholder="address"
            value={address}
            onChange={(ev) => setAddress(ev.target.value)}
          />

          {preInput("Places", "Show this places with photos" )}
          <PhotoUploader addedPhoto={addedPhoto} onChange={setAddedPhotos} />

          {preInput("Description", "Description for this place")}
          <textarea
            className=""
            value={description}
            onChange={(ev) => setDecription(ev.target.value)}
          />
          {preInput("Perks", "Select all the perks for this places")}
          <Perks selected={perks} onchange={setPerks} />

          {preInput("Extra Info", "Provide Info about this places")}
          <textarea
            value={extraInfo}
            onChange={(ev) => setExtraInfo(ev.target.value)}
          />

          {preInput(
            "Check in & out time and Guests",
            " Times for check in an check out"
          )}
          <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-2">
            <div>
              <h3 className=" mt-2 -mb-1">Check In time</h3>
              <input
                type="text"
                placeholder="1"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
              />
            </div>
            <div>
              <h3 className=" mt-2 -mb-1">Check out time</h3>
              <input
                type="text"
                placeholder="10"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
              />
            </div>
            <div>
              <h3 className=" mt-2 -mb-1">Guests</h3>
              <input
                type="number"
                placeholder="2"
                value={maxGuests}
                onChange={(ev) => setMaxGuests(ev.target.value)}
              />
            </div>
            <div>
              <h3 className=" mt-2 -mb-1">Price per night</h3>
              <input
                type="number"
                placeholder="100"
                value={price}
                onChange={(ev) => setPrice(ev.target.value)}
              />
            </div>
          </div>

          <div>
            <button className="primary my-4">Save</button>
          </div>
        </form>
      </div>
    )
}