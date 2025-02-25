import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addUser = createAsyncThunk("addUser", async(newUser,{rejectWithValue})=>{
    try {
        const resp = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/users`,newUser , {withCredentials : true} )
        // console.log(resp.data)
        return resp.data;
    } catch (error) {
        console.log('error form user slice catch' , error)
        return rejectWithValue(error.response?.data || error.message)
    }
})
export const logUser = createAsyncThunk("logUser", async(newUser,{rejectWithValue})=>{
    try {
        const resp = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users`,newUser , {withCredentials : true} )
        console.log(resp.data)
        return resp.data;
    } catch (error) {
        console.log('error form user slice catch' , error)
        return rejectWithValue(error.response?.data || error.message)
    }
})

export const getUser = createAsyncThunk("getUser", async(currentUser,{rejectWithValue})=>{
    try {
        // const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, {withCredentials : true})
        // console.log(currentUser,'cooro')
        return currentUser
    } catch (error) {
        console.log('error form user slice catch' , error)
        return rejectWithValue(error.response?.data || error.message)
    }
})

export const getAdmin = createAsyncThunk("getAdmin", async(currentUser,{rejectWithValue})=>{
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/isAdmin/${currentUser}`, {withCredentials : true})
        // console.log('user info form backnd user slice getAdmin',res)
        return res.data ;
    } catch (error) {
        console.log('error form user slice catch' , error)
        return rejectWithValue(error.response?.data || error.message)
    }
})

const userSlice = createSlice({
    name : 'user',
    initialState :{
        data : null,
        userData : null,
        isAdmin : null,
        isLoading : true
    },
    reducers : {},
    extraReducers : (builder)=>{
        builder.addCase(addUser.fulfilled , (state,action)=>{
            state.data = action.payload;
        })
        builder.addCase(addUser.rejected , (state,action)=>{
            console.log(action.payload)
        })
        builder.addCase(getUser.pending , (state,action)=>{
            state.isLoading = true
            // console.log('getUser pending true' )
        })
        builder.addCase(getUser.fulfilled , (state,action)=>{
            state.userData = action.payload;
            state.isLoading = false
            // console.log('getUser filfild flase',action.payload)
        })
        builder.addCase(getUser.rejected , (state,action)=>{
            // state.userData = action.payload;
            state.isLoading = false
            // console.log('getUser filfild flase')
        })
        builder.addCase(getAdmin.pending , (state,action)=>{
            state.isLoading = true
            // console.log('getAdmin pending true')
        })
        builder.addCase(getAdmin.fulfilled , (state,action)=>{
            state.isAdmin = action.payload;
            state.isLoading = false
            // console.log('getAdmin pending false')
        })
        builder.addCase(getAdmin.rejected , (state,action)=>{
            console.log(action.payload)
            state.isLoading = false
            // console.log('getAdmin pending false')
        })
    }
})

export default userSlice.reducer