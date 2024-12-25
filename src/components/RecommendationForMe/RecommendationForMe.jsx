import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import 'animate.css';

const RecommendationForMe = () => {

    const { user } = useAuth();
    // console.log(user);
    const [recommendationsForMe, setRecommendationsForMe] = useState([]);

    useEffect(() => {
        fetch(`https://product-recommendation-system-server-coral.vercel.app/recommendations?userEmail=${user.email}`, {
            method: 'GET',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => setRecommendationsForMe(data))
        // .catch(error => console.log(error))
    }, [user.email])

    // console.log(recommendationsForMe);

    return (
        <div>
            <h1 className='text-center text-3xl font-bold my-4 animate__animated animate__flipInX'>Recommendation For Me</h1>

            <div className="overflow-x-auto">
                <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                            <tr>
                                <th scope="col" className="py-3 px-6">#</th>
                                <th scope="col" className="py-3 px-6">Image</th>
                                <th scope="col" className="py-3 px-6">Product Name</th>
                                <th scope="col" className="py-3 px-6">Recommended Product</th>
                                <th scope="col" className="py-3 px-6">Recommended By</th>
                                <th scope="col" className="py-3 px-6">Recommendation Title</th>
                                <th scope="col" className="py-3 px-6">Recommendation Reason</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                recommendationsForMe.map((recommendation, index) =>
                                    <tr key={recommendation._id} className="border-b hover:bg-gray-100">
                                        <td className="py-4 px-6">{index + 1}</td>
                                        <td className="py-4 px-6"><img className='w-16 rounded-lg' src={recommendation.recommendationProductImage} alt="" /></td>
                                        <td className="py-4 px-6">{recommendation.productName}</td>
                                        <td className="py-4 px-6">{recommendation.recommendationProductName}</td>
                                        <td className="py-4 px-6">{recommendation.recommenderName}</td>
                                        <td className="py-4 px-6">{recommendation.recommendationTitle}</td>
                                        <td className="py-4 px-6">{recommendation.recommendationReason}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default RecommendationForMe;