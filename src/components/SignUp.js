import React from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const SignUp = () => {
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
                    <TextField id="outlined-basic" label="First Name" variant="outlined" />
                    <TextField id="outlined-basic" label="Last Name" variant="outlined" />
                </Box>
                    {/* <div className='flex flex-row justify-center align-center gap-20'>
                        <TextField id="outlined-basic" label="First Name" variant="outlined" />
                        <TextField id="outlined-basic" label="Last Name" variant="outlined" />
                    </div> */}
                <Box
                    component="form"
                    sx={{ '& > :not(style)': { m: 1, width: '51ch' } }}
                    noValidate
                    autoComplete="off"
                    flex flex-row justify-center align-center gap-20
                    >
                    <TextField id="outlined-basic" label="Address" variant="outlined" />
                </Box>
                    {/* <div className='flex flex-row justify-center align-center gap-20'>
                        <TextField id="outlined-basic" label="Address" variant="outlined" />
                    </div> */}
                <Box
                    component="form"
                    sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                    noValidate
                    autoComplete="off"
                    flex flex-row justify-center align-center gap-20
                    >
                    <TextField id="outlined-basic" label="Email" variant="outlined" />
                    <TextField id="outlined-basic" label="Phone Number" variant="outlined" />
                </Box>
                    {/* <div className='flex flex-row justify-center align-center gap-20'>
                        <TextField id="outlined-basic" label="Email" variant="outlined" />
                        <TextField id="outlined-basic" label="Phone Number" variant="outlined" />
                    </div> */}
                <Box
                    component="form"
                    sx={{ '& > :not(style)': { m: 1, width: '51ch' } }}
                    noValidate
                    autoComplete="off"
                    flex flex-row justify-center align-center gap-20
                    >
                    <TextField id="outlined-basic" label="Password" variant="outlined" />
                </Box>
                <Box
                    component="form"
                    sx={{ '& > :not(style)': { m: 1, width: '51ch' } }}
                    noValidate
                    autoComplete="off"
                    flex flex-row justify-center align-center gap-20
                    >
                    <TextField id="outlined-basic" label="Confirm Password" variant="outlined" />
                </Box>
                    <Box sx={{ '& button': { m: 1 } }} className='m-20'>
                        <Button variant="contained" size="medium">
                            Register
                        </Button>
                    </Box>
                    <p>Already have an account? <a href="" className='remove-underline'>Sign in</a></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SignUp