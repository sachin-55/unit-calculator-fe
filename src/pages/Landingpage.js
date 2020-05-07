import React from 'react';
import {Link} from 'react-router-dom';
import '../scss/landingpage.scss';
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
                            </div>
                            </Link>
                        <div className='menu-toggler' onClick={toggleMenu}>
                            <span className="menu-toggle cross">X</span>
                            <span className="menu-toggle pipe">|||</span>

                        </div>
                        <div className='nav-list'>
                            <Link to='/' className='link-items'>
                                <div className='nav-items'>Home</div>
                            </Link>
                            <Link to='#' className='link-items'>
                                <div className='nav-items'>Calculations</div>
                            </Link>
                            <Link to='#' className='link-items'>
                                <div className='nav-items'>Contacts</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='hero'>
                <div className='container'>
                    <div className='headline'>
                        <div className="sub-headline"><span>W</span>elcome</div>
                        <div className='logo-headline'>Unit Calculator</div>
                        <div className='separator'>
                            <div className="line one"></div>
                            <div className="line middle">*</div>
                            <div className="line two"></div>
                        </div>
                        <div className="main-headline">Easy way to divide your home sub- meter units</div>
                    </div>
                    <Link to='/' className="link-items">
                        <div className="btn btn-explore">Explore</div>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Landingpage;
