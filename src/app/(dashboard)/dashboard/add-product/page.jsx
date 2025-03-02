"use client"

import PrivateRoute from "@/components/provider/PrivateRoute";
import { addProduct } from "@/components/redux/product/productSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const image_hosting_key = process.env.NEXT_PUBLIC_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const page = () => {
    const [disable, setdisable] = useState(false)
    const dispatch = useDispatch()
    const normalButton = 'w-full text-white my-6 bg-gradient-to-tr from-indigo-900 to-orange-600 cursor-pointer border rounded-full py-2 shadow-xl'
    const disableButton = 'w-full text-white my-6 bg-slate-400 cursor-pointer border rounded-full py-2 shadow-xl'
    const productError = useSelector(state => state?.productReducer?.productError)
    const isError = useSelector(state => state?.productReducer?.isError)
    console.log("erro from add produc", productError)

    const handleAddProduct =async (e)=>{
        setdisable(true)
        e.preventDefault();
        const imageFile ={image : e.target.photo.files[0]}
        const res =await  axios.post(image_hosting_api, imageFile,{
            headers:{
                'Content-Type' : 'multipart/form-data'
            }
        } )

        if(res.data.success  === true){ 
            // now send the menu item data to the server with the image
            const newProduct = {
                name : e.target.name.value,
                price : e.target.price.value,
                quantity : e.target.quantity.value,
                description : e.target.description.value,
                image: res.data.data.display_url,
            }
            dispatch(addProduct(newProduct))
            if(!isError){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${e.target.name.value} has added successfully`,
                    showConfirmButton: false,
                    timer: 3000
                  });
                  e.target.reset()
                  setdisable(false)
            }
        }
    }

    useEffect(()=>{
        if(isError){
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: `${productError.message}`,
                    showConfirmButton: false,
                    timer: 1500
                  });
                setdisable(false)
            }
    },[isError])

    return (
        <PrivateRoute role={[ "admin", "supper-admin" ]}>
            <div className="p-3 flex min-h-screen flex-col  w-full bg-cover ">
                <p className="text-3xl mx-6 px-2 my-4 font-oswald">Add product page.</p>
                <div className="flex justify-center ">
                    <form onSubmit={handleAddProduct} className="w-full xl:w-[65%] mx-auto">
                        <div className="lg:flex gap-4 my-4 w-full">
                            <div className="w-full">
                                <p className="my-1 text-[15px] mx-2 text-slate-600"> Name </p>
                                <input type="text" name="name" className='w-full text-[13px] border border-slate-300 rounded-full px-4 py-2 outline-none shadow-xl' placeholder={` Enter your product name...`} />
                            </div>
                            <div className="w-full">
                                <p className="my-1 text-[15px] mx-2 text-slate-600"> Price </p>
                                <input type="number" name="price" className='w-full text-[13px] border border-slate-300 rounded-full px-4 py-2 outline-none shadow-xl' placeholder={` Enter your Product price...`} />
                            </div>
                        </div>
                        <div className="lg:flex gap-4 my-4 w-full">
                            <div className="w-full">
                                <p className="my-1 text-[15px] mx-2 text-slate-600"> Quantity </p>
                                <input type="number" name="quantity" className='w-full text-[13px] border border-slate-300 rounded-full px-4 py-2 outline-none shadow-xl' placeholder={` Enter product quantity...`} />
                            </div>
                            <div className="w-full">
                                <p className="my-1 text-[15px] mx-2 text-slate-600"> Photo </p>
                                <input type="file" name="photo" className="w-full  py-1 px-3  rounded-full file- file-input-ghost text-white cursor-pointer bg-red-400" required />
                            </div>
                            
                        </div>
                        
                        <textarea  name='description' placeholder="Write the product description" className="input pt-1 my-3 min-h-[200px] w-full input-bordered" required />
                        <input type="submit" value="Add Product"  disabled={disable} className={`${disable ? disableButton : normalButton}  `}  />
                    </form>
                </div>
            </div>
        </PrivateRoute>
    );
};

export default page;