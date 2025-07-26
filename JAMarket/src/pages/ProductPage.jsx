import React, { useEffect, useState } from 'react'
import "../css/ProductPage.css"
import { useSearchParams } from 'react-router-dom'
import { useProductContext } from '../contexts/ProductContext'
const ProductPage = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id");
  const { getProduct } = useProductContext();
  const [ product, setProduct ] = useState({});
  useEffect(() => {
      const getProductData = async () => {
        try{
          const data = await getProduct(productId);
          if(data.erorr){
            console.log(data.error);
            return
          }
          console.log(data.data)
          setProduct(data.data);
          
        }  catch(err){
          console.error(err);
        }
      }
      getProductData();
  }, []);

  return (
    <div className='product-page'>
      {/* Hero Section */}
      <div className="product-page-hero">
        <p className="product-page-breadcrumb">Product Details</p>
        <h1 className="product-page-title">{product.product_name || "Product"}</h1>
      </div>

      {/* Main Content */}
      <div className="product-page-container">
        <div className="product-page-content">
          {/* Product Image */}
          <div className="product-page-img-container">
            <div className="product-image-badge">{product.category || "Music"}</div>
            <img src={product.product_image} alt={product.product_name} />
          </div>

          {/* Product Information */}
          <div className="product-page-information">
            <div className="product-info-top">
              <div className="product-category">{product.category}</div>
              <h2 className="product-name">{product.product_name}</h2>
              <p className="product-description">
                {product.description || "High-quality music equipment designed for professionals and enthusiasts alike."}
              </p>
              
              {/* Product Features */}
              <div className="product-features">
                <h4>Key Features</h4>
                <div className="features-list">
                  <span className="feature-tag">High Quality</span>
                  <span className="feature-tag">Professional Grade</span>
                  <span className="feature-tag">Durable</span>
                  <span className="feature-tag">Warranty Included</span>
                </div>
              </div>
            </div>

            <div className="product-info-bottom">
              {/* Price and Rating */}
              <div className="product-price-section">
                <div className="product-price">${product.price}</div>
                <div className="product-rating">
                  <span className="rating-stars">★★★★★</span>
                  <span className="rating-text">4.8 (156 reviews)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="product-actions">
                <button className="add-to-cart-btn">Add to Cart</button>
                <button className="wishlist-btn">♡</button>
              </div>

              {/* Store Information */}
              <div className="store-info">
                <h5>Sold by</h5>
                <p className="store-name">{product.store_name || "Music Store"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
