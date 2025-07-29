import React, { useEffect, useState } from 'react'
import "../css/StorePage.css"
import { useSearchParams } from 'react-router-dom'
import { useShopContext } from '../contexts/ShopContext'
import ProductCard from "../components/products/ProductCard";
import ReactSvg from "../assets/react.svg"
const StorePage = () => {
  const [searchParams] = useSearchParams();
  const storeId = searchParams.get("id");
  const { getAllProductFromStore, productsFromStore, getShopData } = useShopContext();
  const [ products, setProducts ] = useState([]);
  const [ shop, setShop ] = useState({});
  useEffect(() => {
    const getAllProducts = async () => {
      const data = await getAllProductFromStore(storeId);
      setProducts(data);
    }

    const getShop = async () => {
      const data = await getShopData(storeId);
      if(data !== null){
        setShop(data);
      }
    }
    getAllProducts();
    getShop();
  }, []);

  console.log(shop);
  
  return (
    <div className='store-page-container'>
      <div className="store-page-header">
        <div className="store-page-logo-container">
          <img src={shop?.logo_url} alt="" />
        </div>
        <div className="store-page-name">
          <h2>{shop?.store_name}</h2>
          <p>{shop?.about}</p>
        </div>
      </div>
        <div className="store-page-grid">
          { products?.map((product) => {
            return <ProductCard product={product} key={product.product_id} />
          })}
        </div>
     
    </div>
  )
}

export default StorePage
