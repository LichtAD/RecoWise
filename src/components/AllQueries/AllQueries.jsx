import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import SingleQuery from '../SingleQuery/SingleQuery';
// import { TfiLayoutColumn3 } from "react-icons/tfi";
import 'animate.css';
import axios from 'axios';
import useAuth from '../../Hooks/useAuth';
import { BsSortNumericDownAlt } from "react-icons/bs";
import { FaSortAlphaDown } from "react-icons/fa";

const AllQueries = () => {

    const { theme } = useAuth();

    // const loadedQueries = useLoaderData();
    const [queries, setQueries] = useState();

    const [columns, setColumns] = useState(3);

    const [searchText, setSearchText] = useState('');
    // console.log(searchText);

    useEffect(() => {
        axios.get(`https://product-recommendation-system-server-coral.vercel.app/queries-only?filter=${searchText}`)
            .then(res => setQueries(res.data))
    }, [searchText])

    const handleColumnChange = (colCount) => {
        setColumns(colCount);
    };

    // // ! search function in js
    // const handleSearch = (event) => {
    //     const searchText = event.target.value.toLowerCase();
    //     // console.log(searchText);
    //     const filteredQueries = loadedQueries.filter(query => query.product_name.toLowerCase().includes(searchText));
    //     setQueries(filteredQueries);
    // };

    // ! sort
    const handleSort = (sortType) => {
        if (sortType === 'Oldest') {
            fetch(`https://product-recommendation-system-server-coral.vercel.app/queries-sort`, {
                method: 'GET'
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    setQueries(data);
                })
        }
        else if (sortType === 'Name') {
            fetch(`https://product-recommendation-system-server-coral.vercel.app/queries-sort-name`, {
                method: 'GET'
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    setQueries(data);
                })
        }
    }

    return (
        <div className='my-10'>
            <div className='flex flex-col lg:flex-row gap-4 justify-between items-center my-4'>
                <div className='w-[15%] flex items-center gap-4'>
                    <h1 className='text-3xl font-bold my-4 animate__animated animate__fadeInLeft'>All Queries</h1>
                </div>

                {/* search part */}
                <div className='w-[25%]'>
                    {/* <input type="text" placeholder="Search..." className="input input-bordered w-full max-w-xs" onChange={handleSearch} /> */}
                    <input type="text" placeholder="Search..." className="input input-bordered w-full max-w-xs" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                </div>

                <div className='w-[60%] flex justify-end space-x-4'>
                    {/* sort btn */}
                    <div className='flex items-center gap-4'>
                        <button onClick={() => handleSort('Oldest')} className={`btn bg-custom-gradient-2 text-white border-1 border-white`}>Sort by Oldest<BsSortNumericDownAlt size={20} /></button>
                        <button onClick={() => handleSort('Name')} className={`btn bg-custom-gradient-2 text-white border-1 border-white`}>Sort by Name<FaSortAlphaDown size={20} /></button>
                    </div>
                    <div className="join">
                        <input
                            className={`join-item btn ${columns === 1 ? 'bg-custom-gradient-2 text-white border-none' : ''}`}
                            type="radio"
                            name="options"
                            aria-label={"Column 1"}
                            onClick={() => handleColumnChange(1)}
                        />
                        <input
                            className={`join-item btn ${columns === 2 ? 'bg-custom-gradient-2 text-white border-none' : ''}`}
                            type="radio"
                            name="options"
                            aria-label="Column 2"
                            onClick={() => handleColumnChange(2)}
                        />
                        <input
                            className={`join-item btn ${columns === 3 ? 'bg-custom-gradient-2 text-white border-none' : ''}`}
                            type="radio"
                            name="options"
                            aria-label="Column 3"
                            defaultChecked
                            onClick={() => handleColumnChange(3)}
                        />
                    </div>
                </div>
            </div>
            <div className={`grid lg:gap-10 gap-2 ${columns === 1 ? 'grid-cols-1' : columns === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                {
                    queries?.map(query => (
                        <SingleQuery key={query._id} query={query} columns={columns} />
                    ))
                }
            </div>
        </div>

    );
};

export default AllQueries;