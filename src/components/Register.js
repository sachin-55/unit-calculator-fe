import React from 'react';
import '../scss/register.scss'
import { Box , Label,Input,Button} from 'theme-ui';
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { register } from '../redux/actions/userAction';

const Register = ({backClick}) => {

    const [name,setName] = React.useState('');
    const [email,setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');
    const [passwordConfirm,setPasswordConfirm] = React.useState('');

    const user = useSelector(state=>state.userRegister)
    const {loading,userInfo,error} = user;
    const dispatch = useDispatch();

    const history=useHistory();

    React.useEffect(()=>{
        if(userInfo){
            history.push('/home');
        }
    },[userInfo]);
    const handleRegister=(e)=>{

        e.preventDefault();
            dispatch(register(name,email,password,passwordConfirm));

    }

    return (
        <div className="register-component">
            <FaArrowAltCircleRight onClick={backClick} className='arrow'/>


          <h1>Register</h1>
          <Box sx={{color:'primary'}}>
            {loading && 'Loading...'}
            {error}
            </Box>
            <Box as='form' onSubmit={handleRegister}>
            <Input
                    
                    name='name'
                    mb={3}
                    placeholder='Fullname'
                    sx={{ "&::placeholder":{
                        color:'gray'
                    },
                    fontSize:'20px',
                    padding:'10px'
                }}
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />
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
                   <Input
                    type='password'
                    name='confirmPassword'
                    mb={3}
                    placeholder='Confirm Password'
                    sx={{ "&::placeholder":{
                        color:'gray'
                    },
                     fontSize:'20px',
                    padding:'10px'
                }}
                value={passwordConfirm}
                onChange={(e)=>setPasswordConfirm(e.target.value)}
                />
                 <Button type='submit' >
                    Register
                </Button>
            </Box>
        </div>
    );
}

export default Register;
