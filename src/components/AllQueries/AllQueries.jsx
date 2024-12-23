import React from 'react';
import { useLoaderData } from 'react-router-dom';
import SingleQuery from '../SingleQuery/SingleQuery';

const AllQueries = () => {

    const loadedQueries = useLoaderData();
    // console.log(loadedQueries);

    return (
        <div className='my-10'>
            <h1 className='text-center text-3xl font-bold my-4'>All Queries</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                {
                    loadedQueries.map(query => <SingleQuery key={query._id} query={query}></SingleQuery>)
                }
            </div>
        </div>
    );
};

export default AllQueries;