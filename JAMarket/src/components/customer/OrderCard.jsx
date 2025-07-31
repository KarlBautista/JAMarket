import React from 'react'
import "../../css/OrderCard.css"
const OrderCard = ({ order, orderItem }) => {
  return (
    <div className='order-card-container'>
        {order.status}
      
    </div>
  )
}

export default OrderCard
