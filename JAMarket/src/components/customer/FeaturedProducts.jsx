import React, { useEffect, useState } from 'react'
import ProductCard from '../products/ProductCard'
import "../../css/FeaturedProducts.css"
import { useProductContext } from '../../contexts/ProductContext'
const FeaturedProducts = () => {

  const { featuredProducts } = useProductContext();
  console.log(FeaturedProducts);

  return (
    <div className='featured-products-container'>
        <h2>Featured Products</h2>
       <br />
       <div className="featured-products-grid">
         {featuredProducts?.map((product) => {
          return <ProductCard product={product} key={[product.id]}/>
         })}
       </div> 
   
    </div>
  )
}

export default FeaturedProducts
