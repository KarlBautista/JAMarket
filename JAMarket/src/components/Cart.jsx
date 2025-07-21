import React, { useState } from 'react'
import "../css/Cart.css"
import { useAuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useCartContext } from '../contexts/CartContext'
import Reacts from "../assets/react.svg"
const Cart = () => {
    const navigate = useNavigate();
    const { cart } = useCartContext();
    const { session } = useAuthContext(); 
    const [ quantity, setQuantity ] = useState(0);




    useEffect(() => {
        if(session === undefined){
            alert("You need to login first");
            navigate("/login");
        }
    }, []);

    const incrementQuantity = () => {
      setQuantity(q => q + 1);
    }

    const decrementQuantity = () => {
      if(quantity > 0) {
          setQuantity(q => q - 1);
      }
    }


  return (
    <div className='cart'>
      <div className="cart-header">
        <h1>Your Cart</h1>
        <a href="">- Continue Shopping</a>
      </div>
      <div className="cart-body">
        <div className="cart-products">
            <div className="cart-number-of-products">
              <p>Items(1)</p>
            </div>
            <div className="order-products">
              <div className="order-product-row">
                <div className="order-product-image-container">
                  <img src={Reacts} alt="" />
                </div>
                <div className="order-product-informations">
                  <div className="order-product-name-price">
                      <div className="order-product-name">
                      <p>FENDER</p>
                    </div>
                    <div className="order-product-price">
                      <p>$666</p>
                    </div>
                  </div>
                  <div className="order-product-category">
                    <p>Guitar</p>
                  </div>
                  <div className="order-product-store-name">
                    <p>Karls store</p>
                    <div className="quantity-input">
                     <button onClick={() => decrementQuantity()}>-</button>
                     <p>{quantity}</p>
                     <button onClick={() => incrementQuantity()}>+</button>
                    </div>

                    <button>Delete</button>
                   
                  </div>
                
                </div>
              
              </div>
              

            </div>
        </div>
        <div className="order-summary">

        </div>
      </div>
    </div>
  )
}

export default Cart
