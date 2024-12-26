import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { Helmet } from "react-helmet";

const MyQueryDetails = () => {

    const loadedQuery = useLoaderData();
    // console.log(loadedQuery);

    const { _id, email, name, user_photo, time, product_name, product_brand, product_image, query_title, reason, count } = loadedQuery;

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>My Query Details</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <div className='my-10'>
                <h1 className='text-3xl font-bold my-4'>My Query Details</h1>
                {/* <h2 className='text-3xl font-bold my-4'>Query Posted by: {name}</h2> */}
                {/* <p>id : {_id}</p> */}

                <div className="card_x2 card_x3 p-4 text-white flex flex-col lg:flex-row bg-base-100 w-full lg:h-[400px] shadow-xl rounded-xl mt-10 my-10">
                    <figure>
                        <img className='h-full w-full object-cover rounded-tl-lg rounded-bl-lg'
                            src={product_image}
                            alt={product_name} />
                    </figure>
                    <div className="p-4 space-y-8 rounded-lg ml-10">
                        <h3 className="text-3xl font-bold">Product: {product_name}</h3>
                        <p className="text-lg font-medium">Brand: {product_brand}</p>
                        <p className="text-lg">{query_title}</p>
                        <p className="font-medium">Reason: {reason}</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MyQueryDetails;