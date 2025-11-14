import React from 'react'
import { Outlet } from 'react-router-dom'
import { AuthProvider } from '../../contexts/AuthContext'
import { OrderProvider } from '../../contexts/OrdersContext'
import { CartProvider } from '../../contexts/CartContext'
import { ProductProvider } from '../../contexts/ProductContext'
import { ShopProvider } from '../../contexts/ShopContext'
const StoreOwnerLayout = () => {
  return (
    <ShopProvider>
      <ProductProvider>
        <AuthProvider>
          <CartProvider>
            <OrderProvider>
              <main>
                <Outlet />
              </main>
            </OrderProvider>
          </CartProvider>
        </AuthProvider>
      </ProductProvider>
    </ShopProvider>
  )
}

export default StoreOwnerLayout
