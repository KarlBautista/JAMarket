import React, { useEffect, useState } from 'react';
import "../../css/StoreOwnerDashboard.css"
import { useAuthContext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import dollarSymbol from "../../assets/dollar-symbol.png"
import StoreOwnerNavigation from './StoreOwnerNavigation'
import Chart from "react-apexcharts";
import { useProductContext } from '../../contexts/ProductContext';
import Swal from 'sweetalert2'

const StoreOwnerDashboard = () => {
    const navigate = useNavigate();
    const { session, partnerData, signOut } = useAuthContext();
    const { getProduct } = useProductContext();
    const [ products, setProducts ] = useState([]);

    useEffect(() => {
        const getAllProduct = async () => {
            const response = await fetch(`https://jamarket.onrender.com/api/all-products?userId=${partnerData.id}`, {
                    method: "GET"
                });
            if(!response.ok){
                console.error(`Something went wrong getting the data ${response.statusText}}`);
                return;
            }
            const data = await response.json();

            if(data.data) {
                setProducts(data.data);
               
            }
        }
        getAllProduct();
    }, [partnerData]);
     console.log("ito na yung mga data", products)

 

    const handleSignOut = async () => {
        try{
            const response = await signOut();
            if(response.error){
                await Swal.fire({ title: 'Error', text: response.error, icon: 'error' });
                return;
            }
            await Swal.fire({ title: 'Signed-out', icon: 'success', text: response.message });
            navigate("/login");
        } catch (err){
            console.error(err);
            await Swal.fire({ title: 'Error', text: 'Something went wrong during sign out.', icon: 'error' });
        }
    }





  

    const totalRevenue = products.reduce((sum, p) => {
        const price = Number(p.price) || 0;
        const sold = Number(p.sold) || 0;
        return sum + price * sold;
    }, 0);

    const totalUnitsSold = products.reduce((sum, p) => sum + (Number(p.sold) || 0), 0);
    const monthlyTotalSales = Math.round(totalRevenue / 12);


    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
    const monthlyValue = Math.round(totalRevenue / (months.length || 1));
    const monthlySales = {
        series: [ { name: "Sales", data: months.map(() => monthlyValue) } ],
        options: {
            chart: { id: "monthly-sales" },
            xaxis: { categories: months },
            stroke: { curve: "smooth" },
            colors: ["#5A67D8"]
        }
    }

 

    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const perDay = Math.max(0, Math.round(totalUnitsSold / (weekDays.length || 1)));
    const dailyOrders = {
        series: [ { name: "Orders", data: weekDays.map(() => perDay) } ],
        options: {
            chart: { id: "daily-orders" },
            xaxis: { categories: weekDays },
            colors: ["#38A169"]
        }
    }

 
  
    const categoryMap = products.reduce((acc, p) => {
        const cat = p.category || 'Uncategorized';
        const sold = Number(p.sold) || 0;
        acc[cat] = (acc[cat] || 0) + sold;
        return acc;
    }, {});
    const categoryLabels = Object.keys(categoryMap);
    const categorySeries = categoryLabels.map(l => categoryMap[l]);
    const categoryDistribution = {
        series: categorySeries.length ? categorySeries : [1],
        options: {
            labels: categoryLabels.length ? categoryLabels : ["No Data"],
            colors: ["#667EEA", "#48BB78", "#ED8936", "#E53E3E", "#3182CE"],
            legend: { position: "bottom" }
        }
    }


    const sortedBySold = [...products].sort((a,b) => (Number(b.sold)||0) - (Number(a.sold)||0));
    const top = sortedBySold.slice(0,5);
    const topCategories = top.map(p => p.product_name || p.productName || 'Unknown');
    const topSeries = top.map(p => Number(p.sold) || 0);
    const topProducts = {
        series: [{ name: 'Units Sold', data: topSeries.length ? topSeries : [0] }],
        options: {
            chart: { id: "top-products" },
            xaxis: { categories: topCategories.length ? topCategories : ["No Data"] },
            colors: ["#ED64A6"],
            plotOptions: { bar: { horizontal: true } }
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
                            <h2>₱{monthlyTotalSales}</h2>
                        </div>
                    </div>

                    <div className="orders-dashboard">
                        <div className="orders-icon">
                            <img src={dollarSymbol} alt="" />
                        </div>
                        <div className="orders-title">
                            <p>Total Orders</p>
                            <h2>{totalUnitsSold}</h2>
                        </div>
                    </div>

                    <div className="conversion-rate-dashboard">
                        <div className="conversion-rate-icon">
                            <img src={dollarSymbol} alt="" />
                        </div>
                        <div className="conversion-rate-title">
                            <p>Total Revenue</p>
                            <h2>₱{totalRevenue}</h2>
                        </div>
                    </div>

                    <div className="new-customer-dashboard">
                        <div className="new-customer-icon">
                            <img src={dollarSymbol} alt="" />
                        </div>
                        <div className="new-customer-title">
                            <p>Customers</p>
                            <h2>{totalUnitsSold}</h2>
                        </div>
                    </div>
                </div>

             

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
