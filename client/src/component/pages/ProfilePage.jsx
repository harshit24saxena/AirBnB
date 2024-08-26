import { useContext, useState } from "react"
import { UserContext } from "../../useContest"
import { Navigate, useParams } from "react-router";
import axios from "axios";
import AccountNavPage from './AccountNavPage'
import MyPlaces from "./PlacesPage";

export default function ProfilePage(){
    const {ready, user, setUser} = useContext(UserContext);
    const [redirect, setRedirect] = useState(null)

    let {subpage} = useParams();
    if(subpage === undefined){
        subpage = 'profile'
    }

    async function logout(){
        await axios.post('/logout'); 
        setRedirect('/') 
        setUser(null)
    }
    if(redirect){
        return <Navigate to={redirect} />
    }

    if(!ready){
        return 'loading...'
    }

    if(ready && !user){
        return <Navigate to={'/login'} />
    }



    return(
        <div>
            <AccountNavPage />
            {subpage  ==='profile' && (
                <div className="text-center max-w-lg mx-auto mt-3">
                    Logged in as {user.name} {user.email}<br/>
                    <button onClick={logout} className="primary max-w-sm mt-2 ">Logout</button>
                </div>
            )
            }

            {subpage === 'places' && (
                <MyPlaces />
            )}

        </div>
    )
}