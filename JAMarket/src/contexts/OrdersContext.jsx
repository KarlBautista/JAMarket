import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { useCartContext } from "./CartContext";
const OrdersContext = createContext();

export const useOrdersContext = () => useContext(OrdersContext);

export const OrderProvider = ({ children }) => {
      const [ orders, setOrders ] = useState([]);
      const [ orderItems, setOrderItems ] = useState({ order: [], products: []});
      const { customerData } = useAuthContext();
      const { getCart } = useCartContext();
    useEffect(() => {
        const getAllOrders = async () => {
            if (!customerData?.id) {
                console.log("Customer data not available yet");
                return;
            }
            
            try{
                const response = await fetch(`http://localhost:5000/api/orders?id=${customerData.id}`);
                if(!response.ok){
                    console.error("Response not ok:", response.status);
                    return;
                }
                const data = await response.json();
                
                console.log("Orders fetched:", data);
                setOrders(data.data || []);
                
            } catch(err){
                console.error("Error fetching orders:", err);
            }
        }
        getAllOrders()
    }, [customerData?.id]);

 
    useEffect(() => {
        const getAllOrderItems = async () => {
            if (!orders || orders.length === 0) {
                console.log("No orders available yet");
                return;
            }
            const orderIds = orders.map((order) => `orderId=${order.id}`).join("&");
            try{
                const response = await fetch(`http://localhost:5000/api/order-items?${orderIds}`);
                if(!response.ok){
                    console.error("Order items response not ok:", response.status);
                    return;
                }
                const data = await response.json();
                alert(data.message);
                setOrderItems({ order: data.orderItem, products: data.orderProducts });
                console.log("ito lahat ng order items and products mo baliw: ", orderItems)
            } catch(err){
                console.error("Error fetching order items:", err);
            }
        }
        getAllOrderItems();
        console.log("ito orderitems", orderItems)
    }, [orders]);
     



  const placeOrder = async (userId, cartProduct, subtotal, mop) => {
    try{
        const response = await fetch("http://localhost:5000/api/place-order", {
             method: "POST",
             headers: {
                "Content-Type": "application/json"
             },
             body: JSON.stringify({
                userId,
                cart: cartProduct,
                totalAmount: subtotal,
                mop
             })
        });
        if(!response.ok){
            console.error(response.error);
        }   
        const data = await response.json();
        getCart();
        return data;  
    } catch(err){
        console.error(err);
    }
  }

  const cancelOrder = async (orderId) => {
    try{
        const response = await fetch(`http://localhost:5000/api/cancel-order?orderId=${orderId}`);
        if(!response.ok){
            console.log(response.status);
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
    }
  }

  const value = {
    placeOrder,
    orders,
    orderItems,
    cancelOrder
  }
  return (
    <OrdersContext.Provider value={value}> 
        { children }
    </OrdersContext.Provider>
  )
}