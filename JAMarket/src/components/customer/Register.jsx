import React, { useState } from 'react';
import "../../css/Register.css";
import  { useAuthContext } from "../../contexts/AuthContext"
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const { session, signUp } = useAuthContext();  
    const navigate = useNavigate();
    const [registerData, setRegisterData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
    });

    const [confirmPassword, setConfirmPassword] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRegisterData(r => ({...r, [name]:value}));
    }

    const registerUser = async (e) => {
        e.preventDefault();
        
    
        if(registerData.password !== confirmPassword){
            alert("Passwords do not match!");
            return;
        }
        if(!registerData.firstName || !registerData.lastName || !registerData.email || !registerData.password){
            alert("Please fill in all fields!");
            return;
        }

        try{
           const response = await signUp({
               ...registerData, 
               user_type:"CUSTOMER"
           });
           if(response.error){
            alert(response.error);
            return;
           }
           alert(response.message || "Registration successful!");


           setRegisterData({
               firstName: "",
               lastName: "",
               email: "",
               phoneNumber: "",
               password: "",
           });
           setConfirmPassword("");
           navigate("/");

        } catch (err) {
            console.error("Registration error:", err);
            alert("Network error. Please try again.");
        }
    }

      console.log(session)



  return (
    <div className='register'>
      <div className="register-title">
        <h2>JAMarket</h2>
        <p>Your one-stop shop for quality music gear</p>
      </div>
      
      <div className="register-form">
        <h3 className="register-form-title">
          Create Your JAMarket Account
        </h3>

        <form onSubmit={registerUser} className="register-form-data">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input 
              name='firstName'
              type="text"
              id="firstName"
              value={registerData.firstName}
              onChange={handleInputChange}
              placeholder='Enter your first name...'
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input 
              name='lastName'
              type="text"
              id="lastName"
              value={registerData.lastName}
              onChange={handleInputChange}
              placeholder='Enter your last name...'
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              name='email'
              type="email"
              id="email"
              value={registerData.email}
              onChange={handleInputChange}
              placeholder='Enter your email address...'
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input 
              name='phoneNumber'
              type="tel"
              id="phoneNumber"
              value={registerData.phoneNumber}
              onChange={handleInputChange}
              placeholder='Enter your phone number...'
            />
          </div>

          <div className="form-group"> 
            <label htmlFor="password">Password</label>
            <input 
              name='password'
              type="password"
              id="password"
              value={registerData.password}
              onChange={handleInputChange}
              placeholder='Create a strong password...'
            />
          </div>

          <div className="form-group"> 
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input 
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='Confirm your password...'
            />
          </div>

          <button type="submit">Create Account</button>
          <p>Already have an account? <a href="/login">Log In</a></p>
        </form>
      </div>
    </div>
  );
};

export default Register;
