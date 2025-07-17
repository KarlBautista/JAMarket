import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "./Login";
import Register from "./Register";
import Profiles from "./Profiles";
import Home from "../pages/Home";
import Cart from "./Cart";
import JoinWithUs from "./JoinWithUs";

const router = createBrowserRouter([
    {
        path: "/", element: <App />,
        children: [
            {path: "/", element: <Home />},
            {path: "/register", element: <Register />},
            {path: "/profiles", element: <Profiles />},
            {path: "/login", element: <Login />},
            {path: "/cart", element: <Cart />},
            {path: "/join-with-us", element: <JoinWithUs />},

        ]
        
    }
])

export default router;