import { createBrowserRouter } from "react-router";
import Layout from "../Layout/Layout";
import Posts from "../Pages/Posts/Posts";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import AuthProtectedRoute from "./AuthProtectedRoute/AuthProtectedRoute";

export const myRouting = createBrowserRouter([
    {path: '', element: <Layout/>, children: [
        {index: true, element: <ProtectedRoute><Posts/></ProtectedRoute>},
        {path:'posts', element: <ProtectedRoute><Posts/></ProtectedRoute>},
        {path:'login', element: <AuthProtectedRoute><Login/></AuthProtectedRoute>},
        {path:'register', element: <AuthProtectedRoute><Register/></AuthProtectedRoute>},
    ]}
])