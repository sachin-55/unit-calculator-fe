import React from 'react';
import '../scss/login.scss'
import { Box , Label,Input,Button} from 'theme-ui';
import { FaArrowAltCircleLeft } from "react-icons/fa";
import {useHistory,Redirect} from 'react-router-dom';

import {useDispatch,useSelector} from 'react-redux';
import { login } from '../redux/actions/userAction';

const Login = ({backClick}) => {

    const [email,setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');
    const user = useSelector(state=>state.userLogin)
    const {loading,userInfo,error} = user;
    const dispatch = useDispatch();

    const history=useHistory();


    const handleLogin=(e)=>{

        e.preventDefault();
        dispatch(login(email,password));
           if(userInfo){
               history.push('/home')
           }
    }


    return (
        <div className='login-component'>
            <FaArrowAltCircleLeft onClick={backClick} className='arrow'/>

    <h1>Login </h1>
            <Box sx={{color:'primary'}}>
            {loading && 'Loading...'}
            {error}
            </Box>
            <Box as='form' onSubmit={handleLogin} mt='4'>
                <Input
                    name='email'
                    mb={3}
                    placeholder='Email'
                    sx={{ "&::placeholder":{
                        color:'gray'
                    },
                    fontSize:'20px',
                    padding:'10px'
                }}

                value={email}
                onChange={(e)=>setEmail(e.target.value)}

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
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
                 <Button type='submit'>
                    Login
                </Button>
            </Box>
        </div>
    );
}

export default Login;
