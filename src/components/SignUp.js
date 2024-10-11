import React, { useState, useEffect } from 'react'
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const REGISTER_MUTATION = gql`
    mutation Register($input: RegisterInput!) {
        register(input: $input) {
            id
            email
            phoneNumber
        }
    }
`;

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [register, { loading, error, data }] = useMutation(REGISTER_MUTATION);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('userId');
        if (user) {
            navigate('/');
        }
      }, [navigate]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };
      
    const handleRegister = async () => {
        if (!firstName || !lastName || !email || !password || !confirmPassword || !address || !phoneNumber)  {
            setMessage('Please fill in all fields.');
            setOpen(true);
            return;
        }
        else if (password !== confirmPassword) {
            setOpen(true);
            setMessage('Passwords do not match.');
            return;
        }
        else{
            try {
                const { data } = await register({ variables: { input: { firstName, lastName, email, password, confirmPassword, address, phoneNumber } } });
                console.log('Login successful:', data);
                localStorage.setItem('userId', data.register.id);
                localStorage.setItem('email', data.register.email);
                localStorage.setItem('phoneNumber', data.register.phoneNumber);
                navigate('/');
            } catch (error) {
                console.error('Login failed:', error.message);
            }
        }
    }

  return (
    <div className='flex justify-center align-center' style={{margin: "auto", textAlign: "center", height: "100vh"}}>
        <div>
            <h3>SIGN UP</h3>
            <div className='box-border pd-40' style={{width: "600px"}}>
                <div>
                    <Box
                        component="form"
                        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                        noValidate
                        autoComplete="off"
                        flex flex-row justify-center align-center gap-20
                    >
                        <TextField 
                            id="outlined-basic" 
                            label="First Name"
                            variant="outlined"
                            value={ firstName }
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                        <TextField 
                            id="outlined-basic" 
                            label="Last Name" 
                            variant="outlined" 
                            value={ lastName }
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </Box>
                    
                    <Box
                        component="form"
                        sx={{ '& > :not(style)': { m: 1, width: '51ch' } }}
                        noValidate
                        autoComplete="off"
                        flex flex-row justify-center align-center gap-20
                    >
                        <TextField 
                            id="outlined-basic" 
                            label="Address" 
                            variant="outlined" 
                            value={ address } 
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </Box>
                        
                    <Box
                        component="form"
                        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                        noValidate
                        autoComplete="off"
                        flex flex-row justify-center align-center gap-20
                    >
                        <TextField 
                            id="outlined-basic" 
                            label="Email" 
                            variant="outlined" 
                            value={ email }
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <TextField 
                            id="outlined-basic" 
                            label="Phone Number" 
                            variant="outlined" 
                            value={ phoneNumber }
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </Box>
                    
                    <Box
                        component="form"
                        sx={{ '& > :not(style)': { m: 1, width: '51ch' } }}
                        noValidate
                        autoComplete="off"
                        flex flex-row justify-center align-center gap-20
                    >
                        <TextField 
                            id="outlined-basic" 
                            label="Password" 
                            variant="outlined" 
                            type='password' 
                            value={ password }
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Box>

                    <Box
                        component="form"
                        sx={{ '& > :not(style)': { m: 1, width: '51ch' } }}
                        noValidate
                        autoComplete="off"
                        flex flex-row justify-center align-center gap-20
                    >
                        <TextField 
                            id="outlined-basic" 
                            label="Confirm Password" 
                            variant="outlined" 
                            type='password' 
                            value={ confirmPassword }
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </Box>

                    <Box sx={{ '& button': { m: 1 } }} className='m-20'>
                        <Button variant="contained" size="medium" onClick={handleRegister}>
                            Register
                        </Button>
                    </Box>
                    
                    <p>Already have an account? <a href="/signin" className='remove-underline'>Sign in</a></p>
                </div>
            </div>
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    </div>
  )
}

export default SignUp