import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import SingleQuery from '../SingleQuery/SingleQuery';

const AllQueries = () => {

    const loadedQueries = useLoaderData();
    // console.log(loadedQueries);
    const [columns, setColumns] = useState(3);

    const handleColumnChange = (colCount) => {
        setColumns(colCount);
    };

    return (
        // <div className='my-10'>
        //     <div className='flex justify-between items-center my-4'>
        //         <div className='w-1/3'></div>
        //         <h1 className='w-1/3 text-center text-3xl font-bold my-4'>All Queries</h1>
        //         <div className='w-1/3 flex justify-end'>
        //             <div className="join">
        //                 <input className="join-item btn" type="radio" name="options" aria-label="Column 1" />
        //                 <input className="join-item btn" type="radio" name="options" aria-label="Column 2" />
        //                 <input className="join-item btn" type="radio" name="options" aria-label="Column 3" defaultChecked />
        //             </div>
        //         </div>
        //     </div>
        //     <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
        //         {
        //             loadedQueries.map(query => <SingleQuery key={query._id} query={query}></SingleQuery>)
        //         }
        //     </div>
        // </div>

        <div className='my-10'>
            <div className='flex justify-between items-center my-4'>
                <div className='w-1/3'></div>
                <h1 className='w-1/3 text-center text-3xl font-bold my-4'>All Queries</h1>
                <div className='w-1/3 flex justify-end'>
                    <div className="join">
                        <input
                            className="join-item btn"
                            type="radio"
                            name="options"
                            aria-label="Column 1"
                            onClick={() => handleColumnChange(1)}
                        />
                        <input
                            className="join-item btn"
                            type="radio"
                            name="options"
                            aria-label="Column 2"
                            onClick={() => handleColumnChange(2)}
                        />
                        <input
                            className="join-item btn"
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
                    loadedQueries.map(query => (
                        <SingleQuery key={query._id} query={query} columns={columns} />
                    ))
                }
            </div>
        </div>

    );
};

export default AllQueries;