import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [ cart, setCart ] = useState([]);
    const [ cartProduct, setCartProduct ] = useState([]);
    const { customerData } = useAuthContext();
    const userId = customerData?.id;

    useEffect(() => {
        if (!userId) return;
        const getCart = async () => {
              console.log("✅ useEffect running - fetching cart");
            try{
                const response = await fetch(`http://localhost:5000/api/get-cart?userId=${userId}`)
                if(!response.ok){
                    throw new Error(`failed to get cart: ${response.error}`);
                }
                const data = await response.json();
                
                setCart(data.data);
            } catch(err){
                console.error(err);
            }
        }

        const getCartProduct = async () => {
            try{
               const productId = cart.map((c) => c.product_id);
              const query = productId.map((id) => `id=${id}`).join("&");
               const response = await fetch(`http://localhost:5000/api/get-cart-product?${query}`);
               if(!response.ok){
                throw new Error("Failed to get cart products: ", response.error );
               }

               const data = await response.json();
               alert(data.message);
               setCartProduct(data.data)
            } catch(err){
                console.error(err);
            }
        }
        getCart();
        getCartProduct();
    }, [userId]);
    console.log(cartProduct);
   


    const addToCart = async (productId, customerId) => {
        
        try{
            const response = await fetch("http://localhost:5000/api/add-to-cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(({productId, customerId}))
            });
            if(!response.ok){
                console.error("failed to insert to cart", response.error);
            }
     

        } catch(err){
            console.error(err);
        }
    }

    const value = {
        cart,
        addToCart,
    }

    return(
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}