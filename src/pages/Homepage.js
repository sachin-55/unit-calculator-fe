import React from 'react';
import Navbar from '../components/dashboard/Navbar';
import HomeSecond from '../components/dashboard/HomeSecond';

const Dashboard = () => {
    return (
        <div className="homepage-wrapper">
          <Navbar/>  
          <HomeSecond/>
        </div>
    );
}

export default Dashboard;
