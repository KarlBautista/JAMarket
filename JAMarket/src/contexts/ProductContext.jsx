import { useContext, createContext, useState, useEffect } from "react";


const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    useEffect(() => {
       const getFeaturedProducts = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/featured-products");
            if(!response.ok){
                console.error(`Error getting featured products: ${response.error}`);
                return
            }
            const data = await response.json();
            setFeaturedProducts(data.data);
        } catch (err) {
            console.error(`Error getting featured products: ${err.message}`)
        }
    }
    getFeaturedProducts();
    }, []);

    const getProduct = async (id) => {
        try{
            const response = await fetch(`http://localhost:5000/api/product?id=${id}`);
            if(!response.ok){
                console.error(response.error);
                return
            }
            const data = await response.json();
            console.log("from context", data)
            return data;
        } catch(err){
            console.error(err.message);
        }
    }

    const getProductByCategory = async (category) => {
        try {
            const response = await fetch("http://localhost:5000/api/products-by-category", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({ category }),
            });
            if(!response.ok){
                console.error(`Error getting products by category: ${response.error}`);
            }
            const data = await response.json();
            return data;

        } catch (err) {
            console.error(`Error getting products by category: ${err.message}`)
        }
    }

    const deleteProduct = async (productId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/delete-product/${productId}`, {
                method: "DELETE"
            });
            const data = await response.json();
            if (!response.ok) {
                console.error(`Error Deleting Product ${productId}: ${data?.error || response.statusText}`);
                return { success: false, error: data?.error };
            }
            return data;
        } catch (err) {
            console.error(`Error Deleting product: ${productId}: ${err.message}`);
            return { success: false, error: err.message };
        }
    }

    const getProductToUpdate = async (productId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/product-to-update/${productId}`);
            if(!response.ok){
                console.error(`Error getting the product dat: ${response.statusText}`);
                return
            }
            const data = await response.json();
            if(!data.success){
                console.error(`Error getting product data: ${data.error}`);
                return
            }
            console.log(data);
            return data.data;
        } catch (err) {
            console.error(`Something went wrong getting the product data: ${productId}`);
            return
        }
    }

 


    const value = {
        getProduct,
       featuredProducts,
       getProductByCategory,
       deleteProduct,
       getProductToUpdate
    }
    return(
        <ProductContext.Provider value={value}>
            { children }
        </ProductContext.Provider>
    )
}