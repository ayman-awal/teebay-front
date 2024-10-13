import React, { useState } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// const GET_PRODUCT_BY_ID = gql`
//     query productById($id: ID!) {
//         productById(id: $id) {
//             id
//             title
//             categories
//             purchasePrice
//             rentPrice
//             description
//             datePosted
//         }
//     }
// `;


const CREATE_TRANSACTION_MUTATION = gql`
    mutation editProduct($input: createTransactionInput!) {
        createTransaction(input: $input) {
            id
            title
            description
        }
    }
    `;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    minheight: 200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function ProductDetails() {
    const { id } = useParams();

    const loggedInUser = localStorage.getItem('userId');
    const navigate = useNavigate();
    // const [queriedProduct, setQueriedProduct] = useState([]);
    const [createTransaction, { data }] = useMutation(CREATE_TRANSACTION_MUTATION);
    
    const today = dayjs();
    const nextDay = today.add(1, 'day');
    const nextWeek = today.add(7, 'day'); 

    const [fromValue, setFromValue] = useState(dayjs(nextDay));
    const [toValue, setToValue] = useState(dayjs(nextWeek));
    const [primaryUserId, setPrimaryUserId] = useState();
    const [secondaryUserId, setSecondaryUserId] = useState();
    const [transactionType, setTransactionType] = useState('');
    const [openRentModal, setOpenRentModal] = useState(false);
    const [openBuyModal, setOpenBuyModal] = useState(false);
    const location = useLocation();
    const { product } = location.state;
   
    const rentModal = () => setOpenRentModal(true);
    const closeRentModal = () => {console.log("Closed"); setOpenRentModal(false)};

    const buyModal = () => setOpenBuyModal(true);
    const closeBuyModal = () => {console.log("Closed"); setOpenBuyModal(false)};

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

    const handleRent = async () => {
        console.log("RENTT");
        console.log(fromValue);
        console.log(toValue);
        console.log("primaryUser: " + userId);
        console.log("secondaryUser: " + localStorage.getItem('userId'));
        console.log("productId: " + id);

        try {
            const { data } = await createTransaction({
                variables: {
                    input: {
                        transactionType: 'RENT',
                        productId: parseInt(id, 10), 
                        primaryUserId: parseInt(userId, 10), 
                        secondaryUserId: parseInt(localStorage.getItem('userId'), 10),
                        rentFrom: fromValue,
                        rentTo: toValue
                    }
                }
            });
            console.log("Rented");
            // navigate('/activity')
        } catch (error) {
            console.error(error);
        }

        closeRentModal();
    }

    const navigateProduct = () => {
        // navigate('/', { replace: true });
        navigate('/my-products');
    }


console.log(product)

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
                        ) :
                            (
                                userId !== loggedInUser ? (
                                    <div className='flex gap-20 justify-end'>
                                        <ThemeProvider theme={theme}>
                                            <Button variant="contained" disableElevation onClick={rentModal}>Rent</Button>
                                            <Button variant="contained" disableElevation>Buy</Button>
                                        </ThemeProvider>
                                    </div>
                                ) : 
                                (
                                    <div className='flex justify-end'>
                                        <Button variant="outlined" onClick={navigateProduct}>My Products</Button>
                                    </div>
                                )
                            )
                    }
                    {/* <div className='flex gap-20 justify-end'>
                        <ThemeProvider theme={theme}>
                            <Button variant="contained" disableElevation onClick={rentModal}>Rent</Button>
                        </ThemeProvider>
                        <ThemeProvider theme={theme}>
                            <Button variant="contained" disableElevation>Buy</Button>
                        </ThemeProvider>
                    </div> */}
                </div>
                <div>
                    <Modal
                        open={openRentModal}
                        onClose={closeRentModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Rental period
                            </Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker', 'DatePicker']} sx={{ mb: 6, mt: 6 }}>
                                        <DatePicker
                                            label="From"
                                            value={fromValue}
                                            disablePast
                                            onChange={(newValue) => {console.log("New From date:", newValue.format()); setFromValue((newValue))}}
                                        />

                                        <DatePicker
                                            label="To"
                                            value={toValue}
                                            disablePast
                                            onChange={(newValue) => {console.log("New To date:", newValue.format()); setToValue(newValue)}}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                                {
                                    isAvailable === false ? (
                                        <p>This product is not available</p>
                                    ) : (
                                        <ThemeProvider theme={theme}>
                                        <Box className='flex gap-20 justify-end'>
                                            <Button variant="contained" disableElevation onClick={closeRentModal} color="secondary">Go Back</Button>
                                            <Button variant="contained" disableElevation onClick={handleRent}>Confirm Rent</Button>
                                        </Box>
                                        </ThemeProvider>
                                    )
                                }
                            
                        </Box>
                    </Modal>
                </div>
                
            </div>
        </div>
    );
}


export default ProductDetails;