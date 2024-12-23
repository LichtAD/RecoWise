import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import Loader from '../pages/Shared/Loader';

const PrivateRoute = ({ children }) => {

    const location = useLocation();
    // console.log(location);

    const { user, loading } = useAuth();

    if (loading) {
        return <Loader></Loader>;
    }

    if (user && user?.email) {
        return children;
    }

    return <Navigate to="/login" state={location.pathname}></Navigate>;
};

export default PrivateRoute;