// App.jsx
import './App.css'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import Home from './pages/Home'
import { QueryClient, QueryClientProvider }  from "@tanstack/react-query";
function App() {

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  )
}

export default App
