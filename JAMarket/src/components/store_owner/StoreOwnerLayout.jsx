import React from 'react'
import { Outlet } from 'react-router-dom'
import { AuthProvider } from '../../contexts/AuthContext'
import { OrderProvider } from '../../contexts/OrdersContext'
import { CartProvider } from '../../contexts/CartContext'
const StoreOwnerLayout = () => {
  return (
    <AuthProvider>
      <CartProvider>
      <OrderProvider>
      <main>    
        <Outlet />
      </main>
      </OrderProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export default StoreOwnerLayout
