"use client"
import { useEffect, useState } from "react";
import  app from  "./firebase.config"
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, signInWithPopup, GoogleAuthProvider, getIdToken } from "firebase/auth";
import { useDispatch } from "react-redux";
import { getAdmin, getUser, removeLoggedError } from "../redux/user/userSlice";
import axios from "axios";

const auth = getAuth(app)

const useFirebase = () => {
    const dispatch = useDispatch()
    const [user,setUser] = useState(null)

    const createUser = (email,password) =>{
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signIn = (email, passowrd)=>{
        return signInWithEmailAndPassword(auth , email,passowrd)
    }
    const logOut = ()=>{
        dispatch(removeLoggedError())
        return signOut(auth)
    }

    useEffect(()=>{
        onAuthStateChanged(auth, currentUser =>{
            dispatch(getUser(currentUser?.email))
            if(currentUser){
                
                dispatch(getAdmin(currentUser?.email))
                 //get token and store client side
                 const userInfo = {email: currentUser.email};
                 axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/jwt`, userInfo,{withCredentials : true})
                 .then(res =>{
                     if(res.data.token){
                         localStorage.setItem('access-token', res.data.token);
                     }
                 })
                //  getIdToken(currentUser)
                //  .then(res =>{
                //     console.log('firebase jwt token ',res)
                    
                //  }).catch(err=>{
                //     console.log(err)
                //  })
             }else{
                 //TODO: remove token (if token stored in the client side:local storage, caching, in memory)
                 localStorage.removeItem('access-token');
             }
       })
   },[])

   return {createUser , signIn , logOut  }
};

export default useFirebase;