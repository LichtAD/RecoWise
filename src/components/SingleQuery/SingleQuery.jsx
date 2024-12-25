import React from 'react';
import { NavLink } from 'react-router-dom';
import './SingleQuery.css'

const SingleQuery = ({ query, columns }) => {

    // console.log(columns);

    // console.log(query);
    const { _id, email, name, user_photo, time, product_name, product_brand, product_image, query_title, reason, count } = query;

    return (
        <div>
            <div className={`card card-compact bg-base-100 shadow-xl h-[550px]`}>
                <figure className="w-full h-[80%]">
                    <img className={`object-cover p-2 ${columns === 1 ? 'lg:w-[30%] md:w-[50%] w-[100%] h-full' : columns === 2 ? 'h-full w-[100%] lg:w-[70%]' : 'h-full w-full lg:w-full'}`}
                        src={product_image}
                        alt={product_name}
                    />
                </figure>

                <div className="card-body">
                    <h2 className="card-title">{product_name}</h2>
                    <p>{query_title}</p>
                    <div className="flex flex-col lg:flex-row gap-2 justify-between">
                        <button className="btn bg-custom-gradient-2 text-white">Count: {count}</button>
                        <NavLink to={`/query-details/${_id}`} className="btn bg-custom-gradient-2 text-white">Recommend</NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleQuery;