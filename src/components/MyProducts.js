import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useQuery, gql } from '@apollo/client';
import ProductCard from './ProductCard'
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const GET_PRODUCT_BY_USER_ID = gql`
    query productByUserId($id: ID!) {
        productByUserId(id: $id) {
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

function MyProducts() {
    const [products, setProducts] = useState([]);
    const theme = createTheme({
        palette: {
          primary: {
            main: '#FF5733',
            },
        },
    });

    const { data } = useQuery(GET_PRODUCT_BY_USER_ID);

    useEffect(() => {
        if (data && data.productByUserId) {
            setProducts(data.productByUserId);
        }
    }, [data]);

  return (
    <div>
        <div className='flex gap-20 justify-end m-20'>
            <ThemeProvider theme={theme}>
                <Button variant="contained" disableElevation>Logout</Button>
            </ThemeProvider>
        </div>
        <div className='container center'>
          <div>
              <h3 style={{textAlign: 'center', margin: '30px 0', fontSize: '30px'}}>MY PRODUCTS</h3>
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
                    perDay = {product.perDay}
                />
              )) : (
                    <p>No products available.</p>
                )}

            </div>
            <div className='center' style={{textAlign: 'center', margin: '30px 0'}}>
                <ThemeProvider theme={theme}>
                    <Button variant="contained" disableElevation>Add Product</Button>
                </ThemeProvider>
            </div>
        </div>
        
    </div>
  )
}

export default MyProducts