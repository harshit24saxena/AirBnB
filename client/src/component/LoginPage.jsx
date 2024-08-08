import axios from "axios";
import { useContext, useState } from "react";
import {Link, Navigate} from "react-router-dom";
import { UserContext } from "../useContest";

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const {setUser} = useContext(UserContext)
  async function handleSubmit(ev){
    ev.preventDefault();
    try {
        const {data} = await axios.post('/login' ,
          {email,password}
        )
        setUser(data);
        setRedirect(true);
        
    } catch (e) {
        alert('login failed')
    }
  }
 
  if(redirect){
      return  <Navigate to={'/'} />
  }

  return (
    <div className="mt-14">
      <h1 className="text-2xl text-center mb-6 font-bold">Login</h1>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="primary">Login</button>

        <div className="text-center pt-2 text-gray-500">
          Don&apos;t have account.
          <Link className="underline text-black" to={"/register"}>
            Register Now
          </Link>
        </div>
      </form>
    </div>
  );
}
