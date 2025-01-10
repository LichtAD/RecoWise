import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../pages/Shared/Navbar';
import Footer from '../pages/Shared/Footer';

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='max-w-7xl mx-auto min-h-screen px-2 mt-28'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;