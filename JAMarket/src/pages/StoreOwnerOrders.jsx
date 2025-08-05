import React, { useEffect, useState } from 'react'
import "../css/StoreOwnerOrders.css"
import StoreOwnerNavigation from '../components/store_owner/StoreOwnerNavigation'
import PendingOrders from '../components/store_owner/PendingOrders';
import ShippedOrders from '../components/store_owner/ShippedOrders';
import DeliveredOrders from '../components/store_owner/DeliveredOrders';
import { useOrdersContext } from '../contexts/OrdersContext';
import { useAuthContext } from '../contexts/AuthContext';
const StoreOwnerOrders = () => {
    const [ activeLink, setActiveLink ] = useState("pending");
   const { getAllOrdersFromStoreOwner } = useOrdersContext();
    const { partnerData } = useAuthContext();
    useEffect(() => {
        const getAllOrders = async () => {  
            if (!partnerData?.id) {
                console.log("Partner data not available yet");
                return;
            }
            try{
                await getAllOrdersFromStoreOwner(partnerData.id);
                
            } catch(err){
                console.error(err);
            }
        }
        getAllOrders();
    }, [])


    const handlePending = () => {
        setActiveLink("pending");
    }

    const handleShipped = () => {
        setActiveLink("shipped");
    }

    const handleDelivered = () => {
        setActiveLink("delivered");
    }
  return (
    <div className='store-owner-orders'>
        <StoreOwnerNavigation />
        <div className="store-owner-orders-container">
            <div className="store-owner-orders-header">
                <h2>Orders Management</h2>
            </div>
            <div className="store-owner-orders-navigation">
                <button onClick={() => handlePending()}>Pending</button>
                <button onClick={() => handleShipped()}>Shipped</button>
                <button onClick={() => handleDelivered()}>Delivered</button>
            </div>
            <div className="orders-content">
                { activeLink === "pending" ? <PendingOrders /> :
                  activeLink === "shipped" ? <ShippedOrders /> :
                  activeLink === "delivered" ? <DeliveredOrders />
                 : null
                }
            </div>
        </div>
    </div>
  )
}

export default StoreOwnerOrders
