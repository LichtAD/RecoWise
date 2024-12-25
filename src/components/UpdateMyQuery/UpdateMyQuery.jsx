import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateMyQuery = () => {

    const loadedQuery = useLoaderData();
    const navigate = useNavigate();

    const { _id, email, name, user_photo, time, product_name, product_brand, product_image, query_title, reason } = loadedQuery;

    const handleUpdateQuery = (event) => {
        event.preventDefault();
        const form = event.target;
        const product_name = form.product_name.value;
        const product_brand = form.product_brand.value;
        const product_image = form.product_image.value;
        const query_title = form.query_title.value;
        const reason = form.reason.value;
        const current_time = new Date().toLocaleString();
        const updatedQuery = { current_time, product_name, product_brand, product_image, query_title, reason };
        // console.log(updatedQuery);

        // ! need to send data to the server
        fetch(`https://product-recommendation-system-server-coral.vercel.app/queries/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedQuery)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Success!",
                        text: "Your Query has been updated!",
                        icon: "success"
                    });
                    // form.reset();
                    navigate('/my-queries');
                }
            })
    }

    return (
        <div className='my-10'>
            <h1 className='text-3xl font-bold my-4'>Update My Query</h1>
            <div className=''>
                <form onSubmit={handleUpdateQuery}>
                    <div className='flex justify-center items-center flex-col my-4'>
                        <h1 className='text-2xl font-bold'>Email: {email}</h1>
                        <h2 className='text-2xl font-bold'>Name: {name}</h2>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product Name</span>
                            </label>
                            <input type="text" name="product_name" defaultValue={product_name} placeholder="Enter Product Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product Brand</span>
                            </label>
                            <input type="text" name="product_brand" defaultValue={product_brand} placeholder="Enter Product Brand" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product Image-URL</span>
                            </label>
                            <input type="text" name="product_image" defaultValue={product_image} placeholder="Enter Product Image-URL" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Query Title</span>
                            </label>
                            <input type="text" name="query_title" defaultValue={query_title} placeholder="Enter Query TItle" className="input input-bordered" required />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Boycotting Reason Details</span>
                        </label>
                        {/* <input type="text" name="image" placeholder="Enter Image" className="input input-bordered" required /> */}
                        <textarea name="reason" defaultValue={reason} className="textarea textarea-bordered h-20" placeholder="Boycotting Reason Details"></textarea>
                    </div>

                    <div className="form-control mt-8">
                        <button className={`btn bg-custom-gradient-2 text-white border-2 text-xl w-full`}>
                            Update Query
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default UpdateMyQuery;