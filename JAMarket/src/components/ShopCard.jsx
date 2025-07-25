import React from 'react'
import "../css/ShopCard.css"
import ReactSvg from "../assets/react.svg"
import { useNavigate } from 'react-router-dom'
const ShopCard = ({ shop }) => {
    const navigate = useNavigate();
    const handleShopCard = () => {
       navigate(`/store-page?id=${shop.id}`);
    }
  return (
    <div className='shop-card-container' onClick={() => handleShopCard()}>
        <div className="shop-card-img-container">
            <img src={shop?.logo_url} alt={shop?.store_name || "Store"} />
        </div>

        <div className="shop-card-name">
            <p id='shop-card-store-name'>{ shop?.store_name }</p>
            <p className="shop-card-description">{shop?.about}</p>
            
            <div className="shop-card-stats">
                <div className="shop-stat">
                    <p className="shop-stat-number">{}</p>
                    <p className="shop-stat-label">Products</p>
                </div>
                <div className="shop-stat">
                    <p className="shop-stat-number">{shop?.rating || "4.8"}</p>
                    <p className="shop-stat-label">Rating</p>
                </div>
                <div className="shop-stat">
                    <p className="shop-stat-number">{shop?.reviews || "156"}</p>
                    <p className="shop-stat-label">Reviews</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ShopCard
