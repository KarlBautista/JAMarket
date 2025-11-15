import React, { useEffect, useState } from 'react'
import "../../css/Products.css"
import StoreOwnerNavigation from './StoreOwnerNavigation'
import AddProducts from './AddProducts'
import { useAuthContext } from '../../contexts/AuthContext'
import { useProductContext } from '../../contexts/ProductContext'
import Swal from 'sweetalert2'
import EditProduct from './EditProduct'
const Products = () => {
    const [showAddProduct, setShowAddProduct] = useState(false);
    const { partnerData } = useAuthContext();
    const { deleteProduct, getProductToUpdate } = useProductContext();
    const [ allProducts, setAllProducts] = useState([]);
    const [productDataToUpdate, setProductDataToUpdate] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false);
    const userId = partnerData?.id;
 
    const handleAddProduct = () => {
        setShowAddProduct(true)
    }

    console.log(allProducts);

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

    const handleEditProduct = async (productId) => {
        try {
            const response = await getProductToUpdate(productId);
            if (response) {
                setProductDataToUpdate(response[0]);
                setShowEditForm(true);
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    const handleDeleteProduct = async (productId) => {
        console.log(productId);
           const isConfirm =  await Swal.fire({
                title: "Are you sure you want to delete this product?",
                showCancelButton: true,
                showConfirmButton: true,
            });
            if(isConfirm.isConfirmed){
                try {
                    const response = await deleteProduct(productId);
                    if (response && response.success) {
                        setAllProducts(prev => prev.filter(p => p.product_id !== productId));
                        await Swal.fire({ 
                            title: `Product ${productId} has been deleted`,
                            timer: 1500,
                        })
                    } else {
                        console.error('Delete failed', response);
                        await Swal.fire({ title: 'Could not delete product', icon: 'error' });
                    }
                } catch (err) {
                    console.error(`Error Deleting Product ${productId}: ${err.message}`);
                }
            }
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
                                             {showEditForm && (
                                                 <EditProduct
                                                     product={productDataToUpdate}
                                                     onClose={() => setShowEditForm(false)}
                                                     onSaved={(updated) => {
                                
                                                         setAllProducts(prev => prev.map(p => ((p.product_id || p.id) === (updated.product_id || updated.id) ? { ...p, ...updated } : p)));
                                                         setShowEditForm(false);
                                                     }}
                                                 />
                                             )}
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
                                return  <div className="table-row" key={product.product_id || product.id}>
                                    <div className="table-cell product-cell">
                                        <div className="product-image">
                                            <img src={product.product_image} alt="Guitar" />
                                        </div>
                                        <div className="product-info">
                                            <div className="product-name">{product.product_name}</div>
                                    
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
                                        <button onClick={() => handleEditProduct(product.product_id)} className="action-btn view-btn" title='edit'>✏️</button>
                                        <button onClick={() => handleDeleteProduct(product.product_id)} className="action-btn edit-btn" title='delete'>🗑️</button>
                                      
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
