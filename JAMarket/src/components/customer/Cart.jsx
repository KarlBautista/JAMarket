import React, { useState } from 'react'
import "../../css/Cart.css"
import { useAuthContext } from '../../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useCartContext } from '../../contexts/CartContext'
import Reacts from "../../assets/react.svg"
import { useOrdersContext } from '../../contexts/OrdersContext'
const Cart = () => {
    const navigate = useNavigate();
    const { cart, cartProduct, deleteProductItem } = useCartContext();
    const { placeOrder } = useOrdersContext();
    const { session, customerData } = useAuthContext(); 
    const [mop, setMop] = useState("cod");
   const subtotal = cart.reduce((sum, item) => {
          const product = cartProduct.find(p => p.id === item.productId);
          return sum + (product.price * item.quantity);
}, 0);
    const shipping = 100;
    const tax = subtotal * 0.12;
    const userId = customerData?.id;
  
    
 

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

        console.log(cartProduct)

    const handleCheckout = async () => {
       if(mop === "cod"){
        try{
           const response = await placeOrder(userId, cartProduct, (subtotal + tax + shipping), mop);
            alert("placed order");
      

        } catch(err){
          console.error(err);
        }
         
       }
    }

   

    const handleModChange = (e) => {
      setMop(e.target.value);
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
              <Link to={"/shops"}><button>Start Shopping</button></Link>
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
                              <p>₱{subtotal}</p>
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
                      <div className="summary-row">
                        <h4>Mode of Payment</h4>
                        <select name="mod" id="" onChange={handleModChange}>
                          <option value="cod">Cash On Delivery</option>
                          <option value="gcash">GCASH</option>
                        </select>
                      </div>
                      <div className="summary-total">
                        <h3>Total</h3>
                        <span className="total-amount">₱{(subtotal + shipping + tax).toFixed(2)}</span>
                      </div>
                      <button className="checkout-btn" onClick={handleCheckout}>Proceed to Checkout</button>
                    </div>
            </div>
          </div>
          )}
  

    </div>
  )
}

export default Cart
