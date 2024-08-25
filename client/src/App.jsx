
import axios from 'axios'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './layout'

import IndexPage from './component/pages/IndexPage.jsx';
import LoginPage from "./component/pages/LoginPage.jsx";
import RegisterPage from "./component/pages/RegisterPage.jsx";
import ProfilePage from "./component/pages/ProfilePage.jsx";
import PlacesPage from "./component/pages/PlacesPage.jsx";
import PlacesFormPage from "./component/pages/PlacesFormPage.jsx";
import PlaceDetailPage from './component/pages/PlaceDetailPage.jsx';
import BookingsPage from './component/pages/BookingsPage.jsx'
import BookingPage from './component/pages/BookingPage.jsx'

axios.defaults.baseURL='http://localhost:4000'
axios.defaults.withCredentials = true

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element:  <Layout />,
      children: [
        {
          path: "/",
          element: <IndexPage />,
        },
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
        {
          path:'place/:id?',
          element: <PlaceDetailPage />
        },
        {
          path:'/account/booking',
          element: <BookingsPage />
        },
        {
          path:'/account/booking/:id',
          element: <BookingPage />
        },
      ]
    },
  
  
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
