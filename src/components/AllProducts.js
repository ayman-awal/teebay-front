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

  const handleCardClick = (product) => {
    console.log('Clickedd');
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const { data } = useQuery(GET_ALL_PRODUCTS);

  useEffect(() => {
    if(data && data.products){
      setProducts(data.products);
    }
  }, [data]);

  useEffect(() => {
    const user = localStorage.getItem('userId');
    if (!user) {
        navigate('/signin');
    }
  }, [navigate]);

  return (
    <div>
        <div className='flex gap-20 justify-end m-20'>
          <Button variant="outlined" onClick={handleMyActivityLog}>My Activity Log</Button>
          <Button variant="contained" disableElevation onClick={handleMyProductsClick}>My Products</Button>
        </div>
        <div className='container center'>
          <div>
              <h3 style={{textAlign: 'center', margin: '30px 0', fontSize: '30px'}}>ALL PRODUCTS</h3>

              {products && products.length > 0 ? 
                products.map((product) => (
                <ProductCard
                    key = {product.id}
                    id={product.id}
                    title = {product.title}
                    categories = {product.categories}
                    purchasePrice = {product.purchasePrice}
                    rentPrice = {product.rentPrice}
                    description = {product.description}
                    datePosted = {product.datePosted}
                    isAvailable = {product.isAvailable}
                    onClick={() => handleCardClick(product)} 
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