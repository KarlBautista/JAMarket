import React from 'react'
import "../css/Orders.css"
import { useOrdersContext } from '../contexts/OrdersContext'
import { useState } from 'react';
import OrderCard from '../components/customer/OrderCard';
const Orders = () => {
  const { orders, orderItems } = useOrdersContext();
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
            orders && orderItems.order && orderItems.products ? (
                orders
                  .filter(order => order.status === "pending")
                  .flatMap(order => 
                    orderItems.order
                      .filter(orderItem => orderItem.order_id === order.id)
                      .map(orderItem => {
                        // Find the specific product for this order item
                        const product = orderItems.products.find(p => p.product_id === orderItem.product_id);
                        return (
                          <OrderCard 
                            key={`${order.id}-${orderItem.id}`}
                            order={order}
                            orderItem={orderItem}
                            productItem={product}
                          />
                        );
                      })
                  )
            ) : (
              <div>Loading orders...</div>
            )
          }
          </div>
        
        ) : activeTab === "shipped" ? (
          <div>
          {
            orders && orderItems.order && orderItems.products ? (
                orders
                  .filter(order => order.status === "shipped")
                  .flatMap(order => 
                    orderItems.order
                      .filter(orderItem => orderItem.order_id === order.id)
                      .map(orderItem => {
                        const product = orderItems.products.find(p => p.product_id === orderItem.product_id);
                        return (
                          <OrderCard 
                            key={`${order.id}-${orderItem.id}`}
                            order={order}
                            orderItem={orderItem}
                            productItem={product}
                          />
                        );
                      })
                  )
            ) : (
              <div>No shipped orders</div>
            )
          }
          </div>
        ) : activeTab === "received" ? (
          <div>
          {
            orders && orderItems.order && orderItems.products ? (
                orders
                  .filter(order => order.status === "delivered" || order.status === "received")
                  .flatMap(order => 
                    orderItems.order
                      .filter(orderItem => orderItem.order_id === order.id)
                      .map(orderItem => {
                        const product = orderItems.products.find(p => p.product_id === orderItem.product_id);
                        return (
                          <OrderCard 
                            key={`${order.id}-${orderItem.id}`}
                            order={order}
                            orderItem={orderItem}
                            productItem={product}
                          />
                        );
                      })
                  )
            ) : (
              <div>No received orders</div>
            )
          }
          </div>
        ) : activeTab === "cancelled" ? (
          <div>
          {
            orders && orderItems.order && orderItems.products ? (
                orders
                  .filter(order => order.status === "cancelled")
                  .flatMap(order => 
                    orderItems.order
                      .filter(orderItem => orderItem.order_id === order.id)
                      .map(orderItem => {
                        const product = orderItems.products.find(p => p.product_id === orderItem.product_id);
                        return (
                          <OrderCard 
                            key={`${order.id}-${orderItem.id}`}
                            order={order}
                            orderItem={orderItem}
                            productItem={product}
                          />
                        );
                      })
                  )
            ) : (
              <div>No cancelled orders</div>
            )
          }
          </div>
        ) : null}
        </div>
      
    </div>
  )
}

export default Orders
