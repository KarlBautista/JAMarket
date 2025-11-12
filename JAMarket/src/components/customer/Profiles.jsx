import React from 'react'
import "../../css/Profiles.css"
import { useAuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import defaultImg from "../../assets/default_image_customer.png"
const Profiles = () => {

    const { session, signOut, customerData } = useAuthContext(); 
    const navigate = useNavigate();

    const userInformation = session?.user?.user_metadata;
    console.log("ito userInformation", userInformation);
    console.log("ito naman sa customer data", customerData);

  return (
    <div className='profiles'>
      <div className="profile-form">
        <h2>My Profile</h2>
        <div className="profile-form-img-container">
          <img src={userInformation?.avatar_url || defaultImg} alt="Profile" />
        </div>
        <div className="profile-form-information-form">
          <div className="information-group">
            <p>Name:</p>
            <p>{userInformation?.full_name || customerData?.first_name + " " + customerData.last_name}</p>
          </div>
          <div className="information-group">
            <p>Email:</p>
            <p>{userInformation?.email}</p>
          </div>
          <div className="information-group">
            <p>Phone:</p>
            <p>{userInformation?.phone || customerData?.phone || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profiles
