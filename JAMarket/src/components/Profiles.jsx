import React from 'react'
import "../css/Profiles.css"
import { useAuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profiles = () => {

    const { session, signOut } = useAuthContext(); 
    const navigate = useNavigate();
    
    const signOutUser = async () => {
      try {
        const response = await signOut();
        if(response.error){
          console.log(response.error)
        }
        alert("signed out");
        navigate("/login")
      } catch(err){
        console.error(err)
      }
    }

  return (
    <div className='profiles'>
        <p>Hello, welcome to jamarket {session?.user?.email}</p>
        <button onClick={() => signOutUser()}>Sign out</button>
    </div>
  )
}

export default Profiles
