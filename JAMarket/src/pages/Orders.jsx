import React from 'react'
import "../css/Orders.css"
import { useOrdersContext } from '../contexts/OrdersContext'
import { useState } from 'react';
import OrderCard from '../components/customer/OrderCard';
const Orders = () => {
  const { orders, orderItems } = useOrdersContext();
    console.log("ito mga order mo", orders);
    console.log("ito order items", orderItems)
 const [ activeTab, setActiveTab ] = useState("to-ship");


 const handleActiveTab = (tab) => {
  setActiveTab(tab);
 }
  return (
    <div className='order-container'>
        <div className="order-header-container">
            <h2>My Orders</h2>
        </div>
        <div className="order-btn-container">
            <button id="to-ship" onClick={() => handleActiveTab("to-ship")}>To Ship</button>
            <button id="shipped" onClick={() => handleActiveTab("shipped")}>Shipped</button>
            <button id="received" onClick={() => handleActiveTab("received")}>Received</button>
            <button id="cancelled" onClick={() => handleActiveTab("cancelled")}>Cancelled</button>
        </div>
        <div className="orders-container">
        { activeTab === "to-ship" ? (
          <div>
          {
            orders && orderItems.order ? (
                orders
                  .filter(order => order.status === "pending")
                  .flatMap(order => 
                    orderItems.order
                      .filter(orderItem => orderItem.order.id === order.id)
                      .map(orderItem => (
                        <OrderCard 
                          key={`${order.id}-${orderItem.order.id}`}
                          order={order}
                          orderItem={orderItem}
                        />
                    ))
                )
            ) : (
              <div>Loading orders...</div>
            )
          }
          </div>
        
        ) : activeTab === "shipped" ? (
          <div>This is shipped </div>
        ) : activeTab === "received" ? (
          <div>This is received</div>
        ) : activeTab === "cancelled" ? (
          <div>this is cancelled</div>
        ) : null}
        </div>
      
    </div>
  )
}

export default Orders
