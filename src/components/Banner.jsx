import React from 'react';
import 'animate.css';

const Banner = () => {
    return (
        <div className="z-10 my-10 h-[448px] lg:w-[832px] py-4 lg:py-0 mx-auto bg-[url('https://i.ibb.co.com/pvpQnXD/fa147800-1a6c-4900-9fa1-fa5d11f36ff5.jpg')] rounded-2xl bg-no-repeat bg-center bg-cover bg-black/60 bg-blend-overlay">
            <div className="card5 text-white flex gap-4 flex-col justify-center items-center h-full">
                <h1 className="text-5xl font-bold text-center animate__animated animate__bounceInDown">
                    Welcome to RecoWise
                </h1>
                <p className=''>We ask your questions for you</p>
                <a href='#recent-queries' className="px-8 py-3 bg-custom-gradient-2 text-white rounded-full font-bold text-lg">Explore Now</a>
            </div>
        </div>
    );
};

export default Banner;