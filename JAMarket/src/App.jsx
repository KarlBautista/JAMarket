
import './App.css'
import NavBar from './components/NavBar'
import { Route, Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import Login from './components/Login'
import Register from './components/Register'
import Profiles from './components/Profiles'

function App() {


  return (
    <div>
      <NavBar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/profiles' element={<Profiles />}></Route>
        </Routes>
        <Footer />
    

    </div>
  )
}

export default App
