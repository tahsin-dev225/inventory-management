import axios from "axios";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const addProduct = createAsyncThunk("addProduct", async(newProduct,{rejectWithValue})=>{
    try {
        const resp = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/products`, newProduct ,{withCredentials : true});
        console.log(resp)
        return resp?.data
    } catch (error) {
        return rejectWithValue(error?.response?.data || error.message);
    }
})
export const allProduct = createAsyncThunk("allProduct", async(newp,{rejectWithValue})=>{
    try {
        const resp = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/products` ,{withCredentials : true});
        console.log('resp from allropoisjl',resp)
        return resp?.data
    } catch (error) {
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
    },
    reducers : {},
    extraReducers : (builder)=>{
        builder.addCase(addProduct.pending , (state , action )=>{
            state.isLoading = true
        });
        builder.addCase(addProduct.fulfilled, (state,action)=>{
            console.log('product', action.payload);
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(addProduct.rejected , (state , action)=>{
            state.isLoading = false
            state.isError = true;
            state.productError = action.payload
            console.log("eroor", action.payload);
        })

        builder.addCase(allProduct.pending , (state , action )=>{
            state.isLoading = true
        });
        builder.addCase(allProduct.fulfilled, (state,action)=>{
            console.log('product', action.payload);
            state.isLoading = false;
            state.allProducts = action.payload;
        });
        builder.addCase(allProduct.rejected , (state , action)=>{
            state.isLoading = false
            state.isError = true;
            state.productError = action.payload
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