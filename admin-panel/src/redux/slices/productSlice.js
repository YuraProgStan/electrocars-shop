import {createAsyncThunk} from "@reduxjs/toolkit";
import {brandService} from "../../services/brand.service";
import {modelService} from "../../services/model.service";
import {userService} from "../../services/user.service";

const {createSlice} = require("@reduxjs/toolkit");


const brand = createAsyncThunk(
    'productSlice/productBrandFetching',
    async (_) => {
        const {data} = await brandService.getAll();
        return data
    }
)

const delBrandById = createAsyncThunk(
    'productSlice/brandThunkDelFetching',
    async (id) => {
        const {data} = await brandService.deleteById(id);
        return data
    }
)



const updateBrandById = createAsyncThunk(
    'productSlice/brandThunkUpdateFetching',
    async (item) => {
        const {data} = await brandService.updateById(item.id, item.data);
        return data
    }
)

const createBrand = createAsyncThunk(
    'productSlice/brandThunkCreateFetching',
    async (item) => {
        const {data} = await brandService.create(item);
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
    error: false,
    tempImageFr: [],
}

const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        getModelByBrandName(state, action) {

        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(brand.pending, (state) => {
                state.loading = true;
                state.error = false
            })
            .addCase(brand.fulfilled, (state, action) => {
                state.allBrands = action.payload;
                state.loading = false;
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
            .addCase(delBrandById.fulfilled, (state, action) => {
                state.allBrands.splice(state.allBrands.findIndex(item => item.id === action.payload.id), 1);
                state.loading = false
            })
            .addCase(createBrand.fulfilled, (state, action) => {
                state.allBrands.push(action.payload);
                state.error = false
            })
    }
})

const {reducer: productReducer, actions: {}} = productSlice;
const productActions = {brand, delBrandById, updateBrandById, createBrand, model, modelById}

export {
    productReducer,
    productActions
}