import React from 'react'
import "../css/Shops.css"
import ShopCard from "../components/customer/ShopCard"
import { useShopContext } from '../contexts/ShopContext'

const Shops = () => {
  const { shops, products } = useShopContext(); 

  return (
    <div className='shops-page-container'>
      {/* Header Section */}
      <div className="shops-header">
        <h1>Discover Music Stores</h1>
        <p>Explore our network of trusted music equipment retailers and find the perfect gear for your musical journey</p>
      </div>

      {/* Content Section */}
      <div className="shops-content">
        {/* Statistics Section */}
        <div className="shops-stats">
          <div className="shop-stat-item">
            <div className="shop-stat-number">{shops?.length || 0}</div>
            <div className="shop-stat-label">Active Stores</div>
          </div>
          <div className="shop-stat-item">
            <div className="shop-stat-number">{products?.length}</div>
            <div className="shop-stat-label">Products</div>
          </div>
          <div className="shop-stat-item">
            <div className="shop-stat-number">4.8</div>
            <div className="shop-stat-label">Avg Rating</div>
          </div>
          <div className="shop-stat-item">
            <div className="shop-stat-number">24/7</div>
            <div className="shop-stat-label">Support</div>
          </div>
        </div>

  
        <h2 className="shops-section-title">All Music Stores</h2>

      
        {shops && shops.length > 0 ? (
          <div className='shops-container'>
            {shops.map((shop) => {
              return <ShopCard shop={shop} key={shop.id} products={products.filter((p) => p.store_owner_id === shop.id)}/>
            })}
          </div>
        ) : (
          <div className="no-shops-message">
            <h3>No Stores Available</h3>
            <p>We're working on adding more music stores to our platform. Check back soon for updates!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Shops
