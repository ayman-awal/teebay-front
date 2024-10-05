import React from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const SignIn = () => {
  return (
    <div className='flex justify-center align-center' style={{margin: "auto", textAlign: "center", height: "100vh"}}>
        <div>
            <h3>SIGN IN</h3>
            <div className='box-border pd-40' style={{width: "300px"}}>
                <div>
                    <div className='flex flex-col gap-20'>
                        <TextField id="outlined-basic" label="Email" variant="outlined" />
                        <TextField id="outlined-basic" label="Password" variant="outlined" />
                    </div>
                    <Box sx={{ '& button': { m: 1 } }} className='m-20'>
                        <Button variant="contained" size="medium">
                            LOGIN
                        </Button>
                    </Box>
                    <p>Don't have an account? <a href="" className='remove-underline'>Signup</a></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SignIn