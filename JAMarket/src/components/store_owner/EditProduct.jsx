import React, { useEffect, useState } from 'react'
import '../../css/EditProduct.css'
import { useAuthContext } from '../../contexts/AuthContext'
import Swal from 'sweetalert2'

const EditProduct = ({ product, onClose = () => {}, onSaved = () => {} }) => {
  const { partnerData } = useAuthContext();
  const userId = partnerData?.id;
    console.log(product)
  const [productData, setProductData] = useState({
    productName: '',
    description: '',
    price: '',
    category: 'Guitar',
    stockQuantity: '',
    sku: '',
    productImage: null,
  })

  useEffect(() => {
    if (!product) return;
    setProductData({
      productName: product.product_name || product.productName || '',
      description: product.description || product.desc || '',
      price: product.price || product.product_price || '',
      category: product.category || 'Guitar',
      stockQuantity: product.stock_quantity || product.stockQuantity || '',
      sku: product.sku || product.SKU || '',
      productImage: product.product_image || null,
    })
  }, [product])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setProductData(prev => ({ ...prev, [name]: files[0] }))
    } else {
      setProductData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append('productId', product.id || product.product_id || '');
    formData.append('userId', userId || '');
    formData.append('productName', productData.productName);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('category', productData.category);
    formData.append('stockQuantity', productData.stockQuantity);
    formData.append('sku', productData.sku);

    if (productData.productImage instanceof File) {
      formData.append('file', productData.productImage); 
      formData.append('oldImageUrl', product.product_image); 
    }

    const response = await fetch("https://jamarket.onrender.com/api/update-product", {
      method: "PUT",
      body: formData, 
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      console.error(`Error: ${data.error || response.statusText}`);
      return;
    }

    Swal.fire({
      title: data.message,
      timer: 2000,
      icon: "success",
    });
    onSaved({
    ...product,
      product_name: productData.productName,
      description: productData.description,
      price: productData.price,
      category: productData.category,
      stock_quantity: productData.stockQuantity,
      sku: productData.sku,
      product_image: productData.productImage instanceof File
        ? data.newImageUrl || product.product_image 
        : product.product_image,
  });



    onClose();

  } catch (err) {
    console.error(`Error Updating Product: ${err.message}`);
  }
};

  
    

  const handleCancel = () => {
    onClose();
  }

  const renderImagePreview = () => {
    if (!productData.productImage) return null;
    if (productData.productImage instanceof File) {
      return (
        <img src={URL.createObjectURL(productData.productImage)} alt="preview" className="preview-image" />
      )
    }
 
    return <img src={productData.productImage} alt="preview" className="preview-image" />
  }

  return (
    <div className="edit-backdrop" onClick={handleCancel}>
      <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
        <div className="edit-header">
          <h3>Edit Product</h3>
          <button className="close-btn" onClick={handleCancel}>✕</button>
        </div>

        <form className="add-product-form" onSubmit={handleSubmit}>
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
                <option value="Drum">Drums</option>
                <option value="Keyboard">Keyboard</option>
                <option value="Microphone">Microphone</option>
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
              <label htmlFor="productImage">Product Image</label>
              <div className="image-upload-container">
                <input
                  type="file"
                  id="productImage"
                  name="productImage"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="image-input"
                />
                <div className="image-upload-preview">
                  {renderImagePreview() || (
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
            <button type="submit" className="save-btn">Update Product</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProduct
