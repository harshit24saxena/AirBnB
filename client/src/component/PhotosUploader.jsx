import { useState } from "react";
import axios from "axios";

export default function PhotoUploader(props){
  const onChange = props.onChange;
  const addedPhoto = props.addedPhoto;
    const [photoLink, setPhotoLink] = useState("");
    
    async function addPhoto(ev){
        ev.preventDefault();
        const {data:filename} = await axios.post('/uploadbylink',
            {URL: photoLink})
            onChange(prev => {
                return [...prev, filename]
            })
            setPhotoLink('')  
        }
        function uploadPhoto(e){
            const files = e.target.files;
            const data = new FormData();
            for(let i=0; i<files.length; i++){
                data.append('photos', files[i])
            }
            axios.post('/uploads', data , {
                headers : {'Content-Type':'multipart/form-data'}
            }).then(res=>{
                const {data:filenames} = res;
                onChange(prev => {
                    return [...prev, ...filenames]
                })
            })
        }

    return(
        <>
        <div className="flex gap-2">
        <input
          type="text"
          placeholder="add photos using link ....jpg"
          value={photoLink}
          onChange={(ev) => setPhotoLink(ev.target.value)}
        />
        <button onClick={addPhoto} 
        className="bg-gray-200 px-4 rounded-2xl">
          Add &nbsp; photo
        </button>
      </div>

      <div className="mt-2 grid grid-cols-3 lg:grid-cols-6 md:grid-cols-4 text-gray-400 gap-1">


          {addedPhoto.length > 0 && addedPhoto.map((e, index) =>(
            <div key={index} >
                   <img className="rounded-2xl" src={"http://localhost:4000/uploads/"+ e} alt="" /> 
              </div>
          )) }

        <label className="cursor-pointer border flex  justify-center items-center gap-2 bg-transparent rounded-2xl py-8   text-2xl text-gray-400">
          <input type="file" multiple className='hidden w-0' onChange={uploadPhoto}/>
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
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
          Upload
        </label>

      </div>
        </>
    )
}