import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/Shared/ErrorPage";
import Login from "../components/Login";
import Register from "../components/Register";
import MyQueries from "../components/MyQueries/MyQueries";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/register",
                element: <Register></Register>,
            },
            {
                path: "/my-queries",
                element: <PrivateRoute>
                    <MyQueries></MyQueries>
                </PrivateRoute>,
            },
        ],
    },
]);

export default router;