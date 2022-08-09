import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {productReducer} from "./slices/productSlice";
import {authReducer} from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    blacklist: ['auth','product']
};


const rootReducer = combineReducers({  product: productReducer, auth: authReducer, cart: cartReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export let persistor = persistStore(store);

// export const store = configureStore({
//     reducer: rootReducer
// })