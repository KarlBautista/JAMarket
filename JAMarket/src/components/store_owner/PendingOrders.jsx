import React, { useEffect, useState } from 'react'
import { useOrdersContext } from '../../contexts/OrdersContext'
import { useAuthContext } from '../../contexts/AuthContext'
import "../../css/StoreOrders.css"
const PendingOrders = () => {
  const { storeOwnerOrders, rejectOrder, getAllOrdersFromStoreOwner, shipOrder } = useOrdersContext();
  const { partnerData } = useAuthContext();
  const [pendingOrders, setPendingOrders] = useState([]);
  
  useEffect(() => {
      setPendingOrders(storeOwnerOrders?.filter((orders) => orders.status === "pending"));
      console.log("ito pending orders", pendingOrders)
  }, [storeOwnerOrders]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-PH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })

  }   

  const handleReject = async (orderId) => {
    if(window.confirm("Are you sure you want to reject this order?")){
      try{
        const response = await rejectOrder(orderId);
        if(response && partnerData?.id) {
          await getAllOrdersFromStoreOwner(partnerData.id);
        }
      } catch(err){
        console.error(err);
      }
    }
  }

  const handleShip = async (orderId) => {
    if(window.confirm("Are you sure you want to ship this order?")){
      try{
        const response = await shipOrder(orderId);
        if(response && partnerData?.id) {
          await getAllOrdersFromStoreOwner(partnerData.id);
        }
      } catch(err){
        console.error(err);
      }
    }
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
            <th>ACTIONS</th>
          </tr>
         </thead>
         <tbody>
            {pendingOrders && pendingOrders.length > 0 ? (
            pendingOrders.map((order) => {
            return <tr key={order.id}>
                     <td className='store-owner-order-ids'>#{order?.id}</td>
                     <td className='store-owner-order-ids'>#{order?.customer_id}</td>
                     <td>{`${order?.users?.first_name} ${order.users?.last_name}`}</td>
                    <td>{order.orders_item[0]?.products?.product_name}</td>
                    <td className='quantity-cell'>{order?.orders_item[0]?.quantity}</td>
                    <td className='amount-cell'>₱{order?.total_amount}</td>
                    <td>{formatDate(order?.order_date)}</td>
                    <td className='actions-cell'>
                      <button className='reject-btn' onClick={() => handleReject(order?.id)}>REJECT</button>
                      <button className='ship-btn' onClick={() => handleShip(order?.id)}>SHIP</button>
                    </td>
                  </tr>
            })
            ) : (
              <tr>
                <td colSpan="8" className='no-orders'>No pending orders found</td>
              </tr>
            )
            }
         </tbody>
      </table>
      
    </div>
  )
}

export default PendingOrders
