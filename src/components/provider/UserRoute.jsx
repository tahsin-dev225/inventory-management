"use client"
import { useRouter } from 'next/navigation';
import React from 'react';
import { useSelector } from 'react-redux';

const UserRoute = ({children}) => {
    // const stae = useSelector(state => state)
    const isUser = useSelector(state => state?.userReducer?.userData)
    const loading = useSelector(state => state?.userReducer?.isLoading)
    const state = useSelector(state => state)
    const router = useRouter()


    console.log(loading,'loding')
    console.log('state',state)

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
        return router.push('/login')
    }
};

export default UserRoute;