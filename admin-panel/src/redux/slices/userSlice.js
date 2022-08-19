import {createSlice, current} from '@reduxjs/toolkit';
import {createAsyncThunk} from "@reduxjs/toolkit";
import {userService} from '../../services/user.service';

const allUsers = createAsyncThunk(
    'userSlice/userThunkFetching',
    async (_) => {
        const {data} = await userService.getAll();
        return data
    }
)

const delUserById = createAsyncThunk(
    'userSlice/userThunkDelFetching',
    async (id) => {
        const {data} = await userService.deleteById(id);
        return data
    }
)

const updateUserById = createAsyncThunk(
    'userSlice/userThunkUpdateFetching',
    async (item) => {
        const {data} = await userService.updateById(item.id, item.formData);
        return data
    }
)
const createUser = createAsyncThunk(
    'userSlice/userThunkCreateFetching',
    async (formData) => {
        const {data} = await userService.create(formData);
        return data
    }
)
const userSlice = createSlice({
    name: 'user',
    initialState: {
        allUsers: [],
        currentUser: null,
        loading: false,
        error: false,
    },
    reducers: {
        // setCurrentUser: (state, action) => {
        //     const findUser = state.allUsers.find(item => item.id === action.payload);
        //     state.currentUser = findUser;
        //
        // },
        // clearCurrentUser: (state) => {
        //     state.currentUser = null;
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(allUsers.fulfilled, (state, action) => {
                state.allUsers = action.payload;
                state.error = false
            })
            .addCase(allUsers.rejected, (state, action) => {
                state.error = action.payload.message;
                state.loading = false;
            })
            .addCase(allUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(delUserById.fulfilled, (state, action) => {
                state.allUsers.splice(state.allUsers.findIndex(item => item.id === action.payload.id), 1);
                state.loading = false
            })
            .addCase(delUserById.rejected, (state, action) => {
                state.error = action.payload.message;
                state.loading = false;
            })
            .addCase(delUserById.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUserById.fulfilled, (state, action) => {
                 const findIndex = state.allUsers.findIndex(item => item.id === action.payload.id);
                state.allUsers[findIndex] = action.payload;
                state.error = false
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.allUsers.push(action.payload);
                state.error = false
            })

    }
})
// const userReducer = userSlice.reducer
// export const {loginStart, loginSuccess, loginFailure, logout} = userSlice.actions;

const {reducer: userReducer, actions: {}} = userSlice;
const userActions = {allUsers, delUserById, updateUserById, createUser}

export {
    userReducer,
    userActions,
}
// export default userReducer