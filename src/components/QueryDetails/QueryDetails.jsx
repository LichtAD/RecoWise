import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

const QueryDetails = () => {

    const navigate = useNavigate();
    const { user } = useAuth();
    // console.log(user.email, user.displayName);

    const current_time = new Date().toLocaleString();
    // console.log(current_time);

    const loadedQuery = useLoaderData();
    // console.log(loadedQuery);

    const { _id, email, name, user_photo, time, product_name, product_brand, product_image, query_title, reason } = loadedQuery;

    const addRecommendation = (event) => {
        event.preventDefault();

        const added_recommendation_obj = {
            queryId: _id,
            queryTitle: query_title,
            productName: product_name,
            userEmail: email,
            userName: name,
            recommenderEmail: user.email,
            recommenderName: user.displayName,
            currentTime: current_time
        }

        fetch('http://localhost:5000/recommendations', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(added_recommendation_obj)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        title: "Congratulations!",
                        text: "Your work has been saved!",
                        icon: "success",
                        confirmButtonText: "OK"
                    })
                    navigate('/my-recommendations');
                }
            })
    }

    return (
        <div>
            <h1 className='text-3xl font-bold my-4'>Query Details</h1>
            <h2 className='text-3xl font-bold my-4'>Query Posted by: {name}</h2>
            {/* <p>id : {_id}</p> */}

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
                    <button onClick={addRecommendation} className="btn btn-primary">Add Recommendation</button>
                </div>
            </div>

            <div>
                <h1 className='text-3xl font-bold my-16'>All Recommendations</h1>
            </div>

        </div>
    );
};

export default QueryDetails;