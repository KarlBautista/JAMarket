import React from 'react'
import "../css/ProductCard.css"
import { useAuthContext } from '../contexts/AuthContext'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const ProductCard = () => {
  const { session } = useAuthContext();
  const navigate = useNavigate();

   
  
  const handleAddToCart = () => {
     if(session === undefined){
      alert("You need to login first");
    }
    navigate("/login");
  }

  return (
    <div className='product-card-container'>
        <div className="img-product-card">
            <img src="https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="" />
        </div>
        <div className="description-product-card">
            <p className='product-card-category'>GUITARS</p>
            <p className='product-card-name'>Fender Stratocaster</p>
            <div className='product-price-add-to-cart'>
             <p className='product-card-price'>$899.99</p>
            <button onClick={() => handleAddToCart()} className='product-card-add-to-cart'>Add to Cart</button>
            </div>
           
        </div>

      
    </div>
  )
}

export default ProductCard
