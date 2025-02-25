import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import productReducer from './product/productSlice'

export const store = configureStore({
    reducer : {userReducer ,productReducer } 
})