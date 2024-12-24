import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const MyQueries = () => {

    const [queries, setQueries] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        fetch(`http://localhost:5000/queries?email=${user.email}`)
            .then(res => res.json())
            .then(data => setQueries(data))
    }, [user.email])

    return (
        <div>
            <h1 className='text-center text-3xl font-bold my-4 flex gap-4'>
                My Queries: {queries.length}
                <NavLink className='btn' to="/add-queries">Add queries</NavLink>
            </h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                {
                    queries.map(query =>
                        <div key={query._id} className="card card-compact bg-base-100 shadow-xl">
                            <figure>
                                <img className='w-[60%]'
                                    src={query.product_image}
                                    alt={query.product_name} />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{query.product_name}</h2>
                                <p>{query.query_title}</p>
                                <div className="flex justify-between">
                                    <button className="btn btn-primary">View Details</button>
                                    <button className="btn btn-primary">Update</button>
                                    <button className="btn btn-primary">Delete</button>
                                </div>
                            </div>
                        </div>)
                }
            </div>
        </div>
    );
};

export default MyQueries;