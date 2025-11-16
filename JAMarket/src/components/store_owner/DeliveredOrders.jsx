import React, { useEffect, useState } from 'react'
import { useOrdersContext } from '../../contexts/OrdersContext'
import Swal from 'sweetalert2'
import { useAuthContext } from '../../contexts/AuthContext'
import "../../css/StoreOrders.css"
const DeliveredOrders = () => {
  const { storeOwnerOrders, rejectOrder, getAllOrdersFromStoreOwner, shipOrder } = useOrdersContext();
  const { partnerData } = useAuthContext();
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  
  useEffect(() => {
      setDeliveredOrders(storeOwnerOrders?.filter((orders) => orders.status === "delivered"));
     
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
    const result = await Swal.fire({
      title: 'Reject Order',
      text: 'Are you sure you want to reject this order?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, reject',
      cancelButtonText: 'Cancel'
    });
    if(!result.isConfirmed) return;
    try{
      const response = await rejectOrder(orderId);
      if(response && partnerData?.id) {
        await getAllOrdersFromStoreOwner(partnerData.id);
        await Swal.fire({ title: 'Rejected', text: response.message || 'Order rejected', icon: 'success' });
      }
    } catch(err){
      console.error(err);
      await Swal.fire({ title: 'Error', text: 'Something went wrong', icon: 'error' });
    }
  }

  const handleShip = async (orderId) => {
    const result = await Swal.fire({
      title: 'Ship Order',
      text: 'Are you sure you want to ship this order?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, ship',
      cancelButtonText: 'Cancel'
    });
    if(!result.isConfirmed) return;
    try{
      const response = await shipOrder(orderId);
      if(response && partnerData?.id) {
        await getAllOrdersFromStoreOwner(partnerData.id);
        await Swal.fire({ title: 'Shipped', text: response.message || 'Order shipped', icon: 'success' });
      }
    } catch(err){
      console.error(err);
      await Swal.fire({ title: 'Error', text: 'Something went wrong', icon: 'error' });
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
            <th>DELIVERED DATE</th>
            <th>ACTIONS</th>
          </tr>
         </thead>
         <tbody>
            {deliveredOrders && deliveredOrders.length > 0 ? (
            deliveredOrders.map((order) => {
            return <tr key={order.id}>
                     <td className='store-owner-order-ids'>#{order?.id}</td>
                     <td className='store-owner-order-ids'>#{order?.customer_id}</td>
                     <td>{`${order?.users?.first_name} ${order.users?.last_name}`}</td>
                    <td>{order.orders_item[0]?.products?.product_name}</td>
                    <td className='quantity-cell'>{order?.orders_item[0]?.quantity}</td>
                    <td className='amount-cell'>₱{order?.total_amount}</td>
                    <td>{formatDate(order?.order_date)}</td>
                    <td>{formatDate(order?.delivered_date)}</td>
                    <td className='actions-cell'>
                      <button className='reject-btn' onClick={() => handleReject(order?.id)}>REJECT</button>
                      <button className='ship-btn' onClick={() => handleShip(order?.id)}>SHIP</button>
                    </td>
                  </tr>
            })
            ) : (
              <tr>
                <td colSpan="8" className='no-orders'>No delivered orders found</td>
              </tr>
            )
            }
         </tbody>
      </table>
      
    </div>
  )
}

export default DeliveredOrders
