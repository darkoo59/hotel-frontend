import React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Error from './pages/Error';
import Home from './pages/Home';
import Mainlayout from './components/layout/Main';
// import Login from './pages/Login';
// import Registration from './pages/Registration';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        index: true,
        path: "register",
        element: <Registration />
      },
      // {
      //   index: true,
      //   path: "login",
      //   element: <Login />
      // }
    ]
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;