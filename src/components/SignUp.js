import React, { useState, useEffect } from 'react'
import CustomAlert from './CustomAlert';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const REGISTER_MUTATION = gql`
    mutation Register($input: RegisterInput!) {
        register(input: $input) {
            id
            email
            phoneNumber
        }
    }
`;

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [register, { loading, error, data }] = useMutation(REGISTER_MUTATION);
    const navigate = useNavigate();

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('warning');

    useEffect(() => {
        const user = localStorage.getItem('userId');
        if (user) {
            navigate('/');
        }
      }, [navigate]);
      
    const handleRegister = async () => {
        if (!firstName || !lastName || !email || !password || !confirmPassword || !address || !phoneNumber)  {
            setAlertMessage('Please fill in all fields.');
            setAlertSeverity('warning');
            setAlertOpen(true);
            return;
        }
        else if (password !== confirmPassword) {
            setAlertMessage('Passwords do not match.');
            setAlertSeverity('warning');
            setAlertOpen(true);
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
                setAlertMessage(error.message);
                setAlertSeverity('warning');
                setAlertOpen(true);
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
                        // flex flex-row justify-center align-center gap-20
                    >
                        <TextField 
                            label="First Name"
                            variant="outlined"
                            value={ firstName }
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                        <TextField 
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
                        // flex flex-row justify-center align-center gap-20
                    >
                        <TextField 
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
                        // flex flex-row justify-center align-center gap-20
                    >
                        <TextField 
                            label="Email" 
                            variant="outlined" 
                            value={ email }
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <TextField 
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
                        // flex flex-row justify-center align-center gap-20
                    >
                        <TextField 
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
                        // flex flex-row justify-center align-center gap-20
                    >
                        <TextField 
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
            <CustomAlert 
                message={alertMessage} 
                open={alertOpen} 
                severity={alertSeverity} 
                onClose={() => setAlertOpen(false)}
            />
        </div>
        
    </div>
  )
}

export default SignUp