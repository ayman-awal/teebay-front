import React, { useState, useEffect } from 'react'
import CustomAlert from './CustomAlert';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      id
      email
      firstName
      lastName
    }
  }
`;

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { loading, error, data }] = useMutation(LOGIN_MUTATION);
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

    const handleLogin = async () => {
        if (!email || !password) {
            setAlertMessage('Please fill in all fields.');
            setAlertSeverity('warning');
            setAlertOpen(true);
            return;
        }
        else{
            try {
                const { data } = await login({ variables: { input: { email, password } } });
                console.log('Login successful:', data);
                localStorage.setItem('userId', data.login.id);
                localStorage.setItem('email', data.login.email);
                localStorage.setItem('phoneNumber', data.login.phoneNumber);
                navigate('/', { state: { data } });
            } catch (error) {
                setAlertMessage(error.message);
                setAlertSeverity('error');
                setAlertOpen(true);
            }
        }
        
    }

  return (
    <div className='flex justify-center align-center' style={{margin: "auto", textAlign: "center", height: "100vh"}}>
        <div>
            <h3>SIGN IN</h3>
            <div className='box-border pd-40' style={{width: "300px"}}>
                <div>
                    <div className='flex flex-col gap-20'>
                        <TextField 
                            label="Email" 
                            variant="outlined"
                            value={ email }
                            required
                            onChange={(e) => setEmail(e.target.value)}

                        />

                        <TextField 
                            label="Password" 
                            variant="outlined" 
                            value={ password }
                            type='password'
                            required
                            onChange={(e) => setPassword(e.target.value)}     
                        />
                    </div>
                    <Box sx={{ '& button': { m: 1 } }} className='m-20'>
                        <Button variant="contained" size="medium" onClick={handleLogin}>
                            LOGIN
                        </Button>
                    </Box>
                    <p>Don't have an account? <a href="/signup" className='remove-underline'>Signup</a></p>
                </div>
            </div>
        </div>
        <CustomAlert 
            message={alertMessage} 
            open={alertOpen} 
            severity={alertSeverity} 
            onClose={() => setAlertOpen(false)}
        />
        
    </div>
  )
}

export default SignIn