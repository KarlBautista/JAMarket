import React, { useState } from 'react'
import "../css/Cart.css"
import { useAuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useCartContext } from '../contexts/CartContext'
import Reacts from "../assets/react.svg"
const Cart = () => {
    const navigate = useNavigate();
    const { cart, cartProduct, deleteProductItem } = useCartContext();
    const { session } = useAuthContext(); 
    const [ quantity, setQuantity ] = useState(0);
    const subtotal = cartProduct.reduce((sum, item) => sum + item.price, 0);
    const shipping = 100;
    const tax = subtotal * 0.12;
    
 

    useEffect(() => {
        if(session === undefined){
            alert("You need to login first");
            navigate("/login");
        }
    }, []);

    const deleteProduct = async (index) => {
      try{
        const response = await deleteProductItem(cart[index].id);
        if(!response.success){
          console.log(response.error);
        }
        console.log(response.message);
      } catch(err){
        console.error(err);
      }
    }

   
    

   


  return (
    <div className='cart'>
      <div className="cart-header">
        <h1>Your Cart</h1>
        <a href="">- Continue Shopping</a>
      </div>
      {cartProduct.length === 0 ? (
        <div className='empty-cart-body'>
          <p id='cart-is-empty'>Your Cart is Empty</p>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <button>Start Shopping</button>
        </div>
      ) : (
         <div className="cart-body">
        <div className="cart-products">
            <div className="cart-number-of-products">
              <p>{cartProduct?.length} ITEMS</p>
            </div>
            <div className="order-products">
                {cartProduct?.map((product, index) => {
                  return <div key={index} className="order-product-row">
                    <div className="order-product-image-container">
                      <img src={product.product_image} alt={product.product_name} />
                    </div>
                    <div className="order-product-informations">
                      <div className="order-product-name-price">
                        <div className="order-product-name">
                          <p>{product.product_name}</p>
                        </div>
                        <div className="order-product-price">
                          <p>₱{product.price}</p>
                        </div>
                      </div>
                      <div className="order-product-category">
                        <p>{product.category}</p>
                      </div>
                      <div className="order-product-store-name">
                        <p>By {product.store_name}</p>
                        <div className="quantity-input">
                          <p>Qty: {product.quantity}</p>
                        </div>
                        <button className="delete-btn" onClick={() => deleteProduct(index)}>Remove</button>
                      </div>
                    </div>
                  </div>
                })}
             

            </div>
        </div>
        <div className="order-summary">
                <h3>Order Summary</h3>
                <div className="order-summary-form">
                  <div className="summary-row">
                    <h4>Subtotal</h4>
                    <span className="amount">₱{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <h4>Shipping</h4>
                    <span className="amount">₱{shipping.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <h4>Tax (12%)</h4>
                    <span className="amount">₱{tax.toFixed(2)}</span>
                  </div>
                  <div className="summary-total">
                    <h3>Total</h3>
                    <span className="total-amount">₱{(subtotal + shipping + tax).toFixed(2)}</span>
                  </div>
                  <button className="checkout-btn">Proceed to Checkout</button>
                </div>
        </div>
      </div>
      )}
    </div>
  )
}

export default Cart
