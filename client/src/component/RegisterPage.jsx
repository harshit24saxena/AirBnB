import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(ev){
    ev.preventDefault()
    try {
        
        await axios.post("/register",
          { name,email,password}
        )
         alert("Registration Completed")
    } catch (e) {
        alert('registration failed')
    }
  }

  return (
    <div className="mt-14 flex flex-col">
      <h1 className="text-2xl text-center mb-6 font-bold">Register</h1>
      <form className="max-w-md mx-auto" onSubmit={submit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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

        <button className="primary">Register</button>
        <div className="text-center pt-2 text-gray-500">
          Don&apos;t have account.
          <Link className="underline text-black" to={"/login"}>
          Login
          </Link>
        </div>
      </form>
    </div>
  );
}
