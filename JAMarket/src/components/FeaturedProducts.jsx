import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import "../css/FeaturedProducts.css"
const FeaturedProducts = () => {
  const [featuredProductsData, setFeaturedProductsData] = useState([]);
  useEffect(() => {
     const getAllProductsData = async () => {
      try{
        const response = await fetch("http://localhost:5000/api/all-products-from-table");
        if(!response.ok){
          console.log(response.error);
        }
        const data = await response.json();
        setFeaturedProductsData(data.data);
      } catch(error){
        console.error(error);
      }
     } 
     getAllProductsData();
   }, []);

   console.log(featuredProductsData);



  return (
    <div className='featured-products-container'>
        <h2>Featured Products</h2>
       <br />
       <div className="featured-products-grid">
            {featuredProductsData?.map((product) => {
          return <ProductCard product={product} key={product.product_id}/>
       })}
       </div>
   
    </div>
  )
}

export default FeaturedProducts
