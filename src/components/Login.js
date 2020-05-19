import React from 'react';
import '../scss/login.scss'
import { Box , Label,Input,Button} from 'theme-ui';
import { FaArrowAltCircleLeft } from "react-icons/fa";
import {useHistory,Redirect} from 'react-router-dom';

const Login = ({backClick}) => {
    const history=useHistory()
    const handleLogin=()=>{
        history.push('/home');
    }

    return (
        <div className='login-component'>
            <FaArrowAltCircleLeft onClick={backClick} className='arrow'/>

            <h1>Login</h1>
            <Box as='form' onSubmit={e => e.preventDefault()} mt='4'>
                <Input
                    name='username'
                    mb={3}
                    placeholder='Username'
                    sx={{ "&::placeholder":{
                        color:'gray'
                    },
                    fontSize:'20px',
                    padding:'10px'
                }}

                />
                <Input
                    type='password'
                    name='password'
                    mb={3}
                    placeholder='Password'
                    sx={{ "&::placeholder":{
                        color:'gray'
                    },
                     fontSize:'20px',
                    padding:'10px'
                }}

                />
                 <Button onClick={handleLogin}>
                    Login
                </Button>
            </Box>
        </div>
    );
}

export default Login;
