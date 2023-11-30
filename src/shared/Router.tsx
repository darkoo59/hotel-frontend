import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Profile from "./pages/Profile";


const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "home",
        element: <Home />
      },
      {
        path: "register",
        element: <Registration />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "profile",
        element: <Profile />
      }
    ]
  }
]);

export default Router;