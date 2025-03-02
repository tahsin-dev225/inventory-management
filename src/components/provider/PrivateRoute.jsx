"use client"
import { useSelector } from "react-redux";

const PrivateRoute = ({role,children}) => {
    const isUser = useSelector(state => state?.userReducer?.isAdmin)

    const isMatched = role.includes(isUser?.role)

    if(isMatched === true){
        return <div className="w-full ">
            { children }
        </div>
    }

    return <div className="w-full flex h-screen justify-center items-center">
        <h1 className="text-3xl">You are not valid.</h1>
    </div>
};

export default PrivateRoute;