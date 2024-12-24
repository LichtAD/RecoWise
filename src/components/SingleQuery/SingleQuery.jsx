import React from 'react';
import { NavLink } from 'react-router-dom';

const SingleQuery = ({ query }) => {

    // console.log(query);
    const { _id, email, name, user_photo, time, product_name, product_brand, product_image, query_title, reason, count } = query;

    return (
        <div>
            <div className="card card-compact bg-base-100 shadow-xl">
                <figure>
                    <img className='w-[60%]'
                        src={product_image}
                        alt={product_name} />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{product_name}</h2>
                    <p>{query_title}</p>
                    <div className="flex justify-between">
                        <button className="btn btn-primary">Recommendation Count: {count ? count : 0}</button>
                        <NavLink to={`/query-details/${_id}`} className="btn btn-primary">Recommend</NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleQuery;