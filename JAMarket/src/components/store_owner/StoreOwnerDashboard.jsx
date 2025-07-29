import React from 'react'
import "../../css/StoreOwnerDashboard.css"
import { useAuthContext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import dollarSymbol from "../../assets/dollar-symbol.png"
import StoreOwnerNavigation from './StoreOwnerNavigation'

const StoreOwnerDashboard = () => {
    const navigate = useNavigate();
    const { session, partnerData, signOut } = useAuthContext();
    console.log(partnerData)

    const handleSignOut = async () => {
        const response = await signOut();
        if(response.error){
            alert(response.error);
        }
        alert(response.message);
        navigate("/login");
    }
  return (
    <div className='store-owner-dashboard'>
     <StoreOwnerNavigation />
        <div className="dashboard">
            <div className="dashboard-header">
                 <h2>Store Dashboard</h2>
                 <p>last updated: 10:10:10</p>
            </div>

            <div className="statistics-dashboard">
                <div className="monthly-sales-dashboard">
                    <div className="monthly-sales-icon">
                        <img src={dollarSymbol} alt="" />
                    </div>

                    <div className="monthly-sales-title">
                        <p>Monthly Sales</p>
                        <h2>$9393</h2>
                    </div>

                </div>

                <div className="orders-dashboard">
                    <div className="orders-icon">
                        <img src={dollarSymbol} alt="" />
                    </div>

                    <div className="orders-title">
                        <p>Total Orders</p>
                        <h2>245</h2>
                    </div>
                </div>

                <div className="conversion-rate-dashboard">
                    <div className="conversion-rate-icon">
                        <img src={dollarSymbol} alt="" />
                    </div>

                    <div className="conversion-rate-title">
                        <p>Conversion Rate</p>
                        <h2>12.5%</h2>
                    </div>
                </div>

                <div className="new-customer-dashboard">
                    <div className="new-customer-icon">
                        <img src={dollarSymbol} alt="" />
                    </div>

                    <div className="new-customer-title">
                        <p>New Customers</p>
                        <h2>48</h2>
                    </div>
                </div>
            </div>
           
        </div>
    </div>
  )
}

export default StoreOwnerDashboard
