import React from 'react'
import "../../css/Profiles.css"
import { useAuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import defaultImg from "../../assets/default_image_customer.png"
const Profiles = () => {

    const { session, signOut, customerData } = useAuthContext(); 
    const navigate = useNavigate();
    
    console.log(customerData)
   

  return (
    <div className='profiles'>
      <div className="profile-form">
        <h2>My Profile</h2>
        <div className="profile-form-img-container">
          <img src={customerData?.profile_image || defaultImg} alt="Profile" />
        </div>
        <div className="profile-form-information-form">
          <div className="information-group">
            <p>Name:</p>
            <p>{customerData?.first_name} {customerData?.last_name}</p>
          </div>
          <div className="information-group">
            <p>Email:</p>
            <p>{customerData?.email}</p>
          </div>
          <div className="information-group">
            <p>Phone:</p>
            <p>{customerData?.phone || "Not provided"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profiles
