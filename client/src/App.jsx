
import axios from 'axios'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './layout'

import LoginPage from "./component/LoginPage.jsx";
import RegisterPage from "./component/RegisterPage.jsx";
import ProfilePage from "./component/ProfilePage.jsx";
import PlacesPage from "./component/PlacesPage.jsx";
import PlacesFormPage from "./component/PlacesFormPage.jsx";

axios.defaults.baseURL='http://localhost:4000'
axios.defaults.withCredentials = true

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element:  <Layout />,
      children: [
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
        {
          path:'account/',
          element: <ProfilePage />
        },
        {
          path:'account/places?',
          element: <PlacesPage />
        },
        {
          path:'account/places/new?',
          element: <PlacesFormPage />
        },
        {
          path:'account/places/:id?',
          element: <PlacesFormPage />
        },
      ]
    },
  
  
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
