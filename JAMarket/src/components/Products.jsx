import React from 'react'
import "../css/Products.css"
import StoreOwnerNavigation from './StoreOwnerNavigation'

const Products = () => {
  return (
    <div className='products'>
        <StoreOwnerNavigation />
        <div className="products-container">
            <div className="products-header">
                <h2>Your Products</h2>
                <div className="input-product">
                    <input type="text" placeholder="Search products..." />
                    <button className="add-product-btn">Add Product</button>
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
                        
                        <div className="table-row">
                            <div className="table-cell product-cell">
                                <div className="product-image">
                                    <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80&h=80&fit=crop&crop=center" alt="Guitar" />
                                </div>
                                <div className="product-info">
                                    <div className="product-name">Gibson Les Paul Standard</div>
                                    <div className="product-id">ID: 102</div>
                                </div>
                            </div>
                            <div className="table-cell">Guitars</div>
                            <div className="table-cell price">$2499.99</div>
                            <div className="table-cell">5</div>
                            <div className="table-cell">
                                <span className="status-badge in-stock">In Stock</span>
                            </div>
                            <div className="table-cell actions-cell">
                                <button className="action-btn view-btn">👁</button>
                                <button className="action-btn edit-btn">✏️</button>
                                <button className="action-btn delete-btn">🗑</button>
                            </div>
                        </div>
                        
                        <div className="table-row">
                            <div className="table-cell product-cell">
                                <div className="product-image">
                                    <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&h=80&fit=crop&crop=center" alt="Drums" />
                                </div>
                                <div className="product-info">
                                    <div className="product-name">Pearl Export Drum Kit</div>
                                    <div className="product-id">ID: 103</div>
                                </div>
                            </div>
                            <div className="table-cell">Drums</div>
                            <div className="table-cell price">$749.99</div>
                            <div className="table-cell">3</div>
                            <div className="table-cell">
                                <span className="status-badge in-stock">In Stock</span>
                            </div>
                            <div className="table-cell actions-cell">
                                <button className="action-btn view-btn">👁</button>
                                <button className="action-btn edit-btn">✏️</button>
                                <button className="action-btn delete-btn">🗑</button>
                            </div>
                        </div>
                        
                        <div className="table-row">
                            <div className="table-cell product-cell">
                                <div className="product-image">
                                    <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80&h=80&fit=crop&crop=center" alt="Drums" />
                                </div>
                                <div className="product-info">
                                    <div className="product-name">Roland TD-17KVX V-Drums</div>
                                    <div className="product-id">ID: 104</div>
                                </div>
                            </div>
                            <div className="table-cell">Drums</div>
                            <div className="table-cell price">$1599.99</div>
                            <div className="table-cell">2</div>
                            <div className="table-cell">
                                <span className="status-badge low-stock">Low Stock</span>
                            </div>
                            <div className="table-cell actions-cell">
                                <button className="action-btn view-btn">👁</button>
                                <button className="action-btn edit-btn">✏️</button>
                                <button className="action-btn delete-btn">🗑</button>
                            </div>
                        </div>
                        
                        <div className="table-row">
                            <div className="table-cell product-cell">
                                <div className="product-image">
                                    <img src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=80&h=80&fit=crop&crop=center" alt="Keyboard" />
                                </div>
                                <div className="product-info">
                                    <div className="product-name">Nord Stage 3 Keyboard</div>
                                    <div className="product-id">ID: 105</div>
                                </div>
                            </div>
                            <div className="table-cell">Keyboards</div>
                            <div className="table-cell price">$3499.99</div>
                            <div className="table-cell">0</div>
                            <div className="table-cell">
                                <span className="status-badge out-of-stock">Out of Stock</span>
                            </div>
                            <div className="table-cell actions-cell">
                                <button className="action-btn view-btn">👁</button>
                                <button className="action-btn edit-btn">✏️</button>
                                <button className="action-btn delete-btn">🗑</button>
                            </div>
                        </div>
                        
                        <div className="table-row">
                            <div className="table-cell product-cell">
                                <div className="product-image">
                                    <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80&h=80&fit=crop&crop=center" alt="Microphone" />
                                </div>
                                <div className="product-info">
                                    <div className="product-name">Shure SM58 Microphone</div>
                                    <div className="product-id">ID: 106</div>
                                </div>
                            </div>
                            <div className="table-cell">Microphones</div>
                            <div className="table-cell price">$99.99</div>
                            <div className="table-cell">25</div>
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
        </div>
    </div>
  )
}

export default Products
