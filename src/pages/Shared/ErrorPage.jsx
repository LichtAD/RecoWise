import React from 'react';
import { NavLink } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="h-screen flex justify-center items-center">
            <div className="text-center space-y-4">
                <h1 className="text-9xl font-bold text-red-500">404</h1>
                <h2 className="text-3xl font-bold">Page Not Found</h2>
                <p className="text-xl">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
                <div>
                    <NavLink to="/" className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Go Back</NavLink>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;