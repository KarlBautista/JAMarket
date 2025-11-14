import React, { useState } from 'react';
import "../../css/StoreOwnerDashboard.css"
import { useAuthContext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import dollarSymbol from "../../assets/dollar-symbol.png"
import StoreOwnerNavigation from './StoreOwnerNavigation'
import Chart from "react-apexcharts";

const StoreOwnerDashboard = () => {
    const navigate = useNavigate();
    const { session, partnerData, signOut } = useAuthContext();

    const handleSignOut = async () => {
        const response = await signOut();
        if(response.error){
            alert(response.error);
        }
        alert(response.message);
        navigate("/login");
    }

    // ---------------------- CHART DATA ----------------------

    // 1. Monthly Sales Line Chart
    const monthlySales = {
        series: [
            { name: "Sales", data: [1200, 2300, 1800, 2900, 3400, 4200, 3900] }
        ],
        options: {
            chart: { id: "monthly-sales" },
            xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
            stroke: { curve: "smooth" },
            colors: ["#5A67D8"]
        }
    }

    // 2. Orders Per Day Bar Chart
    const dailyOrders = {
        series: [
            { name: "Orders", data: [20, 35, 30, 50, 60, 40, 25] }
        ],
        options: {
            chart: { id: "daily-orders" },
            xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
            colors: ["#38A169"]
        }
    }

    // 3. Category Distribution Donut Chart
    const categoryDistribution = {
        series: [44, 55, 41, 17, 22],
        options: {
            labels: ["Ulam Meals", "Street Foods", "Kakanin", "Desserts", "Drinks"],
            colors: ["#667EEA", "#48BB78", "#ED8936", "#E53E3E", "#3182CE"],
            legend: { position: "bottom" }
        }
    }

    // 4. Top Selling Products Horizontal Bar
    const topProducts = {
        series: [
            {
                name: "Units Sold",
                data: [50, 45, 38, 31, 20]
            }
        ],
        options: {
            chart: { id: "top-products" },
            xaxis: {
                categories: ["Adobo", "Sisig", "Halo-Halo", "Turon", "Banana Cue"]
            },
            colors: ["#ED64A6"],
            plotOptions: {
                bar: { horizontal: true }
            }
        }
    }

    // --------------------------------------------------------

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

                {/* -------------------- CHART CANVAS -------------------- */}

                <div className='chart-canvas'>
                    <div className="chart-row">
                        <div className='chart-container'>
                            <h2>Monthly Sales</h2>
                            <Chart
                                options={monthlySales.options}
                                series={monthlySales.series}
                                type="line"
                                height={220}
                            />
                        </div>

                        <div className='chart-container'>
                            <h2>Daily Orders</h2>
                            <Chart
                                options={dailyOrders.options}
                                series={dailyOrders.series}
                                type="bar"
                                height={220}
                            />
                        </div>
                    </div>

                    <div className="chart-row">
                        <div className='chart-container'>
                            <h2>Category Distribution</h2>
                            <Chart
                                options={categoryDistribution.options}
                                series={categoryDistribution.series}
                                type="donut"
                                height={220}
                            />
                        </div>

                        <div className='chart-container'>
                            <h2>Top Products</h2>
                            <Chart
                                options={topProducts.options}
                                series={topProducts.series}
                                type="bar"
                                height={220}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default StoreOwnerDashboard;
