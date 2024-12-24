import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

const MyQueries = () => {

    const [queries, setQueries] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        fetch(`http://localhost:5000/queries?email=${user.email}`)
            .then(res => res.json())
            .then(data => setQueries(data))
    }, [user.email])

    const handleDeleteQuery = (id) => {
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

                fetch(`http://localhost:5000/queries/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your query has been deleted.',
                                'success'
                            )
                            const remainingQueries = queries.filter(query => query._id !== id);
                            setQueries(remainingQueries);
                        }
                    })
            }
        });
    }

    return (
        <div>
            <h1 className='text-center text-3xl font-bold my-4 flex gap-4'>
                My Queries: {queries.length}
                <NavLink className='btn' to="/add-queries">Add queries</NavLink>
            </h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                {
                    queries.map(query =>
                        <div key={query._id} className="card card-compact bg-base-100 shadow-xl">
                            <figure>
                                <img className='w-[60%]'
                                    src={query.product_image}
                                    alt={query.product_name} />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{query.product_name}</h2>
                                <p>{query.query_title}</p>
                                <div className="flex justify-between">
                                    <NavLink to={`/my-queries/query-details/${query._id}`} className="btn btn-primary">View Details</NavLink>
                                    <NavLink to={`/my-queries/update-query/${query._id}`} className="btn btn-primary">Update</NavLink>
                                    <button onClick={() => handleDeleteQuery(query._id)} className="btn btn-primary">Delete</button>
                                </div>
                            </div>
                        </div>)
                }
            </div>
        </div>
    );
};

export default MyQueries;