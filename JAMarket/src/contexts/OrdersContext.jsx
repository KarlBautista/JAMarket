import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";

const OrdersContext = createContext();

export const useOrdersContext = () => useContext(OrdersContext);

export const OrderProvider = ({ children }) => {
      const [ orders, setOrders ] = useState([]);
      const { customerData } = useAuthContext();
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
                setOrders(data.data);
                
            } catch(err){
                console.error("Error fetching orders:", err);
            }
        }

        const getAllOrderItems = async () => {
          try{
            
          } catch(err){
          console.error(err)
          }
       
          
        }
        getAllOrders()
        console.log("Customer ID:", customerData?.id)
    }, [customerData?.id]);
     



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
        return data;  
    } catch(err){
        console.error(err);
    }
  }

  const value = {
    placeOrder,
    orders,
  }
  return (
    <OrdersContext.Provider value={value}> 
        { children }
    </OrdersContext.Provider>
  )
}