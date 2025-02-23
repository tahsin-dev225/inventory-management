"use client"
import { useEffect, useState } from "react";
import  app from  "./firebase.config"
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch } from "react-redux";
import { getAdmin, getUser } from "../redux/user/userSlice";

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
        return signOut(auth)
    }

    useEffect(()=>{
        onAuthStateChanged(auth, currentUser =>{
           dispatch(getUser(currentUser?.email))
           dispatch(getAdmin(currentUser?.email))
           console.log("current user ", currentUser)
       })
   },[])

   return {createUser , signIn , logOut  }
};

export default useFirebase;