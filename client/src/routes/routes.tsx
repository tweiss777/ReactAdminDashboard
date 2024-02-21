import { createBrowserRouter } from "react-router-dom";
import Users from "../Components/Users";
import React from "react";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Users />,
    },
]);

export default router
