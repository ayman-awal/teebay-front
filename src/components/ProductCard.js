import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { gql, useMutation } from '@apollo/client';

const DELETE_PRODUCT_MUTATION = gql`
    mutation deleteProduct($input: deleteProductInput!) {
        deleteProduct(input: $input)
    }
`;


const ProductCard = ({id, title, categories, purchasePrice, rentPrice, description, datePosted, isAvailable, onClick}) => {
  const location = useLocation();
  const [showDelete, setShowDelete] = useState(false);

  const [deleteProduct] = useMutation(DELETE_PRODUCT_MUTATION);
    //, {
    // update(cache, { data }) {
    //     if (data.deleteProduct) {
    //         cache.modify({
    //             fields: {
    //                 products(existingProducts = [], { readField }) {
    //                     return existingProducts.filter(
    //                         productRef => id !== readField('id', productRef)
    //                     );
    //                 }
    //             }
    //         });
    //     }
    // }}
  //);

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    function getOrdinalSuffix(num) {
        const suffixes = ["th", "st", "nd", "rd"];
        const value = num % 100;
        return suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0];
    }

    const formattedDate = `${day}${getOrdinalSuffix(day)} ${monthNames[monthIndex]} ${year}`;
    return formattedDate;
  }

  const formattedDatePosted = formatTimestamp(parseInt(datePosted, 10));

  const handleDelete = async () => {
    try {
        await deleteProduct({ variables: { input: { userId: parseInt(localStorage.getItem('userId'), 10), productId: parseInt(id, 10) } } });
    } catch (err) {
        console.error("Error during deletion:", err);
    }
  };

  useEffect(() => {
    if(location.pathname === '/my-products'){
      setShowDelete(true);
    } else{
      setShowDelete(false);
    }
  }, [location.pathname])
  
  return (
    <div className='center box-border pointer' onClick={onClick} style={{minHeight: '150px', width: '60%', marginTop: '30px'}}>
        <div className='product-card-container flex flex-col gap-20' style={{padding: '30px'}}>
          <div>
              <div className='flex justify-between'>
                <p className='product-title'>{title}</p>
                {
                  showDelete ? <IconButton aria-label="delete" size="large" onClick={handleDelete} > <DeleteIcon/> </IconButton> : null
                }
              </div>
              <p className='product-detail-text'>Categories: {categories}</p>
              <p className='product-detail-text'>Price: ${purchasePrice}</p>

              <p className='product-description'>{description}</p>

          </div>
          <div>
            <p className='product-detail-text'>Date posted: {formattedDatePosted}</p>
          </div>
        </div>
        
    </div>
  )
}

export default ProductCard