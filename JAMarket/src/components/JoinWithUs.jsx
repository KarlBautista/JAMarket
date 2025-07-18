import React from 'react'
import "../css/JoinWithUs.css"
import { useState } from 'react'
import { useAuthContext } from '../contexts/AuthContext'
const JoinWithUs = () => {
    const { handeJoinWithUs } = useAuthContext();
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        storeName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        aboutProductsServices: '',
        logo: null,
        termsConditions: false
    })

    const handleInputChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        
        if (type === 'checkbox') {
            setUserData(u => ({...u, [name]: checked}));
        } else if (type === 'file') {
            setUserData(u => ({...u, [name]: files[0]}));
        } else {
            setUserData(u => ({...u, [name]: value}));
        }
    }

    const joinWithUsBtn = async (e) => {
        e.preventDefault();
        try{
            const response = await handeJoinWithUs({...userData, user_type: "STORE OWNER"});
            if(!response.success){
                alert(response.error)
                return;
            }

            if(response.success){
                alert(response.message)
            }

            
        } catch(err){
            console.error(err)
        }
    }





  return (
    <div className='join-with-us'>  
     <div className="join-with-us-banner">
        <h2>Join With Us</h2>
        <div className="join-with-us-text">
             <p>Partner with JAMarket to reach music enthusiasts and professionals. Whether you're</p>
        <p>a gear manufacturer, musician, or content creator, we'd love to collaborate with you.</p>
        </div>
     </div>

     <div className="join-with-us-forms">
        <div className="why-partner-with-us">
            <h3 className="why-partner-with-us-title">
               Why Partner With Us?
            </h3>
            <div className="why-partner-with-us-text-container">
               <div className="why-partner-with-us-text">
                <h4>Reach Our Community</h4>
                <p>Connect with thousands of musicians and audio</p>
                <p>professionals who visit our platform daily.</p>

            </div>

            <div className="why-partner-with-us-text">
                <h4>Seamless Integration</h4>
                <p>Our platform makes it easy to showcase and sell your</p>
                <p>products to a targeted audience.</p>

            </div>

            <div className="why-partner-with-us-text">
                <h4>Marketing Support</h4>
                <p>Benefit from our marketing expertise and promotional</p>
                <p>opportunities to boost your visibility.</p>

            </div>

            <div className="why-partner-with-us-text">
                <h4>Community Events</h4>
                <p>Participate in our workshops, webinars, and live events to</p>
                <p>showcase your expertise.</p>

            </div>
            </div>

            <div className="why-partner-with-us-img">
                <img src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="" />
            </div>
         
        </div>
        <div className="apply-with-us">
            <h3 className='apply-with-us-title'>Apply to Partner With Us</h3>
            <form onSubmit={joinWithUsBtn} className="apply-with-us-form">
                <div className="input-row">
                    <div className="input-group">
                    <label htmlFor="first-name">First Name*</label>
                    <input 
                        type="text" 
                        id="first-name"
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleInputChange}
                        className='first-name-input' 
                    />
               </div>
                    <div className="input-group">
                    <label htmlFor="last-name">Last Name*</label>
                    <input 
                        type="text" 
                        id="last-name"
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleInputChange}
                        className='last-name-input' 
                    />
                </div>
                </div>
                
                <div className="input-row">
                    <div className="input-group">
                     <label htmlFor="store-name">Store name</label>
                    <input 
                        type="text" 
                        id="store-name"
                        name="storeName"
                        value={userData.storeName}
                        onChange={handleInputChange}
                    />
                </div>
                </div>

                <div className="input-row">
                    <div className="input-group">
                        <label htmlFor="email">Email address</label>
                        <input 
                            type="email" 
                            id="email"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="phone-number">Phone Number</label>
                        <input 
                            type="tel" 
                            id="phone-number"
                            name="phoneNumber"
                            value={userData.phoneNumber}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="input-row">
                    <div className="input-group">
                        <label htmlFor="password">Password*</label>
                        <input 
                            type="password" 
                            id="password"
                            name="password"
                            value={userData.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirm-password">Confirm Password*</label>
                        <input 
                            type="password" 
                            id="confirm-password"
                            name="confirmPassword"
                            value={userData.confirmPassword}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="input-row">
                    <div className="input-group">
                    <label htmlFor="about-products-services">Tell us about your products/services</label>
                    <textarea 
                        name="aboutProductsServices" 
                        id="about-products-services" 
                        cols={1} 
                        rows={10}
                        value={userData.aboutProductsServices}
                        onChange={handleInputChange}
                    >
                    </textarea>
                    </div>
              
                </div>

                <div className="input-row">
                    <div className="input-group">
                        <label htmlFor="logo">Upload Store Logo</label>
                        <div className="file-upload-container">
                            <div className="file-upload-area">
                                <div className="upload-icon">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <polyline points="14,2 14,8 20,8" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <line x1="16" y1="13" x2="8" y2="13" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <line x1="16" y1="17" x2="8" y2="17" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <polyline points="10,9 9,9 8,9" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <div className="upload-text">
                                    <p className="upload-main-text">Upload a file or drag and drop</p>
                                    <p className="upload-sub-text">PDF, PNG, JPG up to 10MB</p>
                                </div>
                                <input 
                                    type="file" 
                                    id="logo" 
                                    name="logo"
                                    accept=".pdf,.png,.jpg,.jpeg" 
                                    onChange={handleInputChange}
                                    className="file-input-hidden" 
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="input-row">
                    <div className="checkbox-group">
                        <input 
                            type="checkbox" 
                            id="terms-conditions"
                            name="termsConditions"
                            checked={userData.termsConditions}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="terms-conditions">
                            I agree to the <a href="">Terms and Conditions</a> and <a href="">Privacy Policy*</a>
                        </label>
                    </div>
                </div>
                <div className="input-row">
                    <button type='submit'>Submit Application</button>
                </div>

                <div className="input-row">
                  <p id='required'>Fields marked with * are required</p>
          
                </div>

                
            </form>

          


        </div>
     </div>
      
    </div>
  )
}

export default JoinWithUs
