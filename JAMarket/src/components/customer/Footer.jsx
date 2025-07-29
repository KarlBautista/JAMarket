import React from 'react'
import "../../css/Footer.css"
const Footer = () => {
  return (
    <footer class="footer-container">
     <div className="footer">
      
   
  <div class="footer-section">
    <h3>JAMarket</h3>
    <p>Your one-stop shop for quality music <br />gear and accessories.</p>
  </div>  

  <div class="footer-section">
    <h3>Shop</h3>
    <ul>
      <li>Guitars</li>
      <li>Drums</li>
      <li>Keyboards</li>
      <li>Microphones</li>
      <li>Accessories</li>
    </ul>
  </div>

  <div class="footer-section">
    <h3>Support</h3>
    <ul>
      <li>Contact Us</li>
      <li>FAQ</li>
      <li>Shipping Info</li>
      <li>Returns & Exchanges</li>
    </ul>
  </div>

  <div class="footer-section">
    <h3>Connect</h3>
    <ul>
      <li>Facebook</li>
      <li>Instagram</li>
      <li>Twitter</li>
    </ul>
  </div>
    </div>
      <div className="all-rights-reserved">
    <p>© 2025 JAMarket. All rights reserved.</p>
  </div>
</footer>
  )
}

export default Footer
