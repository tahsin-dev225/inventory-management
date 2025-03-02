"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import useFirebase from "../firebase/useFirebase";

export const axiosSecure = axios.create({
    baseURL : `${process.env.NEXT_PUBLIC_BASE_URL}`,
    withCredentials : true
})

const useAxiosSecure = () => {
    const router = useRouter()
    const {logOut} = useFirebase()

    // request interceptor to add authorization header for every secure call to the api
    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token')
        console.log('request stopped by interceptors before adding token', token)
        config.headers.authorization = `Bearer ${token}`
        return config;
    },function(error){
        return Promise.reject(error);
    })

    // intercepts 401 and 403 status
    axiosSecure.interceptors.response.use(function(response){
        return response;
    },async (error) =>{
        const status = error?.response?.status;
        console.log('status error in the interceptor', status)
        // for 401 or 403 logout the user and move to the login page
        if(status === 401 || status === 403){
            await logOut();
            router.push('/login')
        }
        return Promise.reject(error);
    })

    return axiosSecure;
};

export default useAxiosSecure;