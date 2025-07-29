import React from 'react'
import "../../css/ProductCard.css"
import { useAuthContext } from '../../contexts/AuthContext'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from "../../contexts/CartContext"
const ProductCard = ({ product }) => {
  const { session, customerData } = useAuthContext();
  const { addToCart } = useCartContext();
  const navigate = useNavigate();
  const userId = customerData?.id;

  
  const handleAddToCart = async () => {
     if(session === null){
      alert("You need to login first");
      navigate("/login");
    }

    try{
      if(!userId){
        alert("You need to signin first");
        return;
      }
      const response = await addToCart(product.product_id, userId);
 
      alert("successfully added to cart");
    } catch(err){
      console.error(err)
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
                <button onClick={() => handleAddToCart()} className='product-card-add-to-cart'>Add to Cart</button>
            </div>
        </div>

      
    </div>
  )
}

export default ProductCard
