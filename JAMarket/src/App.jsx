// App.jsx
import './App.css'
import NavBar from './components/customer/NavBar'
import Footer from './components/customer/Footer'
import { Outlet } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import { ShopProvider } from './contexts/ShopContext'
import Home from './pages/Home'
import { ProductProvider } from './contexts/ProductContext'

function App() {

  return (
   <ShopProvider>
    <ProductProvider>
    <AuthProvider>
      <CartProvider>
      <NavBar />
      <main>
        <Outlet /> {
         
        }
      </main>
      <Footer />
      </CartProvider>
    </AuthProvider>
    </ProductProvider>
    </ShopProvider>
  
  )
}

export default App
