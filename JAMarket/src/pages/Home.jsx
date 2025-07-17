import React from 'react'
import Banner from '../components/Banner'
import FeaturedProducts from '../components/FeaturedProducts'
import { useAuthContext } from '../contexts/AuthContext'
const Home = () => {
  const {session} = useAuthContext();
  return (
    
    <div>
        <p>{session?.user?.email}</p>
        <Banner />
        <FeaturedProducts />
      
    </div>
  )
}

export default Home
