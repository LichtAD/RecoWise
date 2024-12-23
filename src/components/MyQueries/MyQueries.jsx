import React from 'react';
import { NavLink } from 'react-router-dom';

const MyQueries = () => {
    return (
        <div>
            <h1 className='text-center text-3xl font-bold my-4 flex gap-4'>
                My Queries
                <NavLink className='btn' to="/add-queries">Add queries</NavLink>
            </h1>
        </div>
    );
};

export default MyQueries;