import React from 'react';
import {Link} from 'react-router-dom';
import '../scss/landingpage.scss';

import LoginRegisterPage from './LoginRegisterPage';
import Home from '../components/dashboard/Home';
import RegisterMeter from './RegisterMeterpage';

const Landingpage = () => {
    const [menuOpen,setMenuOpen] = React.useState('');

    const toggleMenu=()=>{
        menuOpen===""?setMenuOpen('open'): setMenuOpen("");
    }

    return (
        <>
                <div className={`header ${menuOpen}`}>
                    <div className="container">
                        <div className='nav'>
                            <Link to='/' >
                                <div className='logo'>
                                    <span className="word first-word">Unit</span>
                                    <span className="word second-word">Calculator</span>
          {process.env.HOST_API_URL}

                                </div>
                                </Link>
                     
                        </div>
                    </div>
                </div>
                <div className={`hero`}>
                    <div className='container'>
                        <div className='headline'>
                            <div className="sub-headline"><span>W</span>elcome</div>
                            <div className='logo-headline'>Unit Calculator</div>
                            <div className='separator'>
                                <div className="line firstline"></div>
                                <div className="asterisk">*</div>
                                <div className="line secondline"></div>
                            </div>
                            <div className="main-headline">Easy way to divide your home sub- meter units</div>
                        </div>
                        <div className="btn btn-explore" >
                            <Link to='/register' className="link-items">
                                Enter
                            </Link>
                        </div>
                        <div className="loginFromLand">
                            <Link to='/login' className="link-items">
                                Login  
                            </Link>
                             &nbsp;to save you information for future uses.
                        </div>
                    </div>
                </div>
                <div className='simple-calculation'>
                            <Home/>
                </div>
        </>
    );
}

export default Landingpage;
