import React from 'react';
import { useLoaderData } from 'react-router-dom';

const QueryDetails = () => {

    const loadedQuery = useLoaderData();
    // console.log(loadedQuery);

    const { _id, email, name, user_photo, time, product_name, product_brand, product_image, query_title, reason } = loadedQuery;

    return (
        <div>
            <h1 className='text-3xl font-bold my-4'>Query Details</h1>
            <h2 className='text-3xl font-bold my-4'>Query Posted by: {name}</h2>

            <div className="flex flex-col lg:flex-row bg-base-100 w-full lg:h-[400px] shadow-xl rounded-xl mt-10 my-10">
                <figure className=''>
                    <img className='h-full w-full object-cover rounded-tl-lg rounded-bl-lg'
                        src={product_image}
                        alt={product_name} />
                </figure>
                <div className="p-4 space-y-8 rounded-lg ml-10">
                    <h3 className="text-3xl font-bold">Product: {product_name}</h3>
                    <p className="text-lg font-medium">Brand: {product_brand}</p>
                    <p className="text-lg">{query_title}</p>
                    <p className="font-medium">Reason: {reason}</p>
                    <button className="btn btn-primary">Add Recommendation</button>
                </div>
            </div>

        </div>
    );
};

export default QueryDetails;