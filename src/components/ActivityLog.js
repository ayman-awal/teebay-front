import React, { useState, useEffect } from 'react'
import { gql, useQuery} from '@apollo/client';
import { useNavigate } from "react-router-dom";
import ProductCard from './ProductCard';
import NoProductsAvailable from './NoProductsAvailable';
import CircularProgress from '@mui/material/CircularProgress';

const GET_PRODUCTS_BY_TRANSACTION = gql`
  query GetProductsByTransaction($id: ID!, $type: String!, $action: String!){
    productsByTransaction(id: $id, type: $type, action: $action) {
      id
      title
      isAvailable
      categories
      description
      purchasePrice
      rentPrice
      datePosted
      rentFrequency
      userId
    }
  }
`;

function ActivityLog() {
    const [selectedOption, setSelectedOption] = useState('Bought');
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    const type = selectedOption === 'Sold' || selectedOption === 'Bought' ? 'SALE' : 'RENTAL';
    
    const options = [{ option: 'Bought' }, { option: 'Sold' }, { option: 'Borrowed' }, { option: 'Lent' }];

    const { loading, error, data } = useQuery(GET_PRODUCTS_BY_TRANSACTION, {
      variables: { id: parseInt(userId, 10), type, action: selectedOption },
      fetchPolicy: 'cache-and-network',
    });

    useEffect(() => {
      const user = localStorage.getItem('userId');
      if (!user) {
          navigate('/signin');
      }
    }, [navigate]);

    useEffect(() => {
      if (data && data.productsByTransaction) {
        setProducts(data.productsByTransaction);
      } else {
        setProducts([]);
      }
    }, [data]);

    const handleOption = (option) => {
        setSelectedOption(option);
    }

    const handleCardClick = (product) => {
      console.log('Clickedd');
      navigate(`/product/${product.id}`, { state: { product } });
    };
    

  return (
    <div className='container center' style={{minHeight: '300px', width: '60%'}}>
        <div className='flex justify-space-around'>
            {
              (
                options.map((op, index) => (
                  <div key={index} onClick={() => handleOption(op.option)} className='pointer pd-20' style={{flex: 1, textAlign: 'center', fontSize: '18px', borderBottom: selectedOption === op.option ? '2px solid blue' : 'none'}}>
                    <p>{op.option}</p>
                  </div>
                ))
              )
            }
        </div>

        <div>
          {loading ? 
            (
              <div className='flex align-center justify-center' style={{maxHeight: '100vh'}}>
                <CircularProgress />
              </div>
            ) : (
              products.length > 0 ? (
                products.map(product => (
                  <ProductCard 
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    categories={product.categories}
                    purchasePrice={product.purchasePrice}
                    rentPrice={product.rentPrice}
                    rentFrequency={product.rentFrequency}
                    description={product.description}
                    datePosted={product.datePosted}
                    onClick={() => handleCardClick(product)}
                  />
                ))
              ) : (
                <NoProductsAvailable />
              )
          )
        }
        </div>

    </div>
  )
}

export default ActivityLog