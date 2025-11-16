import React from 'react'
import "../../css/ProductCard.css"
import { useAuthContext } from '../../contexts/AuthContext'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from "../../contexts/CartContext";
import QuantityForm from '../customer/quantityForm';
import { useState } from 'react';
import Swal from 'sweetalert2';
const ProductCard = ({ product }) => {
  const { session, customerData } = useAuthContext();
  const [showQuantityForm, setShowQuantityForm] = useState(false);
  const { addToCart } = useCartContext();
  const navigate = useNavigate();
  const userId = customerData?.id;

  
  const handleAddToCart = async (e) => {
    e.stopPropagation();    
    if(session === null || customerData === null){
      const res = await Swal.fire({
          title: "Please Sign-in your account first",
          text: "Sign-in to your account to add products to your cart.",
          showConfirmButton: true,
          icon: "info",
          confirmButtonText: 'Go to Login'
        });
        if(res.isConfirmed){
          navigate("/login");
          return
        }
    }
    try{
      setShowQuantityForm(true);
    } catch(err){
      console.error(err)
    }
  }

  const handleQuantityFormClose = () => {
    setShowQuantityForm(false);
  }

  const handleAddToCartWithQuantity = async (product, quantity) => {
    try {
      await addToCart(userId, product.product_id, quantity);
      await Swal.fire({
        title: 'Added to cart',
        text: 'Product added to cart successfully.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
    } catch (err) {
      console.error("Error adding to cart:", err);
      await Swal.fire({
        title: 'Failed',
        text: 'Failed to add product to cart.',
        icon: 'error'
      });
    }
  }

  const handleProductPage = async () => {
    try{
      navigate(`/product-page?id=${product.product_id}`);
    } catch (err){
      console.error(err);
    }
  }

  return (
    <>
      <div className='product-card-container' onClick={() => handleProductPage()}>
          <div className="img-product-card">
              <img src={product.product_image} alt="" />
          </div>
          <div className="description-product-card">
              <div className="product-info-section">
                  <p className='product-card-category'>{product.category}</p>
                  <h3 className='product-card-name'>{product.product_name}</h3>
                  <p className='product-card-store-name'>{product.store_name}</p>
              </div>

              <div className='product-price-add-to-cart'>
                  <p className='product-card-price'>₱{product.price}</p>
                  <button onClick={(e) => handleAddToCart(e)} className='product-card-add-to-cart'>Add to Cart</button>
              </div>
          </div>
      </div>

      {/* Quantity Form Modal */}
      <QuantityForm 
        product={product}
        isOpen={showQuantityForm}
        onClose={handleQuantityFormClose}
        onAddToCart={handleAddToCartWithQuantity}
      />
    </>
  )
}

export default ProductCard
