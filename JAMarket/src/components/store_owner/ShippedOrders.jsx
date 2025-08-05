import React, { useEffect, useState } from 'react'
import { useOrdersContext } from '../../contexts/OrdersContext'
import { useAuthContext } from '../../contexts/AuthContext'
import "../../css/StoreOrders.css"
const ShippedOrders = () => {
  const { storeOwnerOrders, rejectOrder, getAllOrdersFromStoreOwner } = useOrdersContext();
  const { partnerData } = useAuthContext();
  const [shippedOrders, setShippedOrders] = useState([]);
  
  useEffect(() => {
      setShippedOrders(storeOwnerOrders?.filter((orders) => orders.status === "shipped"));
    
  }, [storeOwnerOrders]);

    console.log("ito shipped orders", shippedOrders)


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-PH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }   

  return (
    <div className='store-orders-container'>
      <table>
         <thead>
          <tr>
            <th>ORDER ID</th>
            <th>CUSTOMER ID</th>
            <th>CUSTOMER NAME</th>
            <th>PRODUCT</th>
            <th>QUANTITY</th>
            <th>TOTAL AMOUNT</th>
            <th>ORDER DATE</th>
            <th>SHIPPED DATE</th>
          </tr>
         </thead>
         <tbody>
            {shippedOrders && shippedOrders.length > 0 ? (
            shippedOrders.map((order) => {
            return <tr key={order.id}>
                     <td className='store-owner-order-ids'>#{order?.id}</td>
                     <td className='store-owner-order-ids'>#{order?.customer_id}</td>
                     <td>{`${order?.users?.first_name} ${order.users?.last_name}`}</td>
                    <td>{order.orders_item[0]?.products?.product_name}</td>
                    <td className='quantity-cell'>{order?.orders_item[0]?.quantity}</td>
                    <td className='amount-cell'>₱{order?.total_amount}</td>
                    <td>{formatDate(order?.order_date)}</td>
                    <td>{formatDate(order?.ship_date)}</td>
              
                  </tr>
            })
            ) : (
              <tr>
                <td colSpan="8" className='no-orders'>No shipped orders found</td>
              </tr>
            )}
         </tbody>
      </table>
    </div>
  )
}

export default ShippedOrders
