
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../css/NavBar.css";
import CartIcon from "../assets/shopping-cart.png";
import UserIcon from "../assets/user.png";

const NavBar = () => {
  const location = useLocation();

  return (
    <div className="navbar-container">
      <div className="brand">
        <Link to="/"><h2>JAMarket</h2></Link>
      </div>
      
      <div className="links">
        <Link
            to="/shops"
            className={location.pathname === "/shops" ? "active-link" : ""}
            >
                <p>Shops</p>
        
        </Link>
        <Link 
          to="/guitars" 
          className={location.pathname === "/guitars" ? "active-link" : ""}
        >
          <p>Guitars</p>
        </Link>
        
        <Link 
          to="/drums" 
          className={location.pathname === "/drums" ? "active-link" : ""}
        >
          <p>Drums</p>
        </Link>
        
        <Link 
          to="/keyboards" 
          className={location.pathname === "/keyboards" ? "active-link" : ""}
        >
          <p>Keyboards</p>
        </Link>
        
        <Link 
          to="/microphones" 
          className={location.pathname === "/microphones" ? "active-link" : ""}
        >
          <p>Microphones</p>
        </Link>
        
        <Link 
          to="/accessories" 
          className={location.pathname === "/accessories" ? "active-link" : ""}
        >
          <p>Accessories</p>
        </Link>

           <Link 
          to="/join-with-us" 
          className={location.pathname === "/join-with-us" ? "active-link" : ""}
        >
          <p>Join with us</p>
        </Link>

      </div>
      
      <div className="cart-user">
        <div className="cart-icon">
          <Link 
            to="/cart" 
            className={location.pathname === "/cart" ? "active-link" : ""}
          >
            <img src={CartIcon} alt="cart" />
          </Link>
        </div>
        
        <div className="user-icon">
          <Link 
            to="/login" 
            className={location.pathname === "/login" ? "active-link" : ""}
          >
            <img src={UserIcon} alt="user" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar
