import React from 'react';
import '../scss/register.scss'
import { Box , Label,Input,Button} from 'theme-ui';
import { FaArrowAltCircleRight } from "react-icons/fa";

const Register = ({backClick}) => {
    return (
        <div className="register-component">
            <FaArrowAltCircleRight onClick={backClick} className='arrow'/>


          <h1>Register</h1>
            <Box as='form' onSubmit={e => e.preventDefault()} mt='4'>
            <Input
                    
                    name='firstname'
                    mb={3}
                    placeholder='Firstname'
                    sx={{ "&::placeholder":{
                        color:'gray'
                    },
                    fontSize:'20px',
                    padding:'10px'
                }}

                />
                 <Input
                    name='lastname'
                    mb={3}
                    placeholder='Lastname'
                    sx={{ "&::placeholder":{
                        color:'gray'
                    },
                    fontSize:'20px',
                    padding:'10px'
                }}

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

                />
                 <Button>
                    Register
                </Button>
            </Box>
        </div>
    );
}

export default Register;
