"use client"
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { IoMdLogOut, IoMdPersonAdd } from "react-icons/io";
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { FaCircle, FaRegCircleUser, FaRegUser } from "react-icons/fa6";

const Navbar = () => {
    const {theme , setTheme} = useTheme('light')
    const [isOpen, setIsOpen] = useState(false)
    const user = null;
    const isUser = null;
    console.log('tehxe',theme)

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    return (
        <div className="navbar bg-base-100/70">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    {
                        navItems?.map((item,idx) =><Link key={idx} className="my-2" href={item.path}>{item?.title}</Link>)
                    }
                    
                </ul>
                </div>
                <Link href='/' className="mx-3"><Image className="rounded" src='/img/up-logo.jpg' width={80} height={40} alt="logo" /></Link>
            </div>
            <div className="navbar-start hidden lg:flex">
                {
                    navItems?.map((item,idx) =><Link key={idx} className="mx-3" href={item.path}>{item?.title}</Link>)
                }
                {user?.role === 'admin' && <Link className="mx-3" href="/dashboard">Dashboard</Link>}
                
            </div>
            <div className="navbar-end">
                
                {
                    theme === 'light' &&
                    <button onClick={() => setTheme('dark')} className="border mx-3 duration-500 transition-all px-2 w-[76px] text-black items-center py-1 rounded-full flex justify-between "  ><FaCircle/>{theme}</button>
                }
                {
                    theme === 'dark' &&
                    <button onClick={() => setTheme('light')} className="border mx-3 duration-500 transition-all px-2 w-[76px] items-center py-1 rounded-full flex justify-between "  >{theme}<FaCircle/></button>
                }
                
                
                {
                     isUser ?  
                     <FaRegUser className="text-3xl cursor-pointer  p-1 border mx-3 my-2 border-stone-500 rounded-full " onClick={toggleDrawer}/>
                     :
                     <Link href='/login' className="btn btn-primary text-white btn-sm"><IoMdPersonAdd />login</Link>
                }
                {
                // isUser &&
                <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='right'
                className=''
                >
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
    );
};

const navItems = [
    {
        title : "Home",
        path : "/",
    },
    {
        title : "Blogs",
        path : "/blogs",
    },
]

export default Navbar;