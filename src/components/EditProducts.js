import React, { useState } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import { gql, useMutation } from '@apollo/client';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
    };

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };


  const EDIT_PRODUCT_MUTATION = gql`
    mutation editProduct($input: editProductInput!) {
            editProduct(input: $input) {
            id
            title
            description
        }
    }
    `;

const EditProducts = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [rentRate, setRentRate] = useState([]);
    const [category, setCategory] = useState([]);
    const theme = useTheme();
    const { title, rentPrice, purchasePrice, description, rentFrequency, categories } = location.state.product;
    const [editProduct, { data }] = useMutation(EDIT_PRODUCT_MUTATION);

    const [editTitle, setEditTitle] = useState(title);
    const [editRentPrice, setEditRentPrice] = useState(rentPrice);
    const [editPurchasePrice, setEditPurchasePrice] = useState(purchasePrice);
    const [editDescription, setDescription] = useState(description);
    const [editRentFrequency, setEditRentFrequency] = useState(rentFrequency.toLowerCase().replace(/_/g, ' '));

    const initialCategories = categories ? categories.split(',').map(cat => capitalizeFirstLetter(cat.trim())) : [];
    const [editCategories, setEditCategories] = useState(initialCategories);

    console.log(initialCategories);
    console.log(editCategories);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };

    const rentFrequencyArray = [
        'per hour',
        'per day'
      ]
    
    const categoriesArray = [
        'Electronics',
        'Furniture',
        'Home Appliances',
        'Sporting Goods',
        'Outdoor'
    ];

    function getStyles(name, rentRate, theme) {
        return {
            fontWeight: rentRate.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
        };
    }

    const handleCategoryChange = (event) => {
        const {
          target: { value },
        } = event;
    
        const newValues = typeof value === 'string' ? value.split(',') : value;
        setEditCategories(newValues);
        console.log('New values selected:', newValues);
      };

      const handleEdit = async () => {
        
        if (!editTitle || !editRentPrice || !editPurchasePrice || !editDescription || !editRentFrequency || !editCategories)  {
            setMessage('Please fill in all fields.');
            setOpen(true);
            return;
        }
        try {
            const editCategoriesString = editCategories.join(',');
            const productId = parseInt(id, 10);
            const { data } = await editProduct({ variables: { 
                input: { 
                    productId: productId, 
                    title: editTitle, 
                    rentPrice: editRentPrice, 
                    purchasePrice: editPurchasePrice, 
                    description: editDescription, 
                    rentFrequency: editRentFrequency, 
                    categories: editCategoriesString } 
                } });
            setMessage('Product successfully updated');
            setOpen(true);
            navigate('/my-products');
        } catch (error) {
            console.error(error);
        }
      }

    return (
        <div className='flex justify-center align-center' style={{height: '100vh'}}>
            <div className='center' style={{minHeight: '600px', width: '30%'}}>
            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '100%' }, display: 'flex', flexDirection: 'column',  }}
                noValidate
                autoComplete="off"
                // flex flex-row justify-center align-center gap-20
            >
                <TextField 
                    id="outlined-basic" 
                    label="Title"
                    variant="outlined"
                    value={ editTitle }
                    onChange={(e) => setEditTitle(e.target.value)}
                    fullWidth
                    required
                />

                <Select
                    labelId="demo-multiple-name-label"
                    label="Categories"
                    id="demo-multiple-name"
                    multiple
                    value={editCategories}
                    onChange={handleCategoryChange}
                    input={<OutlinedInput label="Categories" />}
                    renderValue={(selected) => selected.join(', ')}
                    required
                    style = {{width: '50%'}}
                    MenuProps={MenuProps}
                >
                    {categoriesArray.map((name) => (
                    <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, category, theme)}
                    >
                        {name}
                    </MenuItem>
                    ))}
                </Select>

                <TextField 
                    id="outlined-basic" 
                    label="Description"
                    variant="outlined"
                    value={ editDescription }
                    rows={4}
                    multiline
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <Box className='flex flex-row justify-between'>
                    <TextField 
                        id="outlined-basic" 
                        label="Price"
                        placeholder='$'
                        variant="outlined"
                        value={ editPurchasePrice }
                        onChange={(e) => setEditPurchasePrice(e.target.value)}
                        required
                    />
                    <Box>

                        <TextField 
                            id="outlined-basic" 
                            label="Rent"
                            placeholder='$'
                            variant="outlined"
                            value={ editRentPrice }
                            style = {{width: 70}}
                            onChange={(e) => setEditRentPrice(e.target.value)}
                            required
                        />

                            <Select
                                labelId="rent-frequency-label"
                                id="rent-frequency"
                                value={editRentFrequency}
                                onChange={(e) => setEditRentFrequency(e.target.value)}
                                // onChange={('rentFrequency')}
                                input={<OutlinedInput label="Rent Frequency" />}
                                style={{marginLeft: '20px'}}
                                MenuProps={MenuProps}
                            >
                                {rentFrequencyArray.map((frequency) => (
                                <MenuItem key={frequency} value={frequency} style={getStyles(frequency, rentRate, theme)}>
                                    {frequency}
                                </MenuItem>
                                ))}
                            </Select>
                    </Box>
                    
                </Box>
                <Box className="flex justify-end">
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleEdit}
                    >
                        Edit Product
                    </Button>
                </Box>
            </Box>

                
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default EditProducts