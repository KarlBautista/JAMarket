import React, { useEffect, useState } from 'react'
import { useProductContext } from '../contexts/ProductContext'
import ProductCard from '../components/products/ProductCard'
import "../css/Guitars.css"

const Microphones = () => {
  const [mics, setMics] = useState([])
  const { getProductByCategory } = useProductContext()

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getProductByCategory('Microphone')
        if (!response?.data) {
          console.error('Error getting microphones')
          return
        }
        setMics(response.data)
      } catch (err) {
        console.error('Error getting microphones:', err?.message || err)
      }
    }
    load()
  }, [])

  return (
    <div className="guitars-container">
      <div className="guitar-header">
        <h1>Microphones</h1>
      </div>
      <div className="guitar-grid">
        {mics?.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  )
}

export default Microphones
