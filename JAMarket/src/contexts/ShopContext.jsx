import { createContext, useContext, useState, useEffect } from "react";

const ShopContext = createContext();

export const useShopContext = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
    const [shops, setShops] = useState([]);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const getAllShops = async () => {
            try{
                const response = await fetch("http://localhost:5000/api/all-shops");
                if(!response.ok){
                    console.error(response.error);
                    return;
                }
                const data = await response.json();
               setShops(data.data);
            } catch(err){
                console.error(err);
            }
        };

        const getAllProducts = async () => {
            try{
                const response = await fetch("http://localhost:5000/api/all-shop-products");
                if(!response.ok){
                    console.error(response.error);
                    return
                }
                const data = await response.json();
                setProducts(data.data);
                
            } catch(err){
                console.error(err);
            }
        }

        getAllShops();
        getAllProducts();
    }, []);

   console.log(products)
    const value = {
     shops,
     products,
    }

    return(
        <ShopContext.Provider value={value}>
            { children }
        </ShopContext.Provider>
    )
}