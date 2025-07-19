import React, { useState } from 'react'
import "../css/Products.css"
import StoreOwnerNavigation from './StoreOwnerNavigation'
import AddProducts from './AddProducts'

const Products = () => {
    const [showAddProduct, setShowAddProduct] = useState(false)

    const handleAddProduct = () => {
        setShowAddProduct(true)
    }
  return (
    <div className='products'>
        <StoreOwnerNavigation />
        <div className="products-container">
            {showAddProduct ? (
                <AddProducts />
            ) : (
                <>
                    <div className="products-header">
                        <h2>Your Products</h2>
                        <div className="input-product">
                            <input type="text" placeholder="Search products..." />
                            <button className="add-product-btn" onClick={handleAddProduct}>Add Product</button>
                        </div>
                    </div>
                    
                    <div className="products-main">
                        <div className="products-table">
                            <div className="table-header">
                                <div className="header-cell">PRODUCT</div>
                                <div className="header-cell">CATEGORY</div>
                                <div className="header-cell">PRICE</div>
                                <div className="header-cell">STOCK</div>
                                <div className="header-cell">STATUS</div>
                                <div className="header-cell">ACTIONS</div>
                            </div>
                            
                            <div className="table-body">
                                <div className="table-row">
                                    <div className="table-cell product-cell">
                                        <div className="product-image">
                                            <img src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=80&h=80&fit=crop&crop=center" alt="Guitar" />
                                        </div>
                                        <div className="product-info">
                                            <div className="product-name">Fender Stratocaster</div>
                                            <div className="product-id">ID: 101</div>
                                        </div>
                                    </div>
                                    <div className="table-cell">Guitars</div>
                                    <div className="table-cell price">$899.99</div>
                                    <div className="table-cell">12</div>
                                    <div className="table-cell">
                                        <span className="status-badge in-stock">In Stock</span>
                                    </div>
                                    <div className="table-cell actions-cell">
                                        <button className="action-btn view-btn">👁</button>
                                        <button className="action-btn edit-btn">✏️</button>
                                        <button className="action-btn delete-btn">🗑</button>
                                    </div>
                                </div>
                                
                               
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    </div>
  )
}

export default Products
