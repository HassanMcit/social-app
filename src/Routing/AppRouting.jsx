import { createBrowserRouter } from "react-router";
import Layout from "../Layout/Layout";
import Posts from "../Pages/Posts/Posts";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";

export const myRouting = createBrowserRouter([
    {path: '', element: <Layout/>, children: [
        {index: true, element: <Posts/>},
        {path:'posts', element: <Posts/>},
        {path:'login', element: <Login/>},
        {path:'register', element: <Register/>},
    ]}
])