import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Login from "../customer/Login";
import Register from "../customer/Register";
import Profiles from "../customer/Profiles";
import Home from "../../pages/Home";
import Cart from "../customer/Cart";
import JoinWithUs from "../../pages/JoinWithUs";
import StoreOwnerDashboard from "../store_owner/StoreOwnerDashboard";
import StoreOwnerLayout from "../store_owner/StoreOwnerLayout";
import Products from "../products/Products";
import Shops from "../../pages/Shops"
import StorePage from "../../pages/StorePage";
import ProductPage from "../../pages/ProductPage";
import Orders from "../../pages/Orders";
import StoreOwnerOrders from "../../pages/StoreOwnerOrders";

const router = createBrowserRouter([
    {
        path: "/", 
        element: <App />,
        children: [
            {path: "/", element: <Home />},
            {path: "/register", element: <Register />},
            {path: "/profiles", element: <Profiles />},
            {path: "/login", element: <Login />},
            {path: "/cart", element: <Cart />},
            {path: "/join-with-us", element: <JoinWithUs />},
            {path: "/Shops", element: <Shops />},
            {path: "store-page", element: <StorePage />},
            {path: "/product-page", element: <ProductPage />},
            {path: "/orders", element: <Orders />}
        ]
    },
    {
        path: "/store-owner",
        element: <StoreOwnerLayout />,
        children: [
            {path: "dashboard", element: <StoreOwnerDashboard />},
            {path: "products", element: <Products />},
            {path: "orders", element: <StoreOwnerOrders />},
            {path: "customers", element: <StoreOwnerDashboard />},

        ]
    }
])

export default router;