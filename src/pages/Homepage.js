import React from 'react';
import Navbar from '../components/dashboard/Navbar';
import Home from '../components/dashboard/Home';
import '../scss/homepage.scss';
const Dashboard = () => {



    return (
        <div className="homepage-wrapper">
          <Navbar props/>  
          <Home/>
        </div>
    );
}

export default Dashboard;
