import React from 'react';
import './backdrop.scss';

const Backdrop = ({visibility}) => {
    return (
        <div className={`backdrop ${visibility === true?'show-backdrop':''}`}/>
    );
}

export default Backdrop;
