import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <p>There was an error</p>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
        ],
    },
]);

export default router;