import React, { use, useEffect, useState } from 'react'
import { useProductContext } from '../contexts/ProductContext'
import ProductCard from '../components/products/ProductCard';
import "../css/Guitars.css"
const Guitars = () => {
  const [ guitars, setGuitars ] = useState([]);
  const { getProductByCategory } = useProductContext();
  console.log(guitars);
  useEffect(() => {
    const getGuitars = async () => {
        try {
            const response = await getProductByCategory("Guitar");
            if(!response.data){
                console.error(`Error getting guitars`);
                return;
            }
            setGuitars(response.data);
        } catch (err) {
            console.error(`Error getting guitars: ${err.message}`);
        }
    }
    getGuitars();
    
  }, [])
  return (
    <div className='guitars-container'>
        <div className='guitar-header'>
            <h1>Guitars</h1>
        </div>
      <div className='guitar-grid'>
        { guitars?.map((guitar) => {
            return <ProductCard key={guitar.id} product={guitar}/>
        })}
      </div>
    </div>
  )
}

export default Guitars
