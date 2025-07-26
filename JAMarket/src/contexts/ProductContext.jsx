import { useContext, createContext, useState, useEffect } from "react";

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    const getProduct = async (id) => {
        try{
            const response = await fetch(`http://localhost:5000/api/product?id=${id}`);
            if(!response.ok){
                console.error(response.error);
                return
            }
            const data = await response.json();
            return data;
        } catch(err){
            console.error(err);
        }
    }


    const value = {
        getProduct,
    }
    return(
        <ProductContext.Provider value={value}>
            { children }
        </ProductContext.Provider>
    )
}