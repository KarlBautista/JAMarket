import React from 'react'
import "../../css/Banner.css"
const Banner = () => {
  return (
    <div className='banner-container'>
        <div className="banner-left">
            <div className="banner-title">
                <h1>Find Your Perfect Sound at JAMarket</h1>
                  <p>Premium music gear for professionals and enthusiast. From guitars to microphones
                    , we've got everything you need.
                  </p>
                <button>Shop Now</button>
            </div>

            
        </div>
        <div className="banner-right">
            <div className="banner-right-img-container">
                <img src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                 alt="" />
            </div>
        </div>
    </div>
  )
}

export default Banner
