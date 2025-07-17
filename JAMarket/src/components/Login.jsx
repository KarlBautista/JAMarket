import React from 'react'
import "../css/Login.css"
import { useState } from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const navigate = useNavigate();
  const { signIn, session } = useAuthContext();
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

      alert(response.message)
      navigate("/profiles")
    } catch(err) {
      console.error(err);
    }
  }

  console.log(session)




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
                <label for="email"> Email</label>
                  <input type="email"
                          name='email'
                          value={user.email}
                            placeholder='type your email here...'
                            onChange={handleInputChange}
                              />
            </div>

            <div className="form-group"> 
            <label for="password"> Password </label>
             <input type="password"
                      name='password'
                      value={user.password}
                      onChange={handleInputChange}
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
