import Lottie from 'lottie-react';
import React from 'react';
import scrollAnimation from '../assets/lottie/scroll_category.json';

const OurService = () => {
    return (
        <div className='my-10'>
            <h1 className='text-center text-3xl font-bold my-10'>Our Services</h1>
            <div className='flex flex-col md:flex-row gap-8'>

                <div className='flex-1' data-aos="fade-right"
                    data-aos-offset="300"
                    data-aos-easing="ease-in-sine">
                    <Lottie className='w-[100%] mx-auto' animationData={scrollAnimation}></Lottie>
                </div>

                <div data-aos="fade-left"
                    data-aos-anchor="#example-anchor"
                    data-aos-offset="500"
                    data-aos-duration="500" 
                    className='flex-1 flex flex-col justify-center items-start gap-8'>
                    <h1 className='text-3xl font-bold'>We offers a wide range of categories that makes your life easy and efficient.</h1>
                    <p>Explore a variety of categories that are thoughtfully crafted to enhance your daily life with ease and efficiency. Our services are designed to adapt to your needs, providing reliable solutions in every aspect.</p>
                    <div className='flex flex-col gap-10'>
                        <div>
                            <div className='flex justify-between items-center'>
                                <h1 className='text-2xl font-bold'>Food</h1>
                                <span>30%</span>
                            </div>
                            <progress className="progress progress-primary w-96" value="30" max="100"></progress>
                        </div>
                        <div>
                            <div className='flex justify-between items-center'>
                                <h1 className='text-2xl font-bold'>Drinks</h1>
                                <span>55%</span>
                            </div>
                            <progress className="progress progress-primary w-96" value="55" max="100"></progress>
                        </div>
                        <div>
                            <div className='flex justify-between items-center'>
                                <h1 className='text-2xl font-bold'>Chocolates</h1>
                                <span>45%</span>
                            </div>
                            <progress className="progress progress-primary w-96" value="45" max="100"></progress>
                        </div>
                        <div>
                            <div className='flex justify-between items-center'>
                                <h1 className='text-2xl font-bold'>Snacks</h1>
                                <span>77%</span>
                            </div>
                            <progress className="progress progress-primary w-96" value="77" max="100"></progress>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurService;