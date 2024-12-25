import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import SingleQuery from '../SingleQuery/SingleQuery';
// import { TfiLayoutColumn3 } from "react-icons/tfi";

const AllQueries = () => {

    const loadedQueries = useLoaderData();
    // console.log(loadedQueries);
    const [queries, setQueries] = useState(loadedQueries);
    const [columns, setColumns] = useState(3);

    const handleColumnChange = (colCount) => {
        setColumns(colCount);
    };

    // ! search function
    const handleSearch = (event) => {
        const searchText = event.target.value.toLowerCase();
        // console.log(searchText);
        const filteredQueries = loadedQueries.filter(query => query.product_name.toLowerCase().includes(searchText));
        setQueries(filteredQueries);
    };

    return (
        <div className='my-10'>
            <div className='flex justify-between items-center my-4'>
                <h1 className='w-1/3 text-3xl font-bold my-4'>All Queries</h1>
                <div className='w-1/3'>
                    <input type="text" placeholder="Search..." className="input input-bordered w-full max-w-xs" onChange={handleSearch} />
                </div>
                <div className='w-1/3 flex justify-end'>
                    <div className="join">
                        <input
                            className={`join-item btn ${columns === 1 ? 'bg-custom-gradient-2 text-white' : ''}`}
                            type="radio"
                            name="options"
                            aria-label={"Column 1"}
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
            <div className={`grid gap-10 ${columns === 1 ? 'grid-cols-1' : columns === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                {
                    queries.map(query => (
                        <SingleQuery key={query._id} query={query} columns={columns} />
                    ))
                }
            </div>
        </div>

    );
};

export default AllQueries;