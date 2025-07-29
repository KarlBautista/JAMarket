import React, { useEffect, useState } from 'react'
import "../../css/Products.css"
import StoreOwnerNavigation from '../store_owner/StoreOwnerNavigation'
import AddProducts from '../store_owner/AddProducts'
import { useAuthContext } from '../../contexts/AuthContext'
const Products = () => {
    const [showAddProduct, setShowAddProduct] = useState(false)
    const { partnerData } = useAuthContext();
    const [ allProducts, setAllProducts] = useState([]);
    const userId = partnerData?.id;
 
    const handleAddProduct = () => {
        setShowAddProduct(true)
    }

    useEffect(() => {
        if(!userId) return;
        const displayAllProducts = async () => {
            try{
                const response = await fetch(`http://localhost:5000/api/all-products?userId=${userId}`, {
                    method: "GET"
                });
                
                if(!response.ok){
                    console.log(response.error);
                    return;
                }
                const data = await response.json();
              
                 setAllProducts(data.data)


            } catch (err){
                console.error(err);
            }
        }
         displayAllProducts();
    }, [userId]);

    console.log(allProducts);

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
                                <div className="header-cell">SKU</div>
                                <div className="header-cell">CATEGORY</div>
                                <div className="header-cell">PRICE</div>
                                <div className="header-cell">STOCK</div>
                                <div className="header-cell">STATUS</div>
                                 <div className="header-cell">ADDED AT</div>
                                <div className="header-cell">ACTIONS</div>
                            </div>
                                <div className="table-body">
                                {allProducts?.map((product) => {
                                return  <div className="table-row">
                                    <div className="table-cell product-cell">
                                        <div className="product-image">
                                            <img src={product.product_image} alt="Guitar" />
                                        </div>
                                        <div className="product-info">
                                            <div className="product-name">{product.product_name}</div>
                                            <div className="product-id">{product.id}</div>
                                        </div>  
                                    </div>
                                    <div className="table-cell">{product.sku}</div>
                                    <div className="table-cell">{product.category}</div>
                                    <div className="table-cell price">{`$${product.price}`}</div>
                                    <div className="table-cell">{product.stock_quantity}</div>
                                    <div className="table-cell">
                                        <span className="status-badge in-stock">In Stock</span>
                                    </div>
                                    <div className="table-cell">{product.created_at}</div>
                                    <div className="table-cell actions-cell">
                                        <button className="action-btn view-btn">👁</button>
                                        <button className="action-btn edit-btn">✏️</button>
                                        <button className="action-btn delete-btn">🗑</button>
                                    </div>
                                </div>
                                
                             
                                })}
                               
                                
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
