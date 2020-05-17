import React from 'react';
import Navbar from '../components/dashboard/Navbar';
import Home from '../components/dashboard/Home';

const Dashboard = (props) => {
    return (
        <>
          <Navbar props/>  
          <Home/>
        </>
    );
}

export default Dashboard;
