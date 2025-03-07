"use client"
import { FaLongArrowAltRight, FaUser } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { FaCircle, FaFacebook } from "react-icons/fa6";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useFirebase from "@/components/firebase/useFirebase";
import { useDispatch, useSelector } from "react-redux";
import { logUser } from "@/components/redux/user/userSlice";

const LoginPage = () => {
    const {theme , setTheme} = useTheme('light')
    const [newUser , setNewUser] = useState({email : '', password : ''})
    const router = useRouter();
    const isLogged = useSelector(state => state.userReducer?.isLogged)
    const loggedError = useSelector(state => state.userReducer?.isloggedError)
    const errorMessage = useSelector(state => state.userReducer?.errorMesage)
    const dispatch = useDispatch()
    const {signIn} = useFirebase();
    const user = useSelector(state => state?.userReducer?.userData)
    const [disable, setdisable] = useState(false)

    const normalButton = 'w-full text-white my-6 bg-gradient-to-tr from-indigo-900 to-orange-600 cursor-pointer border rounded-full py-2 shadow-xl'
    const disableButton = 'w-full text-white my-6 bg-slate-400 cursor-pointer border rounded-full py-2 shadow-xl'

    const handleLogin = (e)=>{
        setdisable(true)
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        dispatch(logUser(email))
        setNewUser({email,password})
    }

    useEffect(()=>{
        if(isLogged){
            signIn(newUser.email,newUser.password)
            .then(res =>{
                setdisable(false)
                router.push('/dashboard')
            })
            .catch(error =>{
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "You don't have account sign up first.",
                    showConfirmButton: false,
                    timer: 1500
                });
                console.log('error from login', error)
                setdisable(false)
            }
            )
        }
        if(loggedError){
            setdisable(false)
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: `${errorMessage.message}`,
                showConfirmButton: false,
                timer: 1500
            });
        }
        
    },[isLogged ,loggedError])

    if(user){
        router.push('/dashboard')
        return <div className=""></div>
    }

    return (
        <div className="w-full h-screen  mx-auto ">
            <div className="flex justify-center h-full">
                <div className="p-10 hidden lg:flex flex-col justify-between w-full px-8 bg-[url('/img/login.jpg')]  bg-cover ">
                    <h1 className="text-2xl font-oswald bg-gradient-to-tr to-indigo-900 from-[#3d64a2] text-white font-semibold my-4  rounded border-t-2 border-r-2 border-t-indigo-500 border-r-indigo-500 w-max p-1 px-2 ">Inventory</h1>
                    <div className="">
                        <h2 className="text-center text-4xl lg:text-[42px] text-white font-serif mx-auto w-[80%] font-semibold ">Wellcome to Inventory </h2>
                        <p className="text-[15px] w-[70%] mx-auto font- text-center my-5 text-white font-thin">You have to login or sign-up first to go to the dashboard . Its a very private page that's why we prefer the login first so login or sing-up first.</p>
                        {/* <Image className="w-[300px]" src={'/img/inven-signin.png'} height={500} width={600} alt="login" /> */}
                        <Link href='/signup' className="text-white mx-auto  flex gap-3 items-center my-6 w-max px-5 bg-gradient-to-tr from-indigo-900 to-orange-600 cursor-pointer rounded-full py-2 ">Sign Up <FaLongArrowAltRight/></Link>
                    </div>
                    <div className="">
                        {
                        theme === 'light' &&
                        <button onClick={() => setTheme('dark')} className="border mx-3 duration-500 transition-all px-3 w-[80px] text-rose-500 items-center py-1 rounded-full flex justify-between "  ><FaCircle/>{theme}</button>
                        }
                        {
                            theme === 'dark' &&
                            <button onClick={() => setTheme('light')} className="border mx-3 duration-500 transition-all px-2 w-[76px] items-center py-1  rounded-full flex justify-between "  >{theme}<FaCircle/></button>
                        }
                        {
                            theme === 'system' &&
                            <button onClick={() => setTheme('light')} className="border mx-3 duration-500 transition-all px-2 w-[76px] items-center py-1  rounded-full flex justify-between "  >{"light"}<FaCircle/></button>
                        }
                    </div>
                    
                </div>
                
                <div className="w-full flex justify-center items-center">
                    <div className="p-4 relative w-full px-8">
                    <h1 className=" flex lg:hidden text-2xl font-oswald bg-gradient-to-tr  to-indigo-900 from-[#3d64a2] text-white font-semibold my-10  rounded border-t-2 border-r-2 border-t-indigo-500 border-r-indigo-500 w-max p-1 px-2 ">Inventory</h1>
                        <h2 className="text-2xl lg:mx-10 font-semibold font-serif ">Sign In</h2>
                        <form onSubmit={handleLogin} className="w-[99%] md:w-[70%] lg:w-[75%] mx-auto my-14">
                            <div className="my-4">
                                <p className="my-1 text-[15px] mx-2 text-slate-600"> Email </p>
                                <div className="flex items-center ">
                                    {/* <FaUser className="" /> */}
                                    <input type="text" name="email" className='w-full text-[13px] border border-slate-300 rounded-full px-4 py-2 outline-none shadow-xl' placeholder={` Enter your email...`} />
                                </div>
                                
                            </div>
                            <div className="my-4">
                                <p className="my-1 text-[15px] mx-2 text-slate-600"> Password </p>
                                <input type="password" name="password" className='w-full text-[13px] border border-slate-300 rounded-full px-4 py-2 outline-none shadow-xl' placeholder='Enter your email...' />
                            </div>
                            <input type="submit" value="Login"  disabled={disable} className={`${disable ? disableButton : normalButton}  `}  />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;