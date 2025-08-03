import React, { useState } from 'react'
import "../../css/AddProducts.css"
import { useAuthContext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
const AddProducts = () => {
    const { partnerData } = useAuthContext();
    const userId = partnerData.id;
    const userStore = partnerData.store_name;
    const navigate = useNavigate();
    console.log(userId)
    const [productData, setProductData] = useState({
        productName: '',
        description: '',
        price: '',
        category: 'Guitar',
        stockQuantity: '',
        sku: '',
        productImage: null
    })

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target
        
        if (type === 'file') {
            setProductData(prev => ({
                ...prev,
                [name]: files[0]
            }))
        } else {
            setProductData(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("storeName", userStore);
        formData.append("productName", productData.productName);
        formData.append("description",productData. description);
        formData.append("price", productData.price);
        formData.append("category", productData.category);
        formData.append("stockQuantity", productData.stockQuantity);
        formData.append("sku", productData.sku);
        formData.append("productImage", productData.productImage);
       
        try{
            const response = await fetch("http://localhost:5000/api/add-product", {
                method: "POST",
                body: formData,
            });

            if(!response.ok){
                console.log(response.error);
                return;
            }
            const data = await response.json();
           handleCancel();
           alert(data.message)

        } catch(err){
            console.error(err)
        }
    }

    const handleCancel = () => {
        setProductData({
            productName: '',
            description: '',
            price: '',
            category: 'Guitar',
            stockQuantity: '',
            sku: '',
            productImage: null
        });
        

    }

  return (
    <div className='add-product'>
        <div className="add-product-header">
            <h2>Add New Product</h2>
        </div>

        <div className="add-product-form-title">
                <h3>Add New Product</h3>
        </div>

        <form className="add-product-form" onSubmit={handleSubmit}>
            <div className="basic-information">
                <p>Basic Information</p>
            </div>

            <div className="add-product-input-row">
                <div className="add-product-group">
                    <label htmlFor="productName">Product Name*</label>
                    <input 
                        type="text" 
                        id="productName"
                        name="productName"
                        value={productData.productName}
                        onChange={handleInputChange}
                        className='product-name-input' 
                        required
                    />
                </div>
            </div>

            <div className="add-product-input-row">
                <div className="add-product-group">
                    <label htmlFor="description">Description*</label>
                    <textarea 
                        name="description" 
                        id="description" 
                        value={productData.description}
                        onChange={handleInputChange}
                        rows="5"
                        className="product-input-textarea"
                        required
                    />
                </div>
            </div>

            <div className="add-product-input-row">
                <div className="add-product-group">
                    <label htmlFor="price">Price*</label>
                    <input 
                        type="number" 
                        id="price"
                        name="price" 
                        value={productData.price}
                        onChange={handleInputChange}
                        className='add-product-price'
                        step="0.01"
                        min="0"
                        required
                    />
                </div>

                <div className="add-product-group">
                    <label htmlFor="category">Category*</label>
                    <select 
                        name="category" 
                        id="category"
                        value={productData.category}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="Guitar">Guitar</option>
                        <option value="Bass">Bass</option>
                        <option value="Drums">Drums</option>
                        <option value="Keyboard">Keyboard</option>
                        <option value="Amplifier">Amplifier</option>
                        <option value="Accessories">Accessories</option>
                    </select>
                </div>
            </div>

            <div className="add-product-input-row">
                <div className="add-product-group">
                    <label htmlFor="stockQuantity">Stock Quantity*</label>
                    <input 
                        type="number" 
                        id="stockQuantity"
                        name="stockQuantity"
                        value={productData.stockQuantity}
                        onChange={handleInputChange}
                        min="0"
                        required
                    />
                </div>

                <div className="add-product-group">
                    <label htmlFor="sku">SKU*</label>
                    <input 
                        type="text" 
                        id="sku"
                        name="sku"
                        value={productData.sku}
                        onChange={handleInputChange}
                        placeholder="e.g., FEN-STR-001"
                        required
                    />
                </div>
            </div>

            <div className="add-product-input-row">
                <div className="add-product-group">
                    <label htmlFor="productImage">Product Image*</label>
                    <div className="image-upload-container">
                        <input 
                            type="file" 
                            id="productImage" 
                            name="productImage" 
                            accept="image/*"
                            onChange={handleInputChange}
                            className="image-input"
                            required
                        />
                        <div className="image-upload-preview">
                            {productData.productImage ? (
                                <div className="image-preview">
                                    <img 
                                        src={URL.createObjectURL(productData.productImage)} 
                                        alt="Product preview" 
                                        className="preview-image"
                                    />
                                    <p>{productData.productImage.name}</p>
                                </div>
                            ) : (
                                <div className="upload-placeholder">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M17 8L12 3L7 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <p>Click to upload or drag and drop</p>
                                    <span>PNG, JPG, GIF up to 5MB</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="add-product-buttons">
                <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
                <button type="submit" className="save-btn">Save Product</button>
            </div>
        </form>
    </div>
  )
}

export default AddProducts
