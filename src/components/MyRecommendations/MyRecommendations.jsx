import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

const MyRecommendations = () => {

    const { user } = useAuth();
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/recommendations?recommenderEmail=${user.email}`)
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
            <h1 className='text-center text-3xl font-bold my-4'>My Recommendations: {recommendations.length}</h1>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>product Name</th>
                            <th>Query User</th>
                            <th>Query Title</th>
                            {/* <th>Recommendeder Name</th> */}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* row 2 */}
                        {
                            recommendations.map((recommendation, index) => <tr key={recommendation._id} className="hover">
                                <th>{index + 1}</th>
                                <td>{recommendation.productName}</td>
                                <td>{recommendation.userName}</td>
                                <td>{recommendation.queryTitle}</td>
                                {/* <td>{recommendation.recommenderName}</td> */}
                                <td><button onClick={() => {
                                    handleDeleteRecommendation(recommendation._id, recommendation.queryId)
                                }} className='btn btn-xs'>Delete</button></td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default MyRecommendations;