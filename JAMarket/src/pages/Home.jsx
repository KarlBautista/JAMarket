import React from 'react'
import Banner from '../components/customer/Banner'
import FeaturedProducts from '../components/customer/FeaturedProducts'
import { useAuthContext } from '../contexts/AuthContext'
const Home = () => {
  const {session} = useAuthContext();
  return (
    
    <div>
      
        <Banner />
        <FeaturedProducts />
      
    </div>
  )
}

export default Home
