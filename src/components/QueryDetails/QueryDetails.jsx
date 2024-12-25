import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { format, formatISO } from 'date-fns';
import './QueryDetails.css';

const QueryDetails = () => {

    const navigate = useNavigate();
    const { user } = useAuth();
    // console.log(user.email, user.displayName);

    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch(`https://product-recommendation-system-server-coral.vercel.app/recommendations?queryId=${_id}`, {
            method: 'GET',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => setComments(data))
    }, [])

    // console.log(comments);

    // const current_time = new Date().toLocaleString();
    const current_time = formatISO(new Date());
    // console.log(current_time);

    const loadedQuery = useLoaderData();
    // console.log(loadedQuery);

    const { _id, email, name, user_photo, time, product_name, product_brand, product_image, query_title, reason } = loadedQuery;

    const addRecommendation = (event) => {
        event.preventDefault();

        const form = event.target;
        const recommendation_title = form.recommendation_title.value;
        const recommendation_product_name = form.recommendation_product_name.value;
        const recommendation_product_image = form.recommendation_product_image.value;
        const recommendation_reason = form.recommendation_reason.value;
        // console.log({ recommendation_title, recommendation_product_name, recommendation_product_image, recommendation_reason });

        const added_recommendation_obj = {
            queryId: _id,
            queryTitle: query_title,
            productName: product_name,
            userEmail: email,
            userName: name,
            recommenderEmail: user.email,
            recommenderName: user.displayName,
            recommenderPhoto: user.photoURL,
            currentTime: current_time,
            recommendationTitle: recommendation_title,
            recommendationProductName: recommendation_product_name,
            recommendationProductImage: recommendation_product_image,
            recommendationReason: recommendation_reason
        }

        fetch('https://product-recommendation-system-server-coral.vercel.app/recommendations', {
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

            <div className="card_x2 card_x3 p-4 flex flex-col justify-between lg:flex-row bg-base-100 w-full lg:h-[550px] shadow-xl rounded-xl mt-10 my-10">
                <figure className=''>
                    <img className='h-full w-full object-cover rounded-tl-lg rounded-bl-lg'
                        src={product_image}
                        alt={product_name} />
                </figure>

                <div className="p-4 space-y-8 rounded-lg ml-10 text-white">
                    <h3 className="text-3xl font-bold">Product: {product_name}</h3>
                    <p className="text-lg font-medium">Brand: {product_brand}</p>
                    <p className="text-lg">{query_title}</p>
                    <p className="font-medium">Reason: {reason}</p>
                    {/* <button onClick={addRecommendation} className="btn btn-primary">Add Recommendation</button> */}
                </div>

                {/* recommendations */}
                <div className='px-4'>
                    <form onSubmit={addRecommendation}>
                        <h1 className='text-3xl font-bold my-4 text-white'>Add Recommendation</h1>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Recommendation Title</span>
                            </label>
                            <input type="text" name='recommendation_title' placeholder="recommendation title" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Recommended Product Name</span>
                            </label>
                            <input type="text" name='recommendation_product_name' placeholder="recommendation product name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Recommended Product Image</span>
                            </label>
                            <input type="text" name='recommendation_product_image' placeholder="recommendation product image" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Recommendation Reason</span>
                            </label>
                            <input type="text" name='recommendation_reason' placeholder="recommendation reason" className="input input-bordered" required />
                        </div>

                        <div className="form-control mt-6">
                            <button type="submit" className="btn bg-custom-gradient border-none text-white">Add Recommendation</button>
                        </div>
                    </form>
                </div>
            </div>

            <div>
                <h1 className='text-3xl font-bold my-8'>All Recommendations</h1>
                <div className=''>
                    {
                        comments.map(comment => <div key={comment._id} className="notification flex items-center mb-4">
                            <div className="flex p-2 gap-4 items-center">
                                <div className="avatar">
                                    <div className="notititle mask mask-squircle w-20 h-20">
                                        <img src={comment.recommendationProductImage} alt={comment.recommenderName} />
                                    </div>
                                </div>
                                <div className='notititle space-y-2'>
                                    <div className="font-bold">{comment.recommenderName} - <span className="text-sm">{comment.recommendationProductName}</span></div>
                                    <div className="text-sm">{comment.recommendationReason}</div>
                                    <div className='text-sm'>Recommended At: {format(new Date(comment.currentTime), 'PPpp')}</div>
                                </div>
                            </div>
                            {/* <p className='text-2xl my-4'>{comment.recommendation}</p> */}
                        </div>)
                    }
                </div>
            </div>

        </div>
    );
};

export default QueryDetails;