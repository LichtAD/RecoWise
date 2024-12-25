import React from 'react';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { formatISO } from 'date-fns';

const AddQueries = () => {

    const { user } = useAuth();
    const navigate = useNavigate();

    const email = user.email;
    const name = user.displayName;
    const user_photo = user.photoURL;

    const time = formatISO(new Date());
    // console.log(time);

    const handleAddQueries = (event) => {
        event.preventDefault();
        const form = event.target;
        const product_name = form.product_name.value;
        const product_brand = form.product_brand.value;
        const product_image = form.product_image.value;
        const query_title = form.query_title.value;
        const reason = form.reason.value;
        let count = 0;
        const newQuery = { email, name, user_photo, time, product_name, product_brand, product_image, query_title, reason, count };
        // console.log(newQuery);

        // ! send data to the server
        fetch('http://localhost:5000/queries', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newQuery)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                Swal.fire({
                    title: "Congratulation!",
                    text: "New Query has been added in the database!",
                    icon: "success",
                    confirmButtonText: "Ok"
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/my-queries');
                    }
                })
            })
    }

    return (
        <div className='my-10'>
            <h1 className='text-center text-3xl font-bold my-4'>Add Queries</h1>
            <div className=''>
                <form onSubmit={handleAddQueries}>
                    <div className='flex justify-center items-center flex-col my-4'>
                        <h1 className='text-2xl font-bold'>Email: {email}</h1>
                        <h2 className='text-2xl font-bold'>Name: {name}</h2>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product Name</span>
                            </label>
                            <input type="text" name="product_name" placeholder="Enter Product Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product Brand</span>
                            </label>
                            <input type="text" name="product_brand" placeholder="Enter Product Brand" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product Image-URL</span>
                            </label>
                            <input type="text" name="product_image" placeholder="Enter Product Image-URL" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Query Title</span>
                            </label>
                            <input type="text" name="query_title" placeholder="Enter Query TItle" className="input input-bordered" required />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Boycotting Reason Details</span>
                        </label>
                        {/* <input type="text" name="image" placeholder="Enter Image" className="input input-bordered" required /> */}
                        <textarea name="reason" className="textarea textarea-bordered h-20" placeholder="Boycotting Reason Details"></textarea>
                    </div>

                    <div className="form-control mt-8">
                        <button className={`btn bg-custom-gradient-2 text-white border-2 text-xl w-full`}>
                            Add Equipment
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddQueries;