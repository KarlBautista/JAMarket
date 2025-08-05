import React from 'react'
import "../../css/OrderCard.css"
import { useOrdersContext } from '../../contexts/OrdersContext';
const OrderCard = ({ order, orderItem, productItem }) => {
  const { cancelOrder, deleteOrder, receiveOrder } = useOrdersContext();
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  // Get status class for styling
  const getStatusClass = (status) => {
    return status ? status.toLowerCase() : 'pending';
  };


  const itemTotal = (productItem?.price || 0) * (orderItem?.quantity || 1);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short', 
      day: 'numeric'
    });
  };


  const handleCancelOrder = async () => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try{
        const data = await cancelOrder(order.id);
        alert(data.message);
      } catch(err){
        console.error(err);
      }
    }
  }

  const handleDeleteOrder = async () => {
    if(window.confirm("Are you sure you want to delete this order?"))
    try{
      const data = await deleteOrder(order.id);
      alert(data.message);
    } catch(err){
      console.error(err);
    }
  }

  const handleReceiveOrder = async () => {
    if(window.confirm("Are you sure you received this order?")){
      try{
        const data = await receiveOrder(order.id);
        alert(data.message);
      } catch (err){
        console.error(err);
      }
    }
  }

  // Check if order can be cancelled (only pending orders)
  const canCancel = order?.status === 'pending'
  const canDelete = order?.status === "cancelled"  || order.status === "delivered";;
  const canReceive = order.status === "shipped";
  

  return (
    <div className='order-card-container'>
      <div className="order-card-header">
        <div className={`order-status ${getStatusClass(order?.status)}`}>
          {order?.status || 'Pending'}
        </div>
        <div className="payment-method">
          {order?.payment_method || 'Credit Card'}
        </div>
      </div>

      <div className="order-card-content">
        <div className="product-image-container">
          {productItem?.product_image ? (
            <img 
              src={productItem.product_image} 
              alt={productItem.product_name || 'Product'}
              className="product-image"
            />
          ) : (
            <div className="product-image-placeholder">
              🎵
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="product-details">
          <h3 className="product-name">
            {productItem?.product_name || productItem?.name || 'Product Name'}
          </h3>
          <p className="product-category">
            {productItem?.category || 'Music Equipment'}
          </p>
          
          <div className="product-meta">
            <div className="product-price">
              {formatPrice(productItem?.price || 0)}
            </div>
            <div className="product-quantity">
              <span className="quantity-label">Qty:</span>
              <span className="quantity-value">{orderItem?.quantity || 1}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Order Information Section */}
      <div className="order-info-section">
        <div className="order-info-row">
          <span className="order-info-label">Order ID:</span>
          <span className="order-info-value order-id">#{order?.id || 'N/A'}</span>
        </div>
        <div className="order-info-row">
          <span className="order-info-label">Order Date:</span>
          <span className="order-info-value">{formatDate(order?.order_date)}</span>
        </div>
        { order.status === "shipped" ? (
          <div className="order-info-row">
          <span className='order-info-label'>Ship Date:</span>
          <span className="order-info-value">{formatDate(order?.ship_date)}</span>
          </div> ) : null
        }

        { order.status === "delivered" ? (
          <>
          <div className="order-info-row">
          <span className='order-info-label'>Ship Date:</span>
          <span className="order-info-value">{formatDate(order?.ship_date)}</span>
          </div>
          <div className='order-info-row'>
          <span className='order-info-label'>Deliver Date:</span>
          <span className='order-info-value'>{formatDate(order?.delivered_date)}</span>
          </div>
          </>
        ) : null
        
        }
      
        <div className="order-info-row">
          <span className="order-info-label">Payment Method:</span>
          <span className="order-info-value">{order?.payment_method || 'Credit Card'}</span>
        </div>
        <div className="order-info-row">
          <span className="order-info-label">Order Total:</span>
          <span className="order-info-value">{formatPrice(order?.total_amount || 0)}</span>
        </div>
      </div>
      <div className="order-card-footer">
        <div className="order-total">
          <span className="total-label">Item Total:</span>
          <span className="total-amount">{formatPrice(itemTotal)}</span>
        </div>
        
        <div className="order-actions">
          <button 
            className="cancel-btn"
            onClick={ canCancel ? () => handleCancelOrder() : 
                      canDelete ? () => handleDeleteOrder() :  
                      canReceive ? () => handleReceiveOrder() : 
                    
                      null}
          >
            {canCancel ? 'Cancel Order' : canDelete ? "Delete Order" : canReceive ? "Received" : null}
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderCard
