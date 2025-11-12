import React, { useEffect, useState } from 'react'
import { useProductContext } from '../contexts/ProductContext'
import ProductCard from '../components/products/ProductCard'
import "../css/Guitars.css"

const Keyboards = () => {
  const [keyboards, setKeyboards] = useState([])
  const { getProductByCategory } = useProductContext()

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getProductByCategory('Keyboard')
        if (!response?.data) {
          console.error('Error getting keyboards')
          return
        }
        setKeyboards(response.data)
      } catch (err) {
        console.error('Error getting keyboards:', err?.message || err)
      }
    }
    load()
  }, [])

  return (
    <div className="guitars-container">
      <div className="guitar-header">
        <h1>Keyboards</h1>
      </div>
      <div className="guitar-grid">
        {keyboards?.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  )
}

export default Keyboards
