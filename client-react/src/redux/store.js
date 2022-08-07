import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {productReducer} from "./slices/productSlice";
import {authReducer} from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";


const rootReducer = combineReducers({  product: productReducer, auth: authReducer, cart: cartReducer });

export const store = configureStore({
    reducer: rootReducer
})
