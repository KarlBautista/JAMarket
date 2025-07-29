import React from 'react'
import "../../css/StoreOwnerNavigation.css"
import ReactSvg from "../../assets/react.svg"
import Dashboard from "../../assets/dashboard.png"
import Products from "../../assets/box.png"
import Customer from "../../assets/customer.png"
import Order from "../../assets/order.png";
import Logout from "../../assets/logout.png"
import { useAuthContext } from '../../contexts/AuthContext'
import { Link, useLocation, useNavigate } from 'react-router-dom'
const StoreOwnerNavigation = () => {
    const { partnerData, signOut } = useAuthContext();
    const location = useLocation();
    const navigate = useNavigate();
    console.log(partnerData)
    const handleLogout = async () => {
        try{
            const response = await signOut();
            if(response.error){
                alert(response.error)
            }
            alert(response.message);
            navigate("/login");
        } catch (err) {
            console.error(err);
        }
    }

  return (
      <aside className='store-owner-aside'>
            <div className="logo-store-name-container">
                <div className="store-owner-logo-container">
                      <img src={partnerData?.logo_url || ReactSvg} alt="Store Logo" />
                </div>
                <div className="store-name-container">
                    <h3>{partnerData?.store_name || "Store Name"}</h3>
                    <p>Store Owner</p>
                </div>
            </div>

            <div className="store-owner-navigation">
               <Link to="/store-owner/dashboard">
                <div className={ location.pathname === "/store-owner/dashboard" ? 
                    "store-owner-active-link" : "store-owner-navigation-row"
                }>
                   <img src={Dashboard} alt="" />
                      <p>Dashboard</p>
                </div></Link>

                 <Link to="/store-owner/products">
                 <div className={ location.pathname === "/store-owner/products" ? 
                    "store-owner-active-link" : "store-owner-navigation-row"
                }>
                     <img src={Products} alt="" />
                     <p>Products</p>
                </div></Link>

                 <Link to="/store-owner/orders">
                 <div className={ location.pathname === "/store-owner/orders" ? 
                    "store-owner-active-link" : "store-owner-navigation-row"
                }>
                     <img src={Order} alt="" />
                       <p>Orders</p>
                </div></Link> 

                 <Link to="/store-owner/customers">
                 <div className={ location.pathname === "/store-owner/customers" ? 
                    "store-owner-active-link" : "store-owner-navigation-row"
                }>
                     <img src={Customer} alt="" />
                      <p>Customers</p>
                </div></Link> 
                

                  <div className="store-owner-navigation-row" onClick={() => handleLogout()}>
                     <img src={Logout} alt="" />
                        <p>Logout</p>
                </div>

              
               
             
              
              
            </div>

            
           
        </aside>
  )
}

export default StoreOwnerNavigation
