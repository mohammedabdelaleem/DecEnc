 
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Error404 from "./pages/Error404";

import {useContext } from "react";
import ThemeContext from "./context/ContextData";

import "./theme.css"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error404/>,
  },

]);


function App() {
  const {theme} = useContext(ThemeContext);

  
  return (
  <div className={`${theme}`}>
      <RouterProvider router={router} /> 
  </div>
  )
  
}

export default App;
