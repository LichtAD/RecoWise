import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { formatISO } from 'date-fns';

const QueryDetails = () => {

    const navigate = useNavigate();
    const { user } = useAuth();
    // console.log(user.email, user.displayName);

    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/recommendations?queryId=${_id}`)
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
                <h1 className='text-3xl font-bold my-8'>All Recommendations</h1>
                <div className=''>
                    {
                        comments.map(comment => <div key={comment._id} className="flex items-center mb-4">
                            <div className="flex p-2 gap-4 items-center">
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={comment.recommenderPhoto} alt={comment.recommenderName} />
                                    </div>
                                </div>
                                <div className=''>
                                    <div className="font-bold"> Recommended by: {comment.recommenderName}</div>
                                    <div className="text-sm opacity-50">Recommended at: {comment.currentTime}</div>
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