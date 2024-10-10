import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
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
//             perDay
//         }
//     }
// `;

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
    // const [queriedProduct, setQueriedProduct] = useState([]);
    const today = dayjs();
    const nextDay = today.add(1, 'day');
    const nextWeek = today.add(7, 'day'); 

    const [fromValue, setFromValue] = useState(dayjs(nextDay));
    const [toValue, setToValue] = useState(dayjs(nextWeek));
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {console.log("Closed"); setOpen(false)};
    const location = useLocation();
    const { product } = location.state;

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
        console.log(id);

        handleClose();
    }
//     console.log(id); 
//     console.log(!product.id); 
//   if (!id) {
//     return <p>Invalid product Id</p>;
//   }
//   else{
//     if(id !== product.id){
//        console.log(id); 
//        console.log(product.id); 
    // }
    // else{
    //     const { data } = useQuery(GET_PRODUCT_BY_ID);
        
    // }
//   }

const { title, categories, purchasePrice, description, datePosted } = product;

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
                        <div className='flex gap-20 justify-end'>
                            <ThemeProvider theme={theme}>
                                <Button variant="contained" disableElevation onClick={handleOpen}>Rent</Button>
                            </ThemeProvider>
                            <ThemeProvider theme={theme}>
                                <Button variant="contained" disableElevation>Buy</Button>
                            </ThemeProvider>
                        </div>
                    </div>
                    <div>
                        <Modal
                            open={open}
                            onClose={handleClose}
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
                                                onChange={(newValue) => {console.log("New From date:", newValue.format()); setFromValue(newValue)}}
                                            />

                                            <DatePicker
                                                label="To"
                                                value={toValue}
                                                onChange={(newValue) => {console.log("New To date:", newValue.format()); setToValue(newValue)}}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                <Box className='flex gap-20 justify-end'>
                                    <ThemeProvider theme={theme}>
                                        <Button variant="contained" disableElevation onClick={handleClose} color="secondary">Go Back</Button>
                                    </ThemeProvider>
                                    <ThemeProvider theme={theme}>
                                        <Button variant="contained" disableElevation onClick={() => handleRent()}>Confirm Rent</Button>
                                    </ThemeProvider>
                                </Box>
                            </Box>
                        </Modal>
                    </div>
                    
                </div>
            </div>
    );
}


export default ProductDetails;