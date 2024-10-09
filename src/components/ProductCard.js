import React from 'react'



const ProductCard = () => {
  return (
    <div className='center box-border pointer' style={{height: '300px', width: '60%', marginTop: '30px'}}>
        <div className='product-card-container' style={{padding: '30px'}}>
            <p className='product-title'>iPhone 13 Pro Max</p>
            <p className='product-detail-text'>Categories: Electronics</p>
            <p className='product-detail-text'>Price: $1500</p>

            <p className='product-description'>It is a long established fact that a reader will be distracted by the readable content of a 
            page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal 
            distribution of letters, as opposed to...</p>

            <p className='product-detail-text'>Date posted: 7th October 2024</p>

        </div>

    </div>
  )
}

export default ProductCard