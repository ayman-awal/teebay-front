
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import dayjs from 'dayjs';
import RentModal from '../components/modals/RentModal';
import BuyModal from '../components/modals/BuyModal';
import CustomAlert from './CustomAlert';

const CREATE_TRANSACTION_MUTATION = gql`
    mutation createTransaction($input: createTransactionInput!) {
        createTransaction(input: $input){
            id
        }
    }
`;

function ProductDetails() {
    const { id } = useParams();
    const loggedInUser = localStorage.getItem('userId');
    const navigate = useNavigate();
    const [createTransaction] = useMutation(CREATE_TRANSACTION_MUTATION);
    
    const today = dayjs();
    const nextDay = today.add(1, 'day');
    const nextWeek = today.add(7, 'day'); 

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('warning');

    const [fromValue, setFromValue] = useState(dayjs(nextDay));
    const [toValue, setToValue] = useState(dayjs(nextWeek));
    const [openRentModal, setOpenRentModal] = useState(false);
    const [openBuyModal, setOpenBuyModal] = useState(false);

    const rentModal = () => setOpenRentModal(true);
    const closeRentModal = () => setOpenRentModal(false);

    const buyModal = () => setOpenBuyModal(true);
    const closeBuyModal = () => setOpenBuyModal(false);

    const location = useLocation();
    const { product } = location.state;
    const { title, userId, categories, purchasePrice, description, datePosted, isAvailable } = product;

    const theme = createTheme({
        palette: {
            primary: {
                main: '#ae34eb',
            },
            secondary: {
                main: '#FF5733'
            }
        },
    });

    const navigateProduct = () => {
        navigate('/my-products');
    }

    const handleTransaction = async (transactionType) => {
        try {
            
            const { data, error } = await createTransaction({
                variables: {
                    input: {
                        transactionType: transactionType,
                        productId: parseInt(id, 10),
                        primaryUserId: parseInt(userId, 10),
                        secondaryUserId: parseInt(localStorage.getItem('userId'), 10),
                        rentFrom: transactionType !== 'RENTAL' ? null : fromValue,
                        rentTo: transactionType !== 'RENTAL' ? null : toValue
                    }
                }

            });

            const message = transactionType === 'RENTAL' ? 'Product successfully rented' : 'Product successfully bought';
            setAlertMessage(message)
            setAlertSeverity('warning');
            setAlertOpen(true);
            
            setTimeout(() => {
                navigate('/');
            }, 1500);
        } catch (error) {
            setAlertMessage(error.message);
            setAlertSeverity('warning');
            setAlertOpen(true);
        }
        closeRentModal();
    };

    return (
        <div className='flex justify-center align-center' style={{height: '100vh'}}>
            <div className='center' style={{minHeight: '400px', width: '40%', marginTop: '30px'}}>
                <div className='product-card-container flex flex-col gap-45' style={{padding: '30px'}}>
                    <div>
                        <div className='flex justify-between'>
                            <p className='product-title'>{title}</p>
                        </div>
                        <p className='product-detail-text'>Categories: {categories}</p>
                        <p className='product-detail-text'>Price: ${purchasePrice}</p>
                        <p className='product-description'>{description}</p>
                    </div>
                    {
                        !isAvailable ? (
                            <div className='flex gap-20 justify-end'>
                                <p className='product-detail-text'>Product currently unavailable</p>
                            </div>
                        ) : (
                            userId !== loggedInUser ? (
                                <div className='flex gap-20 justify-end'>
                                    <ThemeProvider theme={theme}>
                                        <Button variant="contained" disableElevation onClick={rentModal}>Rent</Button>
                                        <Button variant="contained" disableElevation onClick={buyModal}>Buy</Button>
                                    </ThemeProvider>
                                </div>
                            ) : (
                                <div className='flex justify-end'>
                                    <Button variant="outlined" onClick={navigateProduct}>My Products</Button>
                                </div>
                            )
                        )
                    }
                </div>
                
                <RentModal 
                    open={openRentModal}
                    onClose={closeRentModal}
                    fromValue={fromValue}
                    toValue={toValue}
                    setFromValue={setFromValue}
                    setToValue={setToValue}
                    onConfirm={() => handleTransaction('RENTAL')}
                />
                <BuyModal 
                    open={openBuyModal}
                    onClose={closeBuyModal}
                    onConfirm={() => handleTransaction('SALE')}
                />
            </div>
            <CustomAlert 
                message={alertMessage} 
                open={alertOpen} 
                severity={alertSeverity} 
                onClose={() => setAlertOpen(false)}
            />
        </div>
    );
}

export default ProductDetails;
