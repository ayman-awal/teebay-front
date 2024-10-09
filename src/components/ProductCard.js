import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductCard = ({title, categories, purchasePrice, rentPrice, description, datePosted, perDay}) => {
  const location = useLocation();
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    if(location.pathname === '/my-products'){
      setShowDelete(true);
    } else{
      setShowDelete(false);
    }
  }, [location.pathname])
  
  return (
    <div className='center box-border pointer' style={{minHeight: '300px', width: '60%', marginTop: '30px'}}>
        <div className='product-card-container' style={{padding: '30px'}}>
            <div className='flex justify-between'>
              <p className='product-title'>{title}</p>
              {
                showDelete ? <IconButton aria-label="delete" size="large"> <DeleteIcon /> </IconButton> : null
              }
            </div>
            <p className='product-detail-text'>Categories: {categories}</p>
            <p className='product-detail-text'>Price: ${purchasePrice}</p>

            <p className='product-description'>{description}</p>

            <p className='product-detail-text'>Date posted: {datePosted}</p>
        </div>
    </div>
  )
}

export default ProductCard