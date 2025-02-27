"use client"
import { useRouter } from 'next/navigation';
import React from 'react';
import { useSelector } from 'react-redux';

const UserRoute = ({children}) => {
    const isUser = useSelector(state => state?.userReducer?.userData)
    const loading = useSelector(state => state?.userReducer?.isLoading)
    // const state = useSelector(state => state)
    const router = useRouter()

    // console.log(loading,'loding')

    if(loading === true){
        return <div className="w-full min-h-screen flex justify-center items-center">
            <span className="loading loading-ring loading-lg"></span>
        </div>
    }
    
    if(isUser){
        return  <div className='w-full min-h-screen'>
                {children}
            </div>
    }

    if(isUser === null || isUser === undefined){
        router.push('/login')
        return <div className=""></div>
    }
};

export default UserRoute;