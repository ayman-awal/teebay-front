import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useQuery, gql } from '@apollo/client';
import ProductCard from './ProductCard'
import Button from '@mui/material/Button';

const GET_ALL_PRODUCTS = gql`
    query {
      products{
            id
            title
            categories
            purchasePrice
            rentPrice
            description
            datePosted
            perDay
        }
    }
`;


const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleMyProductsClick = () => {
    navigate('/my-products');
  }

  const handleMyActivityLog = () => {
    navigate('/activity-log');
  }

  const { data } = useQuery(GET_ALL_PRODUCTS);

  // console.log(data);

  useEffect(() => {
    if(data && data.products){
      setProducts(data.products);
    }
    // console.log(products);
  }, [data])

  return (
    <div>
        <div className='flex gap-20 flex-end m-20'>
          <Button variant="outlined" onClick={handleMyActivityLog}>My Activity Log</Button>
          <Button variant="contained" disableElevation onClick={handleMyProductsClick}>My Products</Button>
        </div>
        <div className='container center'>
          <div>
              <h3 style={{textAlign: 'center', margin: '30px 0', fontSize: '30px'}}>ALL PRODUCTS</h3>

              {products && products.length > 0 ? 
                products.map((product) => (
                <ProductCard
                    key = {product.title}
                    title = {product.title}
                    categories = {product.categories}
                    purchasePrice = {product.purchasePrice}
                    rentPrice = {product.rentPrice}
                    description = {product.description}
                    datePosted = {product.datePosted}
                    perDay = {product.perDay}
                />
              )) : (
                    <p>No products available.</p>
                )}

          </div>
        </div>
        
    </div>
  )
}

export default AllProducts