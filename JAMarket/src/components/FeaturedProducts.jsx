import React from 'react'
import ProductCard from './ProductCard'
import "../css/FeaturedProducts.css"
const FeaturedProducts = () => {
  return (
    <div className='featured-products-container'>
        <h2>Featured Products</h2>
      <ProductCard />
    </div>
  )
}

export default FeaturedProducts
