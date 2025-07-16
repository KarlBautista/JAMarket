import React, { useState } from 'react';
import "../css/Register.css";

const Register = () => {

    const [registerData, setRegisterData] = useState({
        fullname: "",
        email: "",
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
        if(!registerData.fullname || !registerData.email || !registerData.password){
            alert("Please fill in all fields!");
            return;
        }

        try{
           const response = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...registerData, user_type: "CUSTOMER"})
           });

           const data = await response.json();

           if(!response.ok) {
            // Show the specific error message from the server
            alert(data.message || "Error registering user");
            return;
           }
        
           console.log("Registration successful:", data);
           alert("Account created successfully!");
           
           // Clear form after successful registration
           setRegisterData({
               fullname: "",
               email: "",
               password: "",
           });
           setConfirmPassword("");

        } catch (err) {
            console.error("Registration error:", err);
            alert("Network error. Please try again.");
        }
    }


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
            <label htmlFor="fullName">Full Name</label>
            <input 
              name='fullname'
              type="text"
              id="fullName"
              value={registerData.fullname}
              onChange={handleInputChange}
              placeholder='Enter your full name...'
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
