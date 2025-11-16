import React, { useState } from 'react'
import "../../css/Cart.css"
import { useAuthContext } from '../../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useCartContext } from '../../contexts/CartContext'
import Reacts from "../../assets/react.svg"
import { useOrdersContext } from '../../contexts/OrdersContext'
import Swal from 'sweetalert2'
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
        Swal.fire({
          title: 'Login required',
          text: 'You need to login first',
          icon: 'warning',
          confirmButtonText: 'Go to Login'
        }).then(() => {
          navigate('/login');
        });
      }
    }, []);

    const deleteProduct = async (index) => {
      const result = await Swal.fire({
        title: 'Remove Item',
        text: 'Are you sure you want to remove this item from your cart?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Remove',
        cancelButtonText: 'Keep'
      });

      if (!result.isConfirmed) return;

      try{
        const response = await deleteProductItem(cart[index].id);
        if(!response.success){
          console.log(response.error);
          await Swal.fire({ title: 'Notice', text: response.message || 'Could not remove item.', icon: 'info' });
          return;
        }
        await Swal.fire({ title: 'Removed', text: response.message || 'Item removed from cart.', icon: 'success' });
      } catch(err){
        console.error(err);
        await Swal.fire({ title: 'Error', text: 'Something went wrong.', icon: 'error' });
      }
    }

        console.log(cartProduct)

    const handleCheckout = async () => {
       if(mop === "cod"){
        try{
           const response = await placeOrder(userId, cartProduct, (subtotal + tax + shipping), mop);
           if(response?.success){
             await Swal.fire({ title: 'Order Placed', text: response.message || 'Your order has been placed.', icon: 'success' });
           } else {
             await Swal.fire({ title: 'Notice', text: response?.message || 'Could not place order.', icon: 'info' });
           }
        } catch(err){
          console.error(err);
          await Swal.fire({ title: 'Error', text: 'Something went wrong while placing the order.', icon: 'error' });
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
