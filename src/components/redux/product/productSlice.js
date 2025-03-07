import useAxiosSecure from "@/components/provider/useAxiosSecure";
import axios from "axios";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const addProduct = createAsyncThunk("addProduct", async(newProduct,{rejectWithValue})=>{
    try {
        const resp = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/products`, newProduct ,{withCredentials : true});
        // console.log(resp)
        return resp?.data
    } catch (error) {
        return rejectWithValue(error?.response?.data || error.message);
    }
})
export const allProduct = createAsyncThunk("allProduct", async({currentPage,itemPerPage,searchItem},{rejectWithValue})=>{
    try {
        const token = localStorage.getItem('access-token')
        const resp = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/products?page=${currentPage}&size=${itemPerPage}&search=${searchItem}`,{headers : {authorization : `Bearer ${token}`}});
        // console.log('respone redux main server', resp.data.metaData)
        return resp?.data
    }catch (error) {
        console.log(error)
        return rejectWithValue(error?.response?.data || error.message);
    }
})
export const productNames = createAsyncThunk("productNames", async(ab,{rejectWithValue})=>{
    try {
        // const token = localStorage.getItem('access-token')
        const resp = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/productName`,
            // {headers : {authorization : `Bearer ${token}`}}
            {withCredentials : true}
        );
        // console.log('respone redux main server', resp.data.metaData)
        return resp?.data
    }catch (error) {
        console.log(error)
        return rejectWithValue(error?.response?.data || error.message);
    }
})
export const orderProductName = createAsyncThunk("orderProductName", async(search,{rejectWithValue})=>{
    try {
        // const token = localStorage.getItem('access-token')
        const resp = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/productName/${search}`,{withCredentials : true}
        );
        // console.log('respone redux main server', resp.data.metaData)
        return resp?.data
    }catch (error) {
        console.log(error)
        return rejectWithValue(error?.response?.data || error.message);
    }
})
export const orderProduct = createAsyncThunk("orderProduct", async(newOrder,{rejectWithValue})=>{
    try {
        // const token = localStorage.getItem('access-token')
        const resp = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/order`,newOrder,{withCredentials : true}
        );
        // console.log('respone redux main server', resp.data.metaData)
        return resp?.data
    }catch (error) {
        console.log(error)
        return rejectWithValue(error?.response?.data || error.message);
    }
})
export const allOrders = createAsyncThunk("allOrders", async({currentPage,itemPerPage,searchItem},{rejectWithValue})=>{
    try {
        const resp = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/order?page=${currentPage}&size=${itemPerPage}&search=${searchItem}`,{withCredentials : true}
        );
        // console.log('respone redux main server', resp.data.metaData)
        return resp?.data
    }catch (error) {
        console.log(error)
        return rejectWithValue(error?.response?.data || error.message);
    }
})

const productSlice = createSlice({
    name : 'products',
    initialState : {
        isLoading : false,
        data : null,
        allProducts : null,
        isError : false,
        productError : null,
        pagination : null,
        productName : null,
        searchProduct : null,
        allOrder : null,
        orderPagination : null,
    },
    reducers : {},
    extraReducers : (builder)=>{
        builder.addCase(addProduct.pending , (state , action )=>{
            state.isLoading = true
        });
        builder.addCase(addProduct.fulfilled, (state,action)=>{
            // console.log('product', action.payload);
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(addProduct.rejected , (state , action)=>{
            state.isLoading = false
            state.isError = true;
            state.productError = action.payload
            // console.log("eroor", action.payload);
        })

        builder.addCase(allProduct.pending , (state , action )=>{
            state.isLoading = true
        });
        builder.addCase(allProduct.fulfilled, (state,action)=>{
            // console.log('product', action.payload);
            state.isLoading = false;
            state.allProducts = action.payload.result;
            state.pagination = action.payload.metaData.totalItem || null;
        });
        builder.addCase(allProduct.rejected , (state , action)=>{
            state.isLoading = false
            state.isError = true;
            state.productError = action.payload
            console.log("eroor", action.payload);
        })

        
        builder.addCase(productNames.fulfilled, (state,action)=>{
            // console.log('product', action.payload);
            state.isLoading = false;
            state.productName = action.payload;
        });

        builder.addCase(orderProductName.fulfilled, (state,action)=>{
            // console.log('product', action.payload);
            // state.isLoading = false;
            state.searchProduct = action.payload;
        });
        builder.addCase(orderProductName.rejected , (state , action)=>{
            state.searchProduct = action.payload
            // console.log("eroor", action.payload);
        })

        builder.addCase(allOrders.fulfilled, (state,action)=>{
            // console.log('product', action.payload);
            // state.isLoading = false;
            state.allOrder = action.payload.result;
            state.orderPagination = action.payload.metaData.totalItem || null;
        });
        builder.addCase(allOrders.rejected , (state , action)=>{
            // state.searchProduct = action.payload
            console.log("eroor", action.payload);
        })
        
        // builder.addCase(deleteBlogs.pending , (state , action )=>{
        //     state.isLoading = true
        // });builder.addCase(deleteBlogs.fulfilled, (state,action)=>{
        //     // console.log('action', action.payload);
        //     state.isLoading = false;
        // });
        // builder.addCase(deleteBlogs.rejected , (state , action)=>{
        //     state.isLoading = false
        //     console.log("eroor", action.payload);
        // })
    }
})

export default productSlice.reducer;