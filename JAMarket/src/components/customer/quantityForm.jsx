import React, { useState } from 'react'
import "../../css/QuantityForm.css";

const QuantityForm = ({ product, isOpen, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setQuantity(1); 
    onClose(); 
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="quantity-form-backdrop" onClick={handleBackdropClick}>
      <div className='quantity-form-container'>
        <div className="quantity-form-header">
          <h3>Add to Cart</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="product-preview">
          <div className="product-image">
            {product?.product_image ? (
              <img src={product.product_image} alt={product.product_name} />
            ) : (
              <div className="product-placeholder">📦</div>
            )}
          </div>
          <div className="product-details">
            <h4>{product?.product_name || 'Product Name'}</h4>
            <p className="product-price">₱{product?.price || 0}</p>
          </div>
        </div>

        <div className="quantity-section">
          <label>Quantity:</label>
          <div className="quantity-controls">
            <button 
              type="button" 
              className="quantity-btn" 
              onClick={handleDecrement}
              disabled={quantity <= 1}
            >
              -
            </button>
            <input 
              type="number" 
              value={quantity} 
              onChange={handleQuantityChange}
              min="1"
              className="quantity-input"
            />
            <button 
              type="button" 
              className="quantity-btn" 
              onClick={handleIncrement}
            >
              +
            </button>
          </div>
        </div>

        <div className="form-footer">
          <div className="total-price">
            <span>Total: ₱{(product?.price || 0) * quantity}</span>
          </div>
          <div className="form-actions">
            <button className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuantityForm
