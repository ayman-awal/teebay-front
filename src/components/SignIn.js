import React, { useState, useEffect } from 'react'
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

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

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { loading, error, data }] = useMutation(LOGIN_MUTATION);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('userId');
        if (user) {
            navigate('/');
        }
      }, [navigate]);

    const handleLogin = async () => {
        if (!email || !password) {
            setMessage('Please enter both email and password.');
            setOpen(true);
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
                console.error('Login failed:', error.message);
            }
        }
        
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };

  return (
    <div className='flex justify-center align-center' style={{margin: "auto", textAlign: "center", height: "100vh"}}>
        <div>
            <h3>SIGN IN</h3>
            <div className='box-border pd-40' style={{width: "300px"}}>
                <div>
                    <div className='flex flex-col gap-20'>
                        <TextField 
                            id="outlined-basic" 
                            label="Email" 
                            variant="outlined"
                            value={ email }
                            required
                            onChange={(e) => setEmail(e.target.value)}

                        />

                        <TextField 
                            id="outlined-basic" 
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
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    </div>
  )
}

export default SignIn