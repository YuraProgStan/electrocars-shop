import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {productReducer} from "./slices/productSlice";
import {authReducer} from "./slices/authSlice";
import userReducer from "./slices/userSlice";


const rootReducer = combineReducers({  product: productReducer, auth: authReducer, user:authReducer });

export const store = configureStore({
    reducer: rootReducer
})
