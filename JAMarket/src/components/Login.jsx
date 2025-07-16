import React from 'react'
import "../css/Login.css"
const Login = () => {
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

        <form className="login-form-data">
            <div className="form-group">
                <label for="email"> Email</label>
                  <input type="email"
                            placeholder='type your email here...'
                              />
            </div>

            <div className="form-group"> 
            <label for="password"> Password </label>
             <input type="password"
                        placeholder='type your password here...'
                         />
            </div>

            <button>Log In</button>
            <p>Don't have an account? <a href="/register">Register</a></p>
           </form>

        </div>
      
            

     
     
    </div>
  )
}

export default Login
