// App.jsx
import './App.css'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Home from './pages/Home'

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <main>
        <Outlet /> {
         
        }
      </main>
      <Footer />
    </AuthProvider>
  )
}

export default App
