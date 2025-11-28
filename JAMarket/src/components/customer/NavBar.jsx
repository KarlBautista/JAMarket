
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "../../css/NavBar.css";
import CartIcon from "../../assets/shopping-cart.png";
import UserIcon from "../../assets/user.png";
import { useAuthContext } from '../../contexts/AuthContext';
import { useState } from 'react';
import Swal from 'sweetalert2';
const NavBar = () => {
  const location = useLocation();
  const { session, signOut } = useAuthContext();
  const [isUserIconClicked, setIsUserIconClicked] = useState(false);
  const navigate = useNavigate();
  const handleUserIcon = () => {
    setIsUserIconClicked(!isUserIconClicked);
  }

  const handleCartBtn = () => {
    if(session === null){
        Swal.fire({
            icon: 'info',
            title: 'You need to login your account first',
            text: 'Login your account first to be able to add items to your cart.'
      })
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut();
      Swal.fire({ title: "Signed-out", icon: "success", text: "Thank you for choosing JAMarket."})
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Something went wrong signing out",
        icon: "error"
      })
    }
  }
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
            to={ session !== null ? "/cart" : "/login" }
            className={location.pathname === "/cart" ? "active-link" : ""}
            onClick={() => handleCartBtn()}
          >
            <img src={CartIcon} alt="cart" />
          </Link>
        </div> 
        
        <div className="user-icon" onClick={() => handleUserIcon()}>
          <img src={UserIcon} alt="" />
          {session !== null ? (
              !isUserIconClicked ? (
                <div className='user-icon-container'>
                  <div id='profile'
                        className={location.pathname = "/profiles" ? "user-icon-active" : "user-icon-link"}>
                         <Link to="/profiles">
                           Profile
                         </Link>   
                  </div>
                  <div id='orders'
                        className={location.pathname === "/orders" ? "user-icon-active" : "user-icon-link"}>
                        <Link to="/orders">
                          Orders
                        </Link>
                  </div>
                  <div id="logout" onClick={() => handleSignOut()}>
                     Logout
                  </div>
                  
                </div>
              ) : null
          ) : (
              isUserIconClicked ? (
            <div className='user-icon-container'> 
            <div id='signin' 
                  className={location.pathname === "/login"? "user-icon-active" : "user-icon-link"}>
              <Link to="/login"
                    >Signin</Link>
            </div>
            <div id='signup'
                  className={location.pathname === "/register" ? "user-icon-active" : "user-icon-link"}>
              <Link to="/register">Signup</Link>
            </div>
            </div>
          ) : null  
          )}
    
          
        </div>
      </div>
    </div>
  );
};

export default NavBar
