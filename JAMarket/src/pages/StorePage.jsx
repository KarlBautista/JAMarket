import React from 'react'
import "../css/StorePage.css"
import { useSearchParams } from 'react-router-dom'
const StorePage = () => {
  const [searchParams] = useSearchParams();
  const storeId = searchParams.get("id");
  alert(storeId);
  return (
    <div>
     
    </div>
  )
}

export default StorePage
