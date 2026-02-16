// import axios from "axios";
// import { Navigate } from "react-router";

import axios from "axios";

// export const axiosInstance = axios.create({
//     baseURL: import.meta.env.VITE_BASE_URL,
// })

// axiosInstance.interceptors.request.use(
//     function(config) {
//         if(localStorage.getItem('token')) {
//             config.headers.token = localStorage.getItem('token') 
//         }
//         return config
//     },
//     function(error) {
//         return Promise.reject(error)
//     }
// )

// axiosInstance.interceptors.response.use(
//     function(response) {
//         return response
//     },
//     function(error) {
//         console.log("axiosInterceport", error.response)
//         if (error.response) {
//     //    localStorage.removeItem("token");
//         // <Navigate to="/login"/> 
//     }
//     return Promise.reject(error);
//     }
// )




export const axiosInterceptors = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

axiosInterceptors.interceptors.request.use(
    function(x) {
        if(localStorage.getItem('token')) x.headers.token = localStorage.getItem('token')
            console.log(x);
        return x
    },
    function(error) {
        console.log(error)
    }
)

axiosInterceptors.interceptors.response.use(
    function(response) {
        return response
    }
)