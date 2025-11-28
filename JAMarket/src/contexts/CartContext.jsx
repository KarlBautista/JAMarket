import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useAuthContext } from "./AuthContext";
const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [ cart, setCart ] = useState([]);
    const [ cartProduct, setCartProduct ] = useState([]);
    const { customerData } = useAuthContext();
    const userId = customerData?.id;

     const getCart = useCallback( async () => {
        if (!userId) return;
       
            
            try{
                const response = await fetch(`https://jamarket.onrender.com/api/get-cart?userId=${userId}`)
                if(!response.ok){
                    throw new Error(`failed to get cart: ${response.error}`);
                }
                const data = await response.json();
                
                setCart(data.data);
            } catch(err){
                console.error(err);
            }
        }, [userId]);

        useEffect(() => {
            getCart();
        }, [getCart]);
   
    

    useEffect(() => {
         const getCartProduct = async () => {
            try{
               if (!cart || cart.length === 0) {
                 setCartProduct([]);
                 return;
               }
               
               const productId = cart.map((c) => c.product_id);
               const query = productId.map((id) => `id=${id}`).join("&");
               console.log("Query string:", query); // Debug log
               console.log("Product IDs:", productId); // Debug log
               
               const response = await fetch(`https://jamarket.onrender.com/api/get-cart-product?${query}`);
               if(!response.ok){
                throw new Error("Failed to get cart products: ", response.error );
               }

               const data = await response.json();
               console.log("Cart product response:", data); // Debug log
               
               const updatedProducts = data?.data?.map((product) => {
                const match = cart.find((c) => c.product_id === product.product_id);
                return {
                    ...product,
                    quantity: match?.quantity || 1
                };
               });
               setCartProduct(updatedProducts || []);
            } catch(err){
                console.error("Error fetching cart products:", err);
                setCartProduct([]);
            }
        }
          getCartProduct();
       
    }, [cart]);
   
  
   const addToCart = async (customerId, productId, quantity) => {
        
        try{
            const response = await fetch("https://jamarket.onrender.com/api/add-to-cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(({productId, customerId, quantity}))
            });
            if(!response.ok){
                console.error("failed to insert to cart", response.status);
                return
            }
            await getCart();
          

            
        } catch(err){
            console.error(err);
        }
    }

    const deleteProductItem = async (id) => {
        try{
            console.log("Deleting cart item with ID:", id); // Debug log
            
            const response = await fetch(`https://jamarket.onrender.com/api/delete-from-cart?id=${id}`, {
                method: "DELETE",
            });
            
            if(!response.ok){
                console.error("Delete request failed:", response.status);
                return { success: false, error:"error deleting the product item from cart"}
            }
            
            const data = await response.json();
            console.log("Delete response:", data); // Debug log
            
            // Force refresh of cart data
            await getCart();
            
            return { success: true, message: data.message }
        } catch(err){
            console.error("Error in deleteProductItem:", err);
            return { success: false, error: err.message }
        }
    }

  

    const value = {
        cart,
        addToCart,
        cartProduct,
        deleteProductItem,
        getCart,
    }

    return(
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}