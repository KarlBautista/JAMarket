import React from 'react'
import "../../css/OrderCard.css"
const OrderCard = ({ order, orderItem, productItem }) => {

  return (
    <div className='order-card-container'>
        {order.status}
        {order.payment_method}
        {orderItem.quantity}

        {productItem.product_name}
        {productItem.category}
        {productItem.price}
      
    </div>
  )
}

export default OrderCard
