import React from 'react';
import '../scss/login-registerpage.scss';
import Login from "../components/Login";
import Register from '../components/Register';
import { Button } from 'theme-ui';

const LoginRegisterPage = () => {
    const [animateLogin,setAnimateLogin]=React.useState('');
    const [animateRegister,setAnimateRegister]=React.useState('');
    const [animateBackFromLogin,setAnimateBackFromLogin]=React.useState('');
    const [animateBackFromRegister,setAnimateBackFromRegister]=React.useState('');
    const animationForBox = `${animateLogin} ${animateRegister} ${animateBackFromLogin} ${animateBackFromRegister} `
    const handleLoginClick=()=>{
        setAnimateLogin('animateLeft')
        setAnimateRegister('')
        setAnimateBackFromLogin('')
        setAnimateBackFromRegister('')

    }

    const handleRegisterClick=()=>{
        setAnimateRegister('animateRight')
        setAnimateLogin('')
        setAnimateBackFromLogin('')
        setAnimateBackFromRegister('')
    }

    const handleLoginBackClick=()=>{
        setAnimateBackFromLogin('animateBackFromLeft')
        setAnimateLogin('')
        setAnimateRegister('')
        setAnimateBackFromRegister('')
    }

    const handleRegisterBackClick=()=>{
        setAnimateBackFromRegister('animateBackFromRight')
        setAnimateLogin('')
        setAnimateRegister('')
        setAnimateBackFromLogin('')
    }


    return (
        <div className='background-wrapper'>
            <div className='container'>
                <div className={`box ${animationForBox}`}>
                    <div className='login-register plane'>
                            <h1>Hi There!!!</h1>
                            <p>
                                Let's start to calculate
                            </p>
                            <p className='newUser'>If you are new User, <span onClick={handleRegisterClick}>click here</span></p>
                            <Button className="btn login-btn" onClick={handleLoginClick}>Login</Button>
                    </div>
                    <div className='login plane'>
                        <Login backClick={handleLoginBackClick} />
                    </div>
                    <div className='register plane'>
                        <Register backClick={handleRegisterBackClick} />

                    </div>
                    <div className='back-side plane'>
                    </div>
                    <div className='top plane'>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginRegisterPage;
