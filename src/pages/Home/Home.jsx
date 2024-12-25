import React from 'react';
import Slide from '../../components/Slide';
import RecentQueries from '../../components/RecentQueries';
import Banner from '../../components/Banner';
import OurService from '../../components/OurService';

const Home = () => {
    return (
        <div>
            {/* <h1>Home</h1> */}
            <Banner></Banner>
            <Slide></Slide>
            <RecentQueries></RecentQueries>
            <OurService></OurService>
        </div>
    );
};

export default Home;