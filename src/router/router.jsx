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
import MyRecommendations from "../components/MyRecommendations/MyRecommendations";
import MyQueryDetails from "../components/MyQueryDetails/MyQueryDetails";
import UpdateMyQuery from "../components/UpdateMyQuery/UpdateMyQuery";
import RecommendationForMe from "../components/RecommendationForMe/RecommendationForMe";

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
                path: "/recommendations-for-me",
                element: <PrivateRoute>
                    <RecommendationForMe></RecommendationForMe>
                </PrivateRoute>,
            },
            {
                path: "/my-queries",
                element: <PrivateRoute>
                    <MyQueries></MyQueries>         {/* jwt done */}
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
                loader: async () => fetch('http://localhost:5000/queries-only'),
            },
            {
                path: "/query-details/:id",
                element: <PrivateRoute>
                    <QueryDetails></QueryDetails>
                </PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/queries/${params.id}`)
            },
            {
                path: "/my-recommendations",
                element: <PrivateRoute>
                    <MyRecommendations></MyRecommendations>
                </PrivateRoute>,
            },
            {
                path: "/my-queries/query-details/:id",
                element: <MyQueryDetails></MyQueryDetails>,
                loader: ({ params }) => fetch(`http://localhost:5000/queries/${params.id}`)
            },
            {
                path: "/my-queries/update-query/:id",
                element: <UpdateMyQuery></UpdateMyQuery>,
                loader: ({ params }) => fetch(`http://localhost:5000/queries/${params.id}`)
            },
        ],
    },
]);

export default router;