import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const CREATE_PRODUCT = gql`
  mutation createProduct($input: createProductInput!) {
    createProduct(input: $input) {
      id
      title
      categories
      description
      purchasePrice
      rentPrice
      rentFrequency
    }
  }
`;

const ProductSummary = ({ prevStep, values }) => {
  const navigate = useNavigate();
  const [createProduct] = useMutation(CREATE_PRODUCT);
  const {
    title: [title],
    categories,
    description,
    purchasePrice: [purchasePrice],
    rentPrice: [rentPrice],
    rentFrequency: [rentFrequency]
} = values;

  const handleSubmit = async () => {
    console.log(values);
    const input = {
      title, 
      isAvailable: true,
      categories: categories.join(', ').toUpperCase(),
      description: description.join(' '), 
      purchasePrice,
      rentPrice,
      rentFrequency: rentFrequency.toUpperCase().replace(/ /g, '_'),
      datePosted: new Date(),
      userId: Number(localStorage.getItem('userId'))
    };

    try {
      await createProduct({ variables: { input } });
      navigate('/my-products');
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };
  return (
    <div className='container flex justify-center align-center center' style={{ minHeight: '100vh', width: '60%' }}>
      <div style={{ width: '65%' }}>
        <h1>Summary</h1>
        <div>
          <div className='flex justify-between'>
            <p className='product-detail-text'>Title: {title}</p>
          </div>
          <p className='product-detail-text'>Categories: {categories.join(', ')}</p>
          <p className='product-detail-text'>Price: ${purchasePrice}</p>
          <p className='product-detail-text'>To rent: ${rentPrice} {rentFrequency}</p>
          <p className='product-detail-text'>Description: {description}</p>
        </div>
        <Box mt={3} textAlign="center" className='flex justify-between'>
          <Button
            color="primary"
            variant="contained"
            onClick={prevStep}
          >
            Back
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit} 
          >
            Submit
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default ProductSummary;
