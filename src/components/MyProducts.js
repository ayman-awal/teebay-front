import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useQuery, gql } from '@apollo/client';
import ProductCard from './ProductCard'
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import NoProductsAvailable from './NoProductsAvailable';
import { colorPalette } from '../utils/misc';


const GET_PRODUCT_BY_USER_ID = gql`
    query productByUserId($id: ID!){
        productByUserId(id: $id) {
            id
            title
            categories
            purchasePrice
            rentPrice
            description
            datePosted
            rentFrequency
            isAvailable
            userId
        }
    }
`;

function MyProducts() {
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if(!userId){
            navigate('/signin');
        } 
    }, [navigate, userId]);

    const theme = createTheme(colorPalette);

    const { data, loading } = useQuery(GET_PRODUCT_BY_USER_ID, {
        variables: { id: userId }, 
        fetchPolicy: "cache-and-network"
    });

    useEffect(() => {
        if (data && data.productByUserId) {
            setProducts(data.productByUserId);
        }
    }, [data]);
    
    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('email');
        localStorage.removeItem('phoneNumber');
        navigate('/signin');
    }

    const handleFeed = () => {
        navigate('/');
    }

    const handleAddProduct = () => {
        navigate('/add-product');
    }

    const handleCardClick = (product) => {
        navigate(`/product/${product.id}`, { state: { product } });
    };

  return (
    <div>
        <div className='flex gap-20 justify-end m-20'>
            <ThemeProvider theme={theme}>
                <Button variant="contained" onClick={handleFeed} color='secondary' disableElevation>Feed</Button>
                <Button variant="contained" onClick={handleLogout} style={{marginRight: '20px'}} disableElevation>Logout</Button>
            </ThemeProvider>
        </div>
        <div className='container center'>
          <div>
              <h3 style={{textAlign: 'center', margin: '30px 0', fontSize: '30px'}}>MY PRODUCTS</h3>
                {
                    loading ? (
                        <div className='flex align-center justify-center'>
                            <CircularProgress />
                        </div>
                    ) : (
                        products && products.length > 0 ? 
                            products.map((product) => (
                            <ProductCard
                                key = {product.id}
                                id={product.id}
                                title = {product.title}
                                categories = {product.categories}
                                purchasePrice = {product.purchasePrice}
                                rentPrice = {product.rentPrice}
                                rentFrequency = {product.rentFrequency}
                                description = {product.description}
                                datePosted = {product.datePosted}
                                isAvailable = {product.isAvailable}
                                onClick={() => handleCardClick(product)} 
                            />
                        )) : (
                            <NoProductsAvailable height={'25vh'} />
                        ))
                }

            </div>
            <div className='center' style={{textAlign: 'center', margin: '30px 0'}}>
                <ThemeProvider theme={theme}>
                    <Button variant="contained" disableElevation onClick={handleAddProduct}>Add Product</Button>
                </ThemeProvider>
            </div>
        </div>
        
    </div>
  )
}

export default MyProducts;
export { GET_PRODUCT_BY_USER_ID };