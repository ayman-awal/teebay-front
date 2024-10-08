import React from 'react'
import ProductCard from './ProductCard'

const AllProducts = () => {
  return (
    <div className='container center'>
        <div>
            <h3 style={{textAlign: 'center', margin: '30px 0', fontSize: '30px'}}>ALL PRODUCTS</h3>

            <ProductCard />
            <ProductCard />
            <ProductCard />

        </div>
    </div>
  )
}

export default AllProducts