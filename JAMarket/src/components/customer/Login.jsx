import React from 'react'
import "../../css/Login.css"
import { useState } from 'react'
import { useAuthContext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const navigate = useNavigate();
  const { signIn, session, partnerData, customerData, signInWithGoogle } = useAuthContext();
  const [user, setUser] = useState({  
    email: "",
    password: ""
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(u => ({...u, [name]: value}));
  }

  const signInUser = async (e) => {
    e.preventDefault();
    try{
      const response = await signIn(user);
      if(response.error){
        alert("Error occured while singing in", response.error);
        return;
      }

      alert(response.message);
      
      // Navigate based on the response message instead of state
      if(response.message === "successfully partner signin"){
        navigate("/store-owner/dashboard");
      } 
      else if (response.message === "successfully customer signin"){
        navigate("/");
      }
    } catch(err) {
      console.error(err);
    }
  }

  console.log(session)

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error(`Someting went wrong signing in with google: ${err.message}`);
    }
  }




  return (
    <div className='login'>
        <div className="login-title">
            <h2>JAMarket</h2>
            <p>Your one-stop shop for quality music gear</p>
        </div>
        <div className="login-form">
            <h3 className="login-form-title">
                Log In to JAMarket
            </h3>

        <form className="login-form-data" onSubmit={signInUser}>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                  <input type="email"
                          id="email"
                          name='email'
                          value={user.email}
                            placeholder='type your email here...'
                            onChange={handleInputChange}
                              />
            </div>

            <div className="form-group"> 
            <label htmlFor="password">Password</label>
             <input type="password"
                      id="password"
                      name='password'
                      value={user.password}
                      onChange={handleInputChange}
                        placeholder='type your password here...'
                         />
            </div>

            <button>Log In</button>
            <p>Don't have an account? <a href="/register">Register</a></p>
    
            <div className="google-signin" style={{marginTop: '12px'}}>
              <button
                type="button"
                onClick={handleSignInWithGoogle}
                className="google-btn"
                aria-label="Continue with Google"
                style={{display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '8px 12px', borderRadius: 6, border: '1px solid #ddd', background: '#fff', cursor: 'pointer'}}
              >
                {/* Google G icon */}
                <svg className="google-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20" height="20" aria-hidden="true">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.27 1.53 8.17 2.8l6.03-6.03C34.9 3.03 29.85 1 24 1 14.91 1 7.36 5.9 3.7 13.26l7.57 5.88C12.99 14 18.02 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.5 24c0-1.54-.14-2.7-.43-3.88H24v7.35h12.73c-.55 3-2.74 6.27-6.06 8.2l6.07 4.73C43.72 36.63 46.5 30.9 46.5 24z"/>
                  <path fill="#FBBC05" d="M11.27 29.14A14.92 14.92 0 0 1 10 24c0-1.32.22-2.58.62-3.77L3.05 14.34A23.99 23.99 0 0 0 0 24c0 3.86.92 7.51 2.56 10.78l8.71-5.64z"/>
                  <path fill="#34A853" d="M24 46.5c6.45 0 11.84-2.13 15.79-5.77l-7.55-5.88C29.98 35.86 27.16 36.8 24 36.8c-5.91 0-10.93-4.12-12.72-9.6L3.7 33.5C7.36 40.9 14.91 46.5 24 46.5z"/>
                </svg>
                <span style={{fontSize: '0.95rem', color: '#202124'}}>Continue with Google</span>
              </button>
            </div>
           </form>

        </div>
      
            

     
     
    </div>
  )
}

export default Login
