

import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}){
    const [user, setUser]  = useState(null)
    const [ready, setReady] = useState(false)
    useEffect(()=>{
        const fetchUser = async()=>{
            const {data} =await axios.get('/profile')
            setUser(data)
            setReady(true)
        }
        if(!user){
            fetchUser()
        }
    },[])
    return (
        <UserContext.Provider value={{user, setUser, ready}}>
            {children}
        </UserContext.Provider>
    )
}