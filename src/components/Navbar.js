import React from 'react';
import '../scss/navbar.scss';
import { Box } from 'theme-ui';
import { Link } from 'react-router-dom';

import { FaHome,FaRegClipboard,FaBook,FaHistory } from "react-icons/fa";

const Navbar= () => {
    const [menuOpen,setMenuOpen] = React.useState('');

    const toggleMenu=()=>{
        menuOpen===""?setMenuOpen('open'): setMenuOpen("");
    }
    return (
        <div>
            <div className={`dash__header ${menuOpen}`}>
                    <div className="container">
                        <div className='nav'>
                            <Link to='/' >
                                <div className='dash__logo'>
                                    <span className="dash__word first-word">Unit</span>
                                    <span className="dash__word second-word">Calculator</span>
                                </div>
                                </Link>
                            <div className='menu-toggler' onClick={toggleMenu}>
                                <span className="menu-toggle cross">X</span>
                                <span className="menu-toggle pipe">|||</span>

                            </div>
                            <div className='nav-list'>
                                <Link to='/dashboard' className='link-items'>
                                    <div className='nav-items'>Home</div>
                                </Link>
                                <Link to='/dashboard' className='link-items'>
                                    <div className='nav-items'>Register</div>
                                </Link>
                                <Link to='/dashboard' className='link-items'>
                                    <div className='nav-items'>Readings</div>
                                </Link>
                                <Link to='/' className='link-items'>
                                    <div className='nav-items'>History</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>        
        </div>
    );
}

export default Navbar;
