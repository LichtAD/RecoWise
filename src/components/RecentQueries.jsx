import React, { useEffect, useState } from 'react';
import SingleQuery from './SingleQuery/SingleQuery';
import useAuth from '../Hooks/useAuth';

const RecentQueries = () => {

    const { theme } = useAuth();

    const [recentQueries, setRecentQueries] = useState([]);

    useEffect(() => {
        fetch('https://product-recommendation-system-server-coral.vercel.app/queries-six')
            .then(res => res.json())
            .then(data => setRecentQueries(data))
    }, [])

    // console.log(recentQueries);

    return (
        <div className='my-10' id='recent-queries'>
            <h1 className={`text-center text-3xl font-bold my-4 ${theme === 'light' ? 'text-black' : 'text-white'}`}>Recent Queries</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                {
                    recentQueries.map(singleQuery =>
                        <div key={singleQuery._id} className="card card-compact p-2 bg-base-100 h-[500px] shadow-xl">
                            <figure className="w-full h-[80%]">
                                <img
                                    className="w-full h-full object-cover"
                                    src={singleQuery.product_image}
                                    alt={singleQuery.product_name}
                                />
                            </figure>

                            <div className="card-body">
                                <h2 className="card-title">{singleQuery.product_name}</h2>
                                <p>{singleQuery.query_title}</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default RecentQueries;