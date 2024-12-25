import React from 'react';

const Banner = () => {
    return (
        <div className="my-10 h-[448px] lg:w-[832px] py-4 lg:py-0 mx-auto bg-[url('https://i.ibb.co.com/pvpQnXD/fa147800-1a6c-4900-9fa1-fa5d11f36ff5.jpg')] rounded-2xl bg-no-repeat bg-center bg-cover bg-black/60 bg-blend-overlay">
            <div className="text-white flex gap-4 flex-col justify-center items-center h-full">
                <h1 className="text-5xl font-bold text-center">
                    Welcome to RecoWise
                </h1>
                <p className=''>We ask your questions for you</p>
                <button className="px-8 py-3 bg-custom-gradient text-white rounded-full font-bold text-lg">Explore Now</button>
            </div>
        </div>
    );
};

export default Banner;