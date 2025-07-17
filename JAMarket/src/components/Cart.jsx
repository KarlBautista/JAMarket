import React from 'react'
import "../css/Cart.css"
import { useAuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
const Cart = () => {
    const navigate = useNavigate();
    const { session } = useAuthContext(); 
    useEffect(() => {
        if(session === undefined){
            alert("You need to login first");
            navigate("/login");
        }
    }, []);
  return (
    <div className='cart'>
      <div>This is your cart {session?.user?.email}</div>
    </div>
  )
}

export default Cart
