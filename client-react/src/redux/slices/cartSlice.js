import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
        delivery: null,
    },
    reducers: {
        addProduct: (state, action) =>{
            state.quantity += 1;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity
        },
        clearCart: (state, action) =>{
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        },
        addDeliveryAddress: (state, action) =>{
            state.delivery = action.payload;
        },
        incrementByProductId:(state, action) =>{
            const id = action.payload.id;
            const findIndex = state.products.findIndex(item => item.id === id);
            state.products[findIndex]= {...state.products[findIndex], quantity:state.products[findIndex].quantity+1};
            state.total = state.total + state.products[findIndex].price;
        },
        decrementByProductId:(state, action) =>{
            const id = action.payload.id;
            const findIndex = state.products.findIndex(item => item.id === id);
            if(state.products[findIndex].quantity > 1){
            state.products[findIndex]= {...state.products[findIndex], quantity:state.products[findIndex].quantity-1};
            state.total = state.total - state.products[findIndex].price;
            }
        },

    }
})
const cartReducer = cartSlice.reducer
export const { addProduct, clearCart, addDeliveryAddress, incrementByProductId, decrementByProductId} = cartSlice.actions;
export default cartReducer