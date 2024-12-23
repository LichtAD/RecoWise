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
import AddQueries from "../components/AddQueries/AddQueries";
import AllQueries from "../components/AllQueries/AllQueries";
import QueryDetails from "../components/QueryDetails/QueryDetails";

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
            {
                path: "/add-queries",
                element: <PrivateRoute>
                    <AddQueries></AddQueries>
                </PrivateRoute>,
            },
            {
                path: "/all-queries",
                element: <AllQueries></AllQueries>,
                loader: async () => fetch('http://localhost:5000/queries'),
            },
            {
                path: "/query-details/:id",
                element: <PrivateRoute>
                    <QueryDetails></QueryDetails>
                </PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/queries/${params.id}`)
            },
        ],
    },
]);

export default router;