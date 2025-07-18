import React from 'react'
import { Outlet } from 'react-router-dom'
import { AuthProvider } from '../contexts/AuthContext'

const StoreOwnerLayout = () => {
  return (
    <AuthProvider>
      <main>    
        <Outlet />
      </main>
    </AuthProvider>
  )
}

export default StoreOwnerLayout
