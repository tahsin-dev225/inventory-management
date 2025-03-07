"use client"
import { allProduct } from '@/components/redux/product/productSlice';
import { Table } from 'antd';
import axios from 'axios';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

const page = () => {
    const {theme,setTheme} = useTheme()
    // const [products, setProducts] = useState([])
    // const [totalPage, setTotalPage] = useState(1)
    const totalPage = useSelector(state => state?.productReducer?.pagination)
    const productData = useSelector(state => state?.productReducer?.data)
    const allProducts = useSelector(state => state?.productReducer?.allProducts)
    const dispatch = useDispatch()
    const [currentPage,setCurrentPage] = useState(1);
    const itemPerPage = 4;
    const [searchItem , setSearchItem] = useState('')

    useEffect(()=>{
        dispatch(allProduct({currentPage,itemPerPage,searchItem}))
    },[dispatch ,currentPage,searchItem])


    const handleSearch = (e)=>{
        e.preventDefault();
        const name = e.target.search.value;
        setSearchItem(name)
    }

    const dataSource = allProducts?.map(product => (
        {
        key: product._id, 
        name: product.name,
        quantity: product.quantity,
        price: product.price,  
        image : product.image,
    }));
      
      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'quantity',
          dataIndex: 'quantity',
          key: 'quantity',
        },
        {
          title: 'price',
          dataIndex: 'price',
          key: 'price',
        },
        {
          title: 'Image',
          dataIndex: 'image',
          key: 'image',
          render : (image)=>(
            image ?
            <Image className='object-cover w-' src={image} height={50} width={50} alt='product'  /> 
            : 'No photo'
          )
        }
      ];
      
    return (
        <div className='p-2 w-full'>
            <div className="flex lg:justify-around items-center my-3">
                <i className="text-md lg:text-3xl w-min lg:w-max my-4 mx-4 font-medium font-roboto">All products page.</i>
                <form onSubmit={handleSearch} className={`${theme === 'dark' ? "flex items-center justify-center gap-2 h-min text-slate-300 bg-black rounded-full pl-2 pr-3": "flex items-center justify-center gap-2 h-min bg-white rounded-full pl-2 pr-3"} `}>
                    <input type="search" placeholder='Search product' name="search" className={`max-w-24 text-[13px] lg:text-[17px] lg:max-w-56 py-2 rounded-l-full px-3 outline-none`} />
                    <button className='text'><FaSearch/></button>
                </form>
            </div>
            <div className="overflow-x-auto mx-auto sm:overflow-x-visible  w-[260px] sm:w-full">
              <Table className=''  dataSource={dataSource} columns={columns} pagination={{pageSize:itemPerPage,
              total:totalPage,
              current:currentPage,onChange:(page)=>{
                  setCurrentPage(page)
              }
              } 
              } />
            </div>
              
        </div> 
    );
};

export default page;