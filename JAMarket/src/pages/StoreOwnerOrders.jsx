import React from 'react'
import "../css/StoreOwnerOrders.css"
import StoreOwnerNavigation from '../components/store_owner/StoreOwnerNavigation'

const StoreOwnerOrders = () => {
  return (
    <div className='store-owner-orders'>
        <StoreOwnerNavigation />
        <div className="store-owner-orders-container">
            <div className="store-owner-orders-header">
                <h2>Orders Management</h2>
            </div>
            <div className="store-owner-orders-navigation">
                <button>Pending</button>
                <button>Shipped</button>
                <button>Delivered</button>
            </div>
            <div className="orders-content">
              
                <p>Orders will be displayed here...</p>
            </div>
        </div>
    </div>
  )
}

export default StoreOwnerOrders
