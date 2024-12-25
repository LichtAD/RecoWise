import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import axios from 'axios';
import { FcViewDetails } from "react-icons/fc";
import { FaPencilAlt } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const MyQueries = () => {

    const [queries, setQueries] = useState([]);
    const { user } = useAuth();

    const [columns, setColumns] = useState(3);

    const handleColumnChange = (colCount) => {
        setColumns(colCount);
    };

    useEffect(() => {
        // fetch(`http://localhost:5000/queries?email=${user.email}`)
        //     .then(res => res.json())
        //     .then(data => setQueries(data))

        axios.get(`http://localhost:5000/queries?email=${user.email}`, {withCredentials: true})
            .then(res => setQueries(res.data))
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
        <div className='my-10'>
            {/* <h1 className='text-center text-3xl font-bold my-4 flex gap-4'>
                My Queries: {queries.length}
                <NavLink className='btn' to="/add-queries">Add queries</NavLink>
            </h1> */}

            <div className="my-10 bg-[url('https://i.ibb.co.com/fv73VFm/f00fa880-31c3-4866-ab3c-36a29939967e.jpg')] w-full h-[400px] bg-no-repeat bg-cover bg-center bg-blend-overlay bg-black/40 rounded-2xl flex justify-center items-center flex-col max-w-5xl mx-auto text-white">
                <h1 className='text-center text-3xl font-bold my-4'>My Queries</h1>
                <NavLink className='btn bg-custom-gradient-2 border-none text-white' to="/add-queries">Add queries</NavLink>
            </div>

            <div className='flex justify-between items-center my-4'>
                <div className='w-1/3'></div>
                <div className='w-1/3'></div>
                <div className='w-1/3 flex justify-end'>
                    <div className="join">
                        <input
                            className={`join-item btn ${columns === 1 ? 'bg-custom-gradient-2 text-white' : ''}`}
                            type="radio"
                            name="options"
                            aria-label="Column 1"
                            onClick={() => handleColumnChange(1)}
                        />
                        <input
                            className={`join-item btn ${columns === 2 ? 'bg-custom-gradient-2 text-white' : ''}`}
                            type="radio"
                            name="options"
                            aria-label="Column 2"
                            onClick={() => handleColumnChange(2)}
                        />
                        <input
                            className={`join-item btn ${columns === 3 ? 'bg-custom-gradient-2 text-white' : ''}`}
                            type="radio"
                            name="options"
                            aria-label="Column 3"
                            defaultChecked
                            onClick={() => handleColumnChange(3)}
                        />
                    </div>
                </div>
            </div>

            <div>
                {
                    queries.length === 0 &&
                    <div>
                        <h1 className='text-center text-3xl font-bold my-4'>
                            No queries found
                        </h1>
                        <div className='text-center'>
                            <NavLink className='btn' to="/add-queries">Add queries</NavLink>
                        </div>
                    </div>
                }
            </div>

            <div className={`grid gap-10 ${columns === 1 ? 'grid-cols-1' : columns === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                {
                    queries.map(query =>
                        <div key={query._id} className="card card-compact h-[500px] bg-base-100 shadow-xl relative">
                        {/* <div key={query._id} className="card card-compact h-[500px] bg-base-100 shadow-xl"> */}
                            <figure className="w-full h-[80%]">
                                <img
                                    className="w-80 h-full object-cover"
                                    src={query.product_image}
                                    alt={query.product_name}
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{query.product_name}</h2>
                                <p>{query.query_title}</p>
                                <div className="flex justify-between flex-col gap-4 absolute top-4 right-4">
                                {/* <div className="flex justify-between flex-col gap-4"> */}
                                    <NavLink to={`/my-queries/query-details/${query._id}`} className="btn bg-custom-gradient-2 text-white"><FcViewDetails size={20} /></NavLink>
                                    <NavLink to={`/my-queries/update-query/${query._id}`} className="btn bg-custom-gradient-2 text-white"><FaPencilAlt size={20} /></NavLink>
                                    <button onClick={() => handleDeleteQuery(query._id)} className="btn bg-custom-gradient-2 text-white"><MdDeleteOutline size={20} /></button>
                                </div>
                            </div>
                        </div>)
                }
            </div>
        </div>
    );
};

export default MyQueries;