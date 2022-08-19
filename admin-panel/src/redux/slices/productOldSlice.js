import {createSlice} from '@reduxjs/toolkit';

const productOldSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        loading: false,
        error: false,
    },
    reducers: {
     //GET ALL
        getProductStart: (state) => {
            state.loading = true
            state.error = false
        },
        getProductSuccess: (state, action) => {
            state.loading = false
            state.products = action.payload
        },
        getProductFailure: (state) => {
            state.loading = false
            state.error = true
        },
        deleteProductStart: (state) => {
            state.loading = true
            state.error = false
        },
        deleteProductSuccess: (state, action) => {
            state.loading = false
            state.products.splice(
                state.products.findIndex(item => item._id === action.payload),1
            )
        },
        deleteProductFailure: (state) => {
            state.loading = false
            state.error = true
        },
        updateProductStart: (state) => {
            state.loading = true
            state.error = false
        },
        updateProductSuccess: (state, action) => {
            state.loading = false;
            const productIndex = state.products.findIndex(item => item._id === action.payload);
            state.products[productIndex] = action.payload
        },
        updateProductFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        addProductStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        addProductSuccess: (state, action) => {
            state.loading = false;
            state.products.push(action.payload);
        },
        addProductFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
    }
})
const productReducer = productOldSlice.reducer
export const {
    getProductStart,
    getProductSuccess,
    getProductFailure,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailure,
    updateProductStart,
    updateProductSuccess,
    updateProductFailure,
    addProductStart,
    addProductSuccess,
    addProductFailure,
} = productOldSlice.actions;
export default productReducer