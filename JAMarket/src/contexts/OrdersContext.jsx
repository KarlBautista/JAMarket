import { createContext, useContext, useEffect, useState } from "react";


const OrdersContext = createContext();

export const useOrdersContext = () => useContext(OrdersContext);

export const OrderProvider = ({ children }) => {
      const [ orders, setOrders ] = useState([]);
    useEffect(() => {
        const getAllOrders = async () => {
            try{
                const response = await fetch("http://localhost:5000/api/orders");
                if(!response.ok){
                    console.error(response.error)
                }
                const data = await response.json();
                alert(data.message);
                console.log(data.data);
                
            } catch(err){
                console.error(err);
            }
        }
            getAllOrders()
    }, []);
     



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