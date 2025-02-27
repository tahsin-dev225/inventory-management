"use client"
import UserRoute from '@/components/provider/UserRoute';
import Link from 'next/link';
import useFirebase from '@/components/firebase/useFirebase';
import { useSelector } from 'react-redux';
import { MdAddToPhotos, MdManageAccounts, MdOutlineDashboard } from "react-icons/md";
import { useTheme } from 'next-themes';
import { FaCircle, FaRegUser } from 'react-icons/fa';
import { IoMdLogOut } from 'react-icons/io';
import { useState } from 'react';
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import Image from 'next/image';

const layout = ({children}) => {
    const {theme , setTheme} = useTheme('light')
    const [isOpen, setIsOpen] = useState(false)
    const {logOut} = useFirebase();
    const isUser = useSelector(state => state?.userReducer?.userData)
    const user = null;

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    return (
        <UserRoute>
            <div className='flex '>
                <div className="border-r lg:min-w-max lg:max-w-72 border-r-indigo-950 bg-[#0f0617] flex flex-col justify-between">
                    <div className="flex flex-col items- mt-0">
                        <h1 className="lg:text-xl hidden lg:flex mx-auto text-red-400 font-semibold my-4 rounded border-t-2 border-r-2 border-t-indigo-500 border-r-indigo-500 
                         w-max p-1 px-4 font-oswald bg-gradient-to-tr to-indigo-900/80 from-[#3d64a2]/80 ">
                            Inventory
                        </h1>
                        <Link className='flex text-[14px] lg:text-[16px] shadow-2xl gap-3 hover:bg-red-950 text-slate-300 py-3 px-1 lg:px-5 my- items-center border- hover:text-red-40 transition-all rounded m-[3px] border-t-slate-700 mt-5 lg:mt-1' href="/dashboard"><MdOutlineDashboard className='hidden lg:flex' /> Dashboard</Link>
                        <Link className='flex text-[14px] lg:text-[16px] shadow-2xl gap-3 hover:bg-red-950 text-slate-300 py-3 px-1 lg:px-5 my- items-center border- hover:text-red-40 transition-all rounded m-[3px] border-t-slate-700' href="/dashboard/product"><MdOutlineDashboard className='hidden lg:flex' /> Products</Link>
                        <Link className='flex text-[14px] lg:text-[16px] shadow-2xl gap-3 hover:bg-red-950 text-slate-300 py-3 px-1 lg:px-5 my- items-center border- hover:text-red-40 transition-all rounded m-[3px] border-t-slate-700' href="/dashboard/add-product"><MdAddToPhotos className='hidden lg:flex' /> Add Product</Link>
                        <Link className='flex text-[14px] lg:text-[16px] shadow-2xl gap-3 hover:bg-red-950 text-slate-300 py-3 px-1 lg:px-5 my- items-center border- hover:text-red-40 transition-all rounded m-[3px] border-t-slate-700' href="/dashboard/manage-users"><MdManageAccounts className='hidden lg:flex'  /> Manage Users</Link>
                    </div>
                    <div className="w-[90%] mx-auto mb-2">
                        {isUser ?  <button onClick={()=> logOut()} className=' w-full py-1   bg-slate-600 rounded-lg text-white cursor-pointer  my-3 '>Log out</button> : '' }
                    </div>
                    
                </div>
                <div className=" min-h-screen w-full">
                    <div className={`w-full flex justify-end  ${ theme === 'dark' && "border-b border-b-slate-900"} items-center border-b- px-2 border-b- shadow-2xl`}>
                         
                        <div className="flex items-center mx-3">
                            {
                            theme === 'light' &&
                            <button onClick={() => setTheme('dark')} className="border border-slate-500 text-[14px] my-3 duration-500 transition-all px-2 w-[70px] text-rose-500 items-center py-[2px] rounded-full flex justify-between "  ><FaCircle/>{theme}</button>
                        }
                        {
                            theme === 'dark' &&
                            <button onClick={() => setTheme('light')} className="border border-slate-500 text-[14px] my-3 duration-500 transition-all px-2 w-[70px] items-center py-[2px]  rounded-full flex justify-between "  >{theme}<FaCircle/></button>
                        }
                        {
                            theme === 'system' &&
                            <button onClick={() => setTheme('light')} className="border border-slate-500 text-[13px] my-3 duration-500 transition-all px-2 w-[85px] items-center py-[2px]  rounded-full flex justify-between "  >{"light"}<FaCircle/></button>
                        }
                            <FaRegUser className="text-3xl cursor-pointer  p-1 border mx-5 my-2 border-stone-500 rounded-full " onClick={toggleDrawer}/>
                            {
                            // isUser &&
                            <Drawer
                            open={isOpen}
                            onClose={toggleDrawer}
                            direction='right'
                            className='' >
                                <div className="flex justify-center flex-col h-full items-center">
                                    <div className="">
                                        <Image className="my-6 rounded-full" src={`/img/userDef.png`} width={80} height={80} alt="user" />
                                        <p className="text-center text-slate-800">Name : {user?.name}</p>
                                    </div>
                                    <button onClick={()=> logOut()} className="btn btn-primary my-8 text-white btn-sm"><IoMdLogOut />Log out</button>
                                </div>
                            </Drawer>
                            }
                        </div> 
                    </div>
                    {children}
                </div>
            </div>
        </UserRoute>
    );
};

export default layout;