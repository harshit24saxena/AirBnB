import React from "react";
import ReactDOM from "react-dom/client";
import { UserContextProvider } from "./useContest.jsx";

import "./index.css";
import App from "./App.jsx";




ReactDOM.createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </UserContextProvider>
);
