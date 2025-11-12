import React, { useEffect, useState } from 'react'
import { useProductContext } from '../contexts/ProductContext'
import ProductCard from '../components/products/ProductCard'
import "../css/Guitars.css"

const Drums = () => {
  const [drums, setDrums] = useState([])
  const { getProductByCategory } = useProductContext()

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getProductByCategory('Drum')
        if (!response?.data) {
          console.error('Error getting drums')
          return
        }
        setDrums(response.data)
      } catch (err) {
        console.error('Error getting drums:', err?.message || err)
      }
    }
    load()
  }, [])

  return (
    <div className="guitars-container">
      <div className="guitar-header">
        <h1>Drums</h1>
      </div>
      <div className="guitar-grid">
        {drums?.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  )
}

export default Drums
