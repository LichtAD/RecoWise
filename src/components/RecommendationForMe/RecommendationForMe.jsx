import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';

const RecommendationForMe = () => {

    const { user } = useAuth();
    // console.log(user);
    const [recommendationsForMe, setRecommendationsForMe] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/recommendations?userEmail=${user.email}`)
            .then(res => res.json())
            .then(data => setRecommendationsForMe(data))
            .catch(error => console.log(error))
    }, [user.email])

    // console.log(recommendationsForMe);

    return (
        <div>
            <h1 className='text-3xl font-bold my-4'>Recommendation For Me: {recommendationsForMe.length}</h1>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Recommended Product</th>
                            <th>Recommended By</th>
                            <th>Recommendation Title</th>
                            <th>Recommendation Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 2 */}
                        {
                            recommendationsForMe.map((recommendation, index) =>
                                <tr key={recommendation._id} className="hover">
                                    <th>{index + 1}</th>
                                    <td><img className='w-16' src={recommendation.recommendationProductImage} alt="" /></td>
                                    <td>{recommendation.productName}</td>
                                    <td>{recommendation.recommendationProductName}</td>
                                    <td>{recommendation.recommenderName}</td>
                                    <td>{recommendation.recommendationTitle}</td>
                                    <td>{recommendation.recommendationReason}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default RecommendationForMe;