import React, { useEffect, useState } from 'react'
import { useProductContext } from '../contexts/ProductContext'
import ProductCard from '../components/products/ProductCard'
import "../css/Guitars.css"

const Accessories = () => {
  const [accessories, setAccessories] = useState([])
  const { getProductByCategory } = useProductContext()

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getProductByCategory('Accessories')
        if (!response?.data) {
          console.error('Error getting accessories')
          return
        }
        setAccessories(response.data)
      } catch (err) {
        console.error('Error getting accessories:', err?.message || err)
      }
    }
    load()
  }, [])

  return (
    <div className="guitars-container">
      <div className="guitar-header">
        <h1>Accessories</h1>
      </div>
      <div className="guitar-grid">
        {accessories?.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  )
}

export default Accessories
