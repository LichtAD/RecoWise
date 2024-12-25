import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import 'animate.css';

const MyRecommendations = () => {

    const { user } = useAuth();
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/recommendations?recommenderEmail=${user.email}`, {
            method: 'GET',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => setRecommendations(data))
    }, [user.email])

    // const { queryTitle, productName, userEmail, userName, recommenderEmail, recommenderName, currentTime } = recommendations;

    const handleDeleteRecommendation = (id, query_id) => {
        // console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // Swal.fire({
                //     title: "Deleted!",
                //     text: "Your file has been deleted.",
                //     icon: "success"
                // });

                fetch(`http://localhost:5000/recommendations/${id}`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ query_id })
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your coffee has been deleted.',
                                'success'
                            )
                            const remaining = recommendations.filter(recommendation => recommendation._id !== id);
                            setRecommendations(remaining);
                        }
                    })
            }
        });
    }

    return (
        <div>
            <h1 className='text-center text-3xl font-bold my-4 animate__animated animate__rotateInDownLeft'>My Recommendations</h1>

            <div className="overflow-x-auto">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product Name</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Query Posted By</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Recommended Title</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Recommended Product</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Recommended Reason</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recommendations.map((recommendation, index) => (
                            <tr key={recommendation._id} className="bg-white hover:bg-gray-100">
                                <td className="px-5 py-5 border-b border-gray-200 text-sm">{index + 1}</td>
                                <td className="px-5 py-5 border-b border-gray-200 text-sm">{recommendation.productName}</td>
                                <td className="px-5 py-5 border-b border-gray-200 text-sm">{recommendation.userName}</td>
                                <td className="px-5 py-5 border-b border-gray-200 text-sm">{recommendation.recommendationTitle}</td>
                                <td className="px-5 py-5 border-b border-gray-200 text-sm">{recommendation.recommendationProductName}</td>
                                <td className="px-5 py-5 border-b border-gray-200 text-sm">{recommendation.recommendationReason}</td>
                                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                    <button
                                        onClick={() => handleDeleteRecommendation(recommendation._id, recommendation.queryId)}
                                        className="bg-red-500 text-white font-bold py-1 px-3 rounded hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default MyRecommendations;