import {combineReducers, configureStore} from "@reduxjs/toolkit";

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
import {productReducer} from "./slices/productSlice";
import {authReducer} from './slices/authSlice';
import {userReducer} from './slices/userSlice';

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    // blacklist:['user']
};

const rootReducer = combineReducers({ auth: authReducer , product: productReducer, user: userReducer});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store);

// export const store = configureStore({
//     reducer: {
//         user: userReducer , product: productReducer
//     }
// })