"use client"
import { Table } from 'antd';
import { MdOutlineBorderInner } from 'react-icons/md';
import { Button, Modal } from 'antd';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { orderProduct, orderProductName, productNames } from '@/components/redux/product/productSlice';
import Swal from 'sweetalert2';

const page = () => {
    const [disable, setdisable] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchItem , setSearchItem] = useState('')
    const [orderPrice , setOrderPrice] = useState(0)
    const {theme,setTheme} = useTheme()
    const normalButton = 'w-full text-white my-6 bg-gradient-to-tr from-indigo-900 to-orange-600 cursor-pointer border rounded-full py-2 shadow-xl'
    const disableButton = 'w-full text-white my-6 bg-slate-400 cursor-pointer border rounded-full py-2 shadow-xl'
    const dispacth = useDispatch();
    const allProducts = useSelector(state => state?.productReducer?.productName)
    const searchOrder  = useSelector(state => state?.productReducer?.searchProduct)

// console.log('loglsos dfsdlkfsl ', searchOrder)

    const handleSearch = (e)=>{
        e.preventDefault();
        const name = e.target.search.value;
        setSearchItem(name)
    }

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'Action',
          dataIndex: '',
          key: 'x',
          render: () => <a>Delete</a>,
        },
    ];
    const data = [
        {
          key: 1,
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
        },
    ];
    
    const showModal = () => {
        setIsModalOpen(true);
        dispacth(productNames(''))
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSearchOrder = async (e)=>{
        console.log('khay khay',e.target.value)
        const searchName = e.target.value;
        dispacth(orderProductName(searchName))
        setOrderPrice(searchOrder?.price)
    }
    const handleCheckQuantity =(e)=>{
        const value = parseInt(e.target.value)
        const pQuantity = parseInt(searchOrder?.quantity)
        if( value > pQuantity ){
            return Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Quntity limit reached .",
                showConfirmButton: false,
                timer: 1500
            });
        }
        const oPrice = searchOrder?.price * value;
        setOrderPrice(oPrice)
    }

    const handleOrder = (e)=>{
        e.preventDefault();
        const newOrder = {
            userName : e.target.userName.value,
            userEmail : e.target.userEmail.value,
            productName : searchOrder?.name,
            orderQuantity : e.target.orderQuantity.value,
            userEmail : e.target.userEmail.value,
            orderPrice : orderPrice || searchOrder?.price,
            orderImage : searchOrder?.image,
        }
        console.log(newOrder)
        dispacth(orderProduct(newOrder));
    }

    return (
        <div>
            <div className="flex my-2 justify-around items-center">
                <p className="text-3xl mx-3 my-2">Order Page . </p>
                <div className="flex items-center gap-4">
                    <form onSubmit={handleSearch} className={`${theme === 'dark' ? "flex items-center justify-center gap-2 h-min text-slate-300 bg-black rounded-full  pr-3": "flex items-center justify-center gap-2 h-min bg-white rounded-full  pr-3"} `}>
                        <input type="search" placeholder='Search product' name="search" className={`max-w-24 text-[13px] lg:text-[17px] lg:max-w-56 py-2 rounded-l-full px-3 outline-none`} />
                        <button className='text'><FaSearch/></button>
                    </form>
                    <>
                        <Button type="primary" onClick={showModal}>
                            <MdOutlineBorderInner/> Add Order 
                        </Button>
                        <Modal title="Add Order ." className='w-[80%]' open={isModalOpen} 
                        onOk={handleOk} onCancel={handleCancel}
                        >
                            <form onSubmit={handleOrder} className="p-2">
                                <div className="flex gap-5">
                                    <div className="w-full">
                                        <p className="my-1 text-[15px] mx-2 text-slate-600">Your Name </p>
                                        <input type="text" name="userName" className='w-full text-[13px] border border-slate-300 rounded-full px-4 py-2 outline-none shadow-xl' placeholder={` Enter your name...`} required />
                                    </div>
                                    <div className="w-full">
                                        <p className="my-1 text-[15px] mx-2 text-slate-600"> Email </p>
                                        <input type="text" name="userEmail" className='w-full text-[13px] border border-slate-300 rounded-full px-4 py-2 outline-none shadow-xl' placeholder={` Enter your email...`} required />
                                    </div>
                                </div>
                                <div className="flex gap-5">
                                    <div className="w-full">
                                        <p className="my-1 text-[15px] mx-2 text-slate-600"> Name </p>
                                        <select required defaultValue={'selectedProduct'} name="product" onChange={(e)=> handleSearchOrder(e)} className='w-full text-[13px] border border-slate-300 rounded-full px-4 py-2 outline-none shadow-xl'>
                                            <option selected   disabled> select product</option>
                                            {
                                                allProducts?.map(product => <option key={product._id} value={product?.name}>{product?.name}</option>)
                                            }
                                            
                                        </select>
                                    </div>

                                    <div className="w-full">
                                        <p className="my-1 text-[15px] mx-2 text-slate-600"> In Stock . </p>
                                        <input type="text" name="stock" defaultValue={searchOrder?.quantity} readOnly className='w-full text-[13px] border border-slate-300 rounded-full px-4 py-2 outline-none shadow-xl' placeholder={` Enter your phone number...`} required />
                                    </div>
                                </div>
                                <div className="flex gap-5">
                                    <div className="w-full">
                                        <p className="my-1 text-[15px] mx-2 text-slate-600"> Ordered product name . </p>
                                        <input type="text"  defaultValue={searchOrder?.name} readOnly name="orderProductName" className='w-full text-[13px] border border-slate-300 rounded-full px-4 py-2 outline-none shadow-xl' required />
                                    </div>
                                    <div className="w-full">
                                        <p className="my-1 text-[15px] mx-2 text-slate-600"> Order quntity . </p>
                                        <input type="number" onChange={(e)=> handleCheckQuantity(e)} defaultValue={1} name="orderQuantity" className='w-full text-[13px] border border-slate-300 rounded-full px-4 py-2 outline-none shadow-xl' placeholder={` Enter your quantity...`} required />
                                    </div>
                                </div>
                                <div className="my-2">
                                    <h4 className="text-2xl">Price : {orderPrice || searchOrder?.price}</h4>
                                </div>
                                <input type="submit" value="Add Order"  disabled={disable} className={`${disable ? disableButton : normalButton}  `}  />
                            </form>
                        </Modal>
                    </>
                </div>
            </div>
            <div className="p-3">
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    );
};

export default page;