import React, { useState, useEffect } from 'react'
import { gql, useQuery} from '@apollo/client';
import { useNavigate } from "react-router-dom";
import ProductCard from './ProductCard';

const GET_PRODUCTS_BY_TRANSACTION = gql`
  query GetProductsByTransaction($id: ID!, $type: String!, $action: String!){
    productsByTransaction(id: $id, type: $type, action: $action) {
      id
      """transactionType
      product {
        id
        title
        categories
        purchasePrice
        rentPrice
        description
        datePosted
      }}"""
    }
  }
`;

function ActivityLog() {
    const [selectedOption, setSelectedOption] = useState('Bought');
    const [products, setProducts] = useState([]);
    const [loadingAuth, setLoadingAuth] = useState(true);
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    const type = selectedOption === 'Sold' || selectedOption === 'Bought' ? 'SALE' : 'RENTAL';

    const { loading, error, data } = useQuery(GET_PRODUCTS_BY_TRANSACTION, {
      variables: { id: userId, type, action: selectedOption },
      fetchPolicy: 'cache-and-network',
    });

    useEffect(() => {
      const user = localStorage.getItem('userId');
      if (!user) {
          navigate('/signin');
      } else {
        setLoadingAuth(false); 
      }
    }, [navigate]);

    useEffect(() => {
      if (data && data.productsByTransaction) {
        setProducts(data.productsByTransaction);
      } else {
        setProducts([]);
      }
    }, [data]);

    const handleOption = (title) => {
        setSelectedOption(title);
    }
    const options = [{ title: 'Bought' }, { title: 'Sold' }, { title: 'Borrowed' }, { title: 'Lent' }];

    if (loadingAuth) {
      return <p>Loading...</p>;
    }
  return (
    <div className='container center' style={{minHeight: '300px', width: '60%'}}>
        <div className='flex justify-space-around'>
            {
              (
                options.map((option, index) => (
                  <div key={index} onClick={() => handleOption(option.title)} className='pointer pd-20' style={{flex: 1, textAlign: 'center', fontSize: '18px', borderBottom: selectedOption === option.title ? '2px solid blue' : 'none'}}>
                    <p>{option.title}</p>
                  </div>
                ))
              )
            }
        </div>

        <div>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {products.length > 0 ? ( // Check if products array has items
          products.map(product => (
            <ProductCard 
              key={product.id}
              id={product.id}
              title={product.product.title}
              categories={product.product.categories}
              purchasePrice={product.product.purchasePrice}
              rentPrice={product.product.rentPrice}
              description={product.product.description}
              datePosted={product.product.datePosted}
            />
          ))
        ) : (
          !loading && <p>No products available</p>
        )}
        </div>

    </div>
  )
}

export default ActivityLog