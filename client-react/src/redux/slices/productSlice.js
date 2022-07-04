import {createAsyncThunk} from "@reduxjs/toolkit";
import {brandService} from "../../services/brand.service";
import {modelService} from "../../services/model.service";

const {createSlice} = require("@reduxjs/toolkit");


const brand = createAsyncThunk(
    'productSlice/productBrandFetching',
    async (_) => {
        const {data} = await brandService.getAll();
        return data
    }
)

const model = createAsyncThunk(
    'productSlice/productModelFetching',
    async (_) => {
        const {data} = await modelService.getAll();
        return data
    }
)

const modelById = createAsyncThunk(
    'productSlice/productModelByIdFetching',
    async (id) => {
        const {data} = await modelService.getById(id);
        return data
    }
)
const initialState = {
    allBrands: [],
    allModels: [],
    currentModel: null,
    wheels: [],
    interior: [],
    colorsImg: [],
    loading: false,
    error: false
}

const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        getModelByBrandName(state, action) {

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(brand.fulfilled, (state, action) => {
                state.allBrands = action.payload;
                state.error = false
            })
            .addCase(model.fulfilled, (state, action) => {
                state.allModels = action.payload;
                state.error = false
            })
            .addCase(modelById.fulfilled, (state, action) => {
                const {colorImg, interior, wheels, ...others} = action.payload;
                state.currentModel = {...others};
                state.colorsImg = colorImg;
                state.wheels = wheels;
                state.interior = interior;
                state.error = false
            })
    }
})

const {reducer: productReducer, actions: {}} = productSlice;
const productActions = {brand, model, modelById}

export {
    productReducer,
    productActions
}